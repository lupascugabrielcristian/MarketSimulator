package com.marketSim.Controllers;

import com.marketSim.Controllers.Requests.SaveGameRequest;
import com.marketSim.Model.City;
import com.marketSim.Model.GameSituation;
import com.marketSim.Model.Player;
import com.marketSim.Model.Ship;
import com.marketSim.interfaces.ICitiesService;
import com.marketSim.interfaces.IGameService;
import com.marketSim.interfaces.IPlayerService;
import com.marketSim.interfaces.IShipsService;
import com.mongodb.MongoTimeoutException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class RstController {

    @Autowired
    private ICitiesService citiesService;
    @Autowired
    private IPlayerService playerService;
    @Autowired
    private IGameService gameService;
    @Autowired
    private IShipsService shipsService;

    @RequestMapping(value = "/initialcities")
    public List<City> getInitialCities(){
        return citiesService.generateRandomCities(10, "/static/stuff/city_names.txt");
    }

    @RequestMapping(value = "/initial")
    public Object initialSetUp(){
        List<City> cities = citiesService.generateRandomCities(10, "/static/stuff/city_names.txt");
        List<Ship> ships = shipsService.getInitialShips();
        Player player = playerService.initializePlayer();
        player.setShips(ships);

        return new Object(){
            public Player initialPlayer = player;
            public List<City> initialCities = cities;
        };
    }

    @RequestMapping(path = "/save", method = RequestMethod.POST)
    public boolean saveGame(@RequestBody SaveGameRequest request) {
        GameSituation gameSituation = new GameSituation();
        gameSituation.setPlayer(request.getPlayer());
        gameSituation.setCities(request.getCities());
        gameSituation.setShips(request.getShips());
        gameSituation.setId(request.getGameId());

        try {
            gameService.saveGame(gameSituation);
            return true;
        }
        catch (MongoTimeoutException e) {
            return false;
        }
    }

    @RequestMapping(path = "/loadAll", method = RequestMethod.GET)
    public List<GameSituation> loadGame() {
        List<GameSituation> gameSituations = new ArrayList<>();
        try {
            gameSituations = gameService.loadGames();
        }
        catch (MongoTimeoutException e) {
            System.err.println("Nope, nu pot citi jocurile");
        }
        return gameSituations;
    }

    @RequestMapping(path = "/load", method = RequestMethod.GET)
    public GameSituation loadThisGame(@RequestParam(value="id")String id) {
        try {
            return gameService.loadGame(id);
        }
        catch (MongoTimeoutException e) {
            return null;
        }

    }

    @RequestMapping(path = "/availableShips", method = RequestMethod.GET)
    public List<Ship> getAvailableShips() {
        List<Ship> availableShips = new ArrayList<>();
        try {
            availableShips = shipsService.getAvailableShips();
        }
        catch (MongoTimeoutException e) {
            System.err.println("Nope, nu pot navele din baza de date");
        }
        return availableShips;
    }
}

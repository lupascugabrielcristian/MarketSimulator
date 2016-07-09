package com.marketSim.Controllers;

import com.marketSim.Model.City;
import com.marketSim.Model.Player;
import com.marketSim.interfaces.ICitiesService;
import com.marketSim.interfaces.IPlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RstController {

    @Autowired
    private ICitiesService citiesService;
    @Autowired
    private IPlayerService playerService;

    @RequestMapping(value = "/initialcities")
    public List<City> getInitialCities(){
        return citiesService.generateRandomCities(10);
    }

    @RequestMapping(value = "/initial")
    public Object initialSetUp(){
        List<City> cities = citiesService.generateRandomCities(10);
        Player player = playerService.initializePlayer();

        return new Object(){
            public Player initialPlayer = player;
            public List<City> initialCities = cities;
        };
    }
}

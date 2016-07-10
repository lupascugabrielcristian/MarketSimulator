package com.marketSim.Controllers.Requests;

import com.marketSim.Model.City;
import com.marketSim.Model.Player;
import com.marketSim.Model.Ship;

import java.util.List;

public class SaveGameRequest {
    private Player player;
    private List<City> cities;
    private List<Ship> ships;

    public Player getPlayer() {
        return player;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }

    public List<City> getCities() {
        return cities;
    }

    public void setCities(List<City> cities) {
        this.cities = cities;
    }

    public List<Ship> getShips() {
        return ships;
    }

    public void setShips(List<Ship> ships) {
        this.ships = ships;
    }
}

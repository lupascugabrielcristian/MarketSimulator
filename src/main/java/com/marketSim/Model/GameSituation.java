package com.marketSim.Model;

import org.bson.types.ObjectId;

import java.util.List;

public class GameSituation {
    private String id;
    private Player player;
    private List<City> cities;
    private List<Ship> ships;

    public GameSituation() {
        id = ObjectId.get().toString();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

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

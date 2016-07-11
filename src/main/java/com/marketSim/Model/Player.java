package com.marketSim.Model;

import org.bson.types.ObjectId;

import java.util.List;

public class Player {
    private String id;
    private String name;
    private long days;
    private long money;
    private List<Ship> ships;
    private List<Cargo> cargos;
    private List<Factory> factories;

    public Player() {
        this.id = ObjectId.get().toString();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getDays() {
        return days;
    }

    public void setDays(long days) {
        this.days = days;
    }

    public long getMoney() {
        return money;
    }

    public void setMoney(long money) {
        this.money = money;
    }

    public List<Ship> getShips() {
        return ships;
    }

    public void setShips(List<Ship> ships) {
        this.ships = ships;
    }

    public List<Cargo> getCargos() {
        return cargos;
    }

    public void setCargos(List<Cargo> cargos) {
        this.cargos = cargos;
    }

    public List<Factory> getFactories() {
        return factories;
    }

    public void setFactories(List<Factory> factories) {
        this.factories = factories;
    }
}

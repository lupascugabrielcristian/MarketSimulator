package com.marketSim.Model;

import org.bson.types.ObjectId;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;

import java.util.ArrayList;
import java.util.List;

@Entity
public class City {
    @Id
    private String id;
    private String name;
    private long population;
    private Position position;
    private List<Factory> factories;
    private List<Commodity> commodities;

    public City() {
        this.id = ObjectId.get().toString();
        this.factories = new ArrayList<>();
        this.commodities = new ArrayList<>();
        this.population = 1;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getPopulation() {
        return population;
    }

    public void setPopulation(long population) {
        this.population = population;
    }

    public Position getPosition() {
        return position;
    }

    public void setPosition(Position position) {
        this.position = position;
    }

    public List<Factory> getFactories() {
        return factories;
    }

    public void addFactory(Factory factory) {
        factories.add(factory);
    }

    public List<Commodity> getCommodities() {
        return commodities;
    }
}

package com.marketSim.Model;

import org.bson.types.ObjectId;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;

@Entity
public class Commodity {

    public Commodity() {
        id = ObjectId.get().toString();
    }

    @Id
    private String id;
    private String name;
    private double defaultPrice;
    private double currentPrice;
    private double quantity;
    private double volumeCoefficient;
    private double unitPerPopulation;

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

    public double getDefaultPrice() {
        return defaultPrice;
    }

    public void setDefaultPrice(double defaultPrice) {
        this.defaultPrice = defaultPrice;
    }

    public double getCurrentPrice() {
        return currentPrice;
    }

    public void setCurrentPrice(double currentPrice) {
        this.currentPrice = currentPrice;
    }

    public double getQuantity() {
        return quantity;
    }

    public void setQuantity(double quantity) {
        this.quantity = quantity;
    }

    public double getVolumeCoefficient() {
        return volumeCoefficient;
    }

    public void setVolumeCoefficient(double volumeCoefficient) {
        this.volumeCoefficient = volumeCoefficient;
    }

    public double getUnitPerPopulation() {
        return unitPerPopulation;
    }

    public void setUnitPerPopulation(double unitPerPopulation) {
        this.unitPerPopulation = unitPerPopulation;
    }
}

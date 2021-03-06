package com.marketSim.Model;

import org.bson.types.ObjectId;
import org.mongodb.morphia.annotations.Entity;

import java.util.List;

@Entity
public class Ship {

    private String id;
    private String name;
    private String ownerId;
    private double capacity;
    private double occupiedVolume;
    private List<Cargo> cargos;
    private double maxSpeed;
    private double speed;
    private double price;
    private Position position;
    private City currentCity;
    private City destinationCity;
    private City originCity;

    public Ship() {
        id = ObjectId.get().toString();
        occupiedVolume = 0;
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

    public String getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(String ownerId) {
        this.ownerId = ownerId;
    }

    public double getCapacity() {
        return capacity;
    }

    public void setCapacity(double capacity) {
        this.capacity = capacity;
    }

    public double getOccupiedVolume() {
        return occupiedVolume;
    }

    public void setOccupiedVolume(double occupiedVolume) {
        this.occupiedVolume = occupiedVolume;
    }

    public List<Cargo> getCargos() {
        return cargos;
    }

    public void setCargos(List<Cargo> cargos) {
        this.cargos = cargos;
    }

    public double getMaxSpeed() {
        return maxSpeed;
    }

    public void setMaxSpeed(double maxSpeed) {
        this.maxSpeed = maxSpeed;
    }

    public double getSpeed() {
        return speed;
    }

    public void setSpeed(double speed) {
        this.speed = speed;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Position getPosition() {
        return position;
    }

    public void setPosition(Position position) {
        this.position = position;
    }

    public City getCurrentCity() {
        return currentCity;
    }

    public void setCurrentCity(City currentCity) {
        this.currentCity = currentCity;
    }

    public City getDestinationCity() {
        return destinationCity;
    }

    public void setDestinationCity(City destinationCity) {
        this.destinationCity = destinationCity;
    }

    public City getOriginCity() {
        return originCity;
    }

    public void setOriginCity(City originCity) {
        this.originCity = originCity;
    }
}

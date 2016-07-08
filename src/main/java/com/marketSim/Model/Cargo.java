package com.marketSim.Model;

import org.mongodb.morphia.annotations.Entity;

@Entity
public class Cargo {
    private String cargoName;
    private double cargoQantity;
}

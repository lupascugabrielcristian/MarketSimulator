package com.marketSim.Model;

import org.mongodb.morphia.annotations.Entity;

import java.util.List;

@Entity
public class Ship {
    private double capacity;
    private List<Cargo> cargos;
}

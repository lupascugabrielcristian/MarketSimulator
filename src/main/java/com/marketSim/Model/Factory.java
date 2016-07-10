package com.marketSim.Model;

import org.bson.types.ObjectId;

public class Factory {
    private String id;
    private String name;
    private String location;
    private Commodity commodity;
    private double productionRate;

    public Factory() {
        id = ObjectId.get().toString();
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

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Commodity getCommodity() {
        return commodity;
    }

    public void setCommodity(Commodity commodity) {
        this.commodity = commodity;
    }

    public double getProductionRate() {
        return productionRate;
    }

    public void setProductionRate(double productionRate) {
        this.productionRate = productionRate;
    }
}

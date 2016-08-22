package com.marketSim.interfaces;

import com.marketSim.Model.Commodity;
import com.mongodb.MongoTimeoutException;

import java.util.List;

public interface ICommoditiesService {
    List<Commodity> getAllAvailableCommodities() throws MongoTimeoutException;
}

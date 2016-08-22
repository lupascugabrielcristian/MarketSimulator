package com.marketSim.services;

import com.marketSim.Model.Commodity;
import com.marketSim.Repositories.CommoditiesRepository;
import com.marketSim.interfaces.ICommoditiesService;
import com.mongodb.MongoTimeoutException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CommoditiesService implements ICommoditiesService {
    private CommoditiesRepository repository;

    @Autowired
    public CommoditiesService(CommoditiesRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Commodity> getAllAvailableCommodities() throws MongoTimeoutException{
        List<Commodity> all = this.repository.findAll();
        return all;
    }
}

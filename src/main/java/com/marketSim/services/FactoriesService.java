package com.marketSim.services;

import com.marketSim.Model.Commodity;
import com.marketSim.Model.Factory;
import com.marketSim.Repositories.FactoriesRepository;
import com.marketSim.interfaces.ICommoditiesParser;
import com.marketSim.interfaces.IFactoriesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Random;

@Component
public class FactoriesService implements IFactoriesService {

    @Autowired
    private FactoriesRepository factoriesRepository;
    private ICommoditiesParser commoditiesParser;
    private List<Commodity> availableCommodities;

    @Autowired
    public FactoriesService(ICommoditiesParser commoditiesParser) {
        this.commoditiesParser = commoditiesParser;
        this.availableCommodities = this.commoditiesParser.parseFile("/static/stuff/commodities.xml");
    }

    @Override
    public Factory getRandomFactory(){
        Random random = new Random();
        Factory factory = new Factory();
        Commodity commodity = availableCommodities.get(random.nextInt(availableCommodities.size()));
        factory.setCommodity(commodity);
        factory.setProductionRate(commodity.getQuantity());
        return factory;
    }


}

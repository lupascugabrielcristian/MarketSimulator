package com.marketSim.Controllers;

import com.marketSim.Model.City;
import com.marketSim.interfaces.ICitiesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RstController {

    @Autowired
    private ICitiesService citiesService;

    @RequestMapping(value = "/initialcities")
    public List<City> getInitialCities(){
        return citiesService.generateRandomCities(10);
    }
}

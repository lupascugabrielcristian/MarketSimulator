package com.marketSim.services;

import com.marketSim.Model.City;
import com.marketSim.interfaces.ICitiesService;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Component
public class CitiesService implements ICitiesService {
    @Override
    public List<City> generateRandomCities(int numberOfCities) {
        List<City> result = new ArrayList<>();

        while (result.size() < numberOfCities) {
            result.add(createCity());
        }

        return result;
    }

    private City createCity() {
        Random random = new Random();

        City newCity = new City();
        newCity.setLatitude(random.nextInt(60));
        newCity.setLongitude(random.nextInt(170));

        return newCity;

    }
}

package com.marketSim.interfaces;

import com.marketSim.Model.City;

import java.util.List;

public interface ICitiesService {
    List<City> generateRandomCities(int numberOfCities);
}

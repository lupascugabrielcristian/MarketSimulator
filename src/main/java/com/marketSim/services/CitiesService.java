package com.marketSim.services;

import com.marketSim.Model.City;
import com.marketSim.Model.Commodity;
import com.marketSim.Model.Factory;
import com.marketSim.Model.Position;
import com.marketSim.Repositories.CitiesRepository;
import com.marketSim.interfaces.ICitiesService;
import com.marketSim.interfaces.ICommoditiesParser;
import com.marketSim.interfaces.IFactoriesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Component
public class CitiesService implements ICitiesService {

    private IFactoriesService factoriesService;

    @Autowired
    public CitiesService(IFactoriesService factoriesService) {
        this.factoriesService = factoriesService;
    }

    @Override
    public List<City> generateRandomCities(int numberOfCities, String namesFilePath) {
        List<City> result = new ArrayList<>();

        while (result.size() < numberOfCities) {
            result.add(createCity(namesFilePath));
        }

        return result;
    }

    private City createCity(String path) {
        Random random = new Random();

        City newCity = new City();
        newCity.setName(getRandomCityName(path));
        Position cityPosition = new Position();
        cityPosition.setY(random.nextInt(500));
        cityPosition.setX(random.nextInt(900));
        newCity.setPosition(cityPosition);


        Factory factory = factoriesService.getRandomFactory();
        factory.setLocation(newCity.getName());
        newCity.addFactory(factory);


        return newCity;

    }

    private Factory addAFactory(List<Commodity> availableCommodities) {
        Factory factory = new Factory();
        Commodity commodity = availableCommodities.get(new Random().nextInt(availableCommodities.size()));
        factory.setCommodity(commodity);
        return factory;
    }

    private String getRandomCityName(String path){
        List<String> allNames = readCityNames(path);
        Random random = new Random();
        int chosenIndex = random.nextInt(allNames.size() - 1);
        return allNames.get(chosenIndex);
    }

    private List<String> readCityNames(String path){
        List<String> cityNames = new ArrayList<>();
        String adresa = "-";

        Resource rsrc = new ClassPathResource(path);
        try {
            adresa = rsrc.getFile().getAbsolutePath();
            BufferedReader reader = new BufferedReader(new FileReader(adresa));
            while (true) {
                String cityName = reader.readLine();
                if (cityName != null) {
                    cityNames.add(cityName);
                }
                else break;
            }
        } catch (IOException e) {
            System.err.println("Cannot read city_names.txt");
            System.err.println("Path: " + adresa);
        }

        return cityNames;
    }
}

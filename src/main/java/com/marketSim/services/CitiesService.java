package com.marketSim.services;

import com.marketSim.Model.City;
import com.marketSim.interfaces.ICitiesService;
import org.springframework.core.io.ClassPathResource;
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
        newCity.setName(getRandomCityName());
        newCity.setLatitude(random.nextInt(500));
        newCity.setLongitude(random.nextInt(900));

        return newCity;

    }

    private String getRandomCityName(){
        List<String> allNames = readCityNames();
        Random random = new Random();
        int chosenIndex = random.nextInt(allNames.size() - 1);
        return allNames.get(chosenIndex);
    }

    private List<String> readCityNames(){
        List<String> cityNames = new ArrayList<>();

        Resource rsrc = new ClassPathResource("/static/stuff/city_names.txt");
        try {
            String adresa = rsrc.getFile().getAbsolutePath();
            BufferedReader reader = new BufferedReader(new FileReader(adresa));
            while (true) {
                String cityName = reader.readLine();
                if (cityName != null) {
                    cityNames.add(cityName);
                }
                else break;
            }
        } catch (IOException e) {
            System.err.println("Nop");
        }

        return cityNames;
    }
}

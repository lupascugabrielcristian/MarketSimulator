package com.marketSim;

import com.marketSim.Model.City;
import com.marketSim.interfaces.ICitiesService;
import com.marketSim.services.CitiesService;
import org.junit.Test;

import java.util.List;

import static junit.framework.TestCase.assertNotNull;

public class CitiesServiceTests {

    @Test
    public void should_read_city_names_file() {
        // Arrange
        ICitiesService citiesService = new CitiesService();

        // Act
        List<City>generatedCities = citiesService.generateRandomCities(1);

        //Assert
        assertNotNull("Should have name", generatedCities.get(0).getName());
    }
}

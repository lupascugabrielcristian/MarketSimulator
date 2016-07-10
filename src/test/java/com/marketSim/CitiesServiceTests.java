package com.marketSim;

import com.marketSim.Model.City;
import com.marketSim.interfaces.ICitiesService;
import com.marketSim.interfaces.ICommoditiesParser;
import com.marketSim.interfaces.IFactoriesService;
import com.marketSim.services.CitiesService;
import com.marketSim.services.CommoditiesParser;
import com.marketSim.services.FactoriesService;
import org.junit.Test;

import java.util.List;

import static junit.framework.TestCase.assertNotNull;

public class CitiesServiceTests {

    @Test
    public void should_read_city_names_file() {
        // Arrange
        ICommoditiesParser commoditiesParser = new CommoditiesParser();
        IFactoriesService factoriesService = new FactoriesService(commoditiesParser);
        ICitiesService citiesService = new CitiesService(factoriesService);

        // Act
        List<City>generatedCities = citiesService.generateRandomCities(1);

        //Assert
        assertNotNull("Should have name", generatedCities.get(0).getName());
    }

    @Test
    public void should_read_commodities_file() {
        // Arrange
        ICommoditiesParser commoditiesParser = new CommoditiesParser();
        IFactoriesService factoriesService = new FactoriesService(commoditiesParser);
        ICitiesService citiesService = new CitiesService(factoriesService);

        // Act
        List<City>generatedCities = citiesService.generateRandomCities(1);

        //Assert
        assertNotNull("Should have factory", generatedCities.get(0).getFactories().size() > 0);
    }
}

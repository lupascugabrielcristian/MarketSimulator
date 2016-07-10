package com.marketSim;

import com.marketSim.Model.Commodity;
import com.marketSim.interfaces.ICommoditiesParser;
import com.marketSim.services.CommoditiesParser;
import org.junit.Test;

import java.util.List;

import static junit.framework.Assert.assertEquals;
import static junit.framework.TestCase.assertTrue;

public class CommoditiesParserTests {

    @Test
    public void should_parse_files() {

        // Arrange
        ICommoditiesParser commoditiesParser = new CommoditiesParser();

        // Act
        List<Commodity> parsedCommodities = commoditiesParser.parseFile("/static/stuff/commodities_test.xml");

        // Assert
        assertTrue("Should parse 2 commodities", parsedCommodities.size() == 2);
    }

    @Test
    public void should_parse_corect_values() {
        // Arrange
        ICommoditiesParser commoditiesParser = new CommoditiesParser();

        // Act
        List<Commodity> parsedCommodities = commoditiesParser.parseFile("/static/stuff/commodities_test.xml");
        double firstProductionValue = parsedCommodities.get(0).getQuantity();

        //Assert
        assertEquals("Should be 100", 100, firstProductionValue, 0.1);
    }
}

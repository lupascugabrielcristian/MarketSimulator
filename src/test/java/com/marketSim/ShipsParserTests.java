package com.marketSim;

import com.marketSim.Model.Commodity;
import com.marketSim.Model.Ship;
import com.marketSim.interfaces.ICommoditiesParser;
import com.marketSim.interfaces.IShipsParser;
import com.marketSim.services.CommoditiesParser;
import com.marketSim.services.ShipsParser;
import org.junit.Test;

import java.util.List;

import static junit.framework.TestCase.assertTrue;
import static org.junit.Assert.assertEquals;

public class ShipsParserTests {

    @Test
    public void should_parse_file() {
        // Arrange
        IShipsParser commoditiesParser = new ShipsParser();

        // Act
        List<Ship> parsedShips = commoditiesParser.parseFile("/static/stuff/ships_test.xml");

        // Assert
        assertTrue("Should parse 5 ships", parsedShips.size() == 5);
    }

    @Test
    public void should_parse_correct_values(){
        // Arrange
        IShipsParser commoditiesParser = new ShipsParser();

        // Act
        List<Ship> parsedShips = commoditiesParser.parseFile("/static/stuff/ships_test.xml");

        // Assert
        assertEquals("Should get value 100 for speed", parsedShips.get(0).getMaxSpeed(), 100, 0.1);
    }
}

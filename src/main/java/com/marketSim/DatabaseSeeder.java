package com.marketSim;

import com.marketSim.Model.Commodity;
import com.marketSim.Model.Ship;
import com.marketSim.Repositories.CommoditiesRepository;
import com.marketSim.Repositories.GameSituationRepository;
import com.marketSim.Repositories.ShipsRepository;
import com.marketSim.interfaces.ICommoditiesParser;
import com.marketSim.interfaces.IShipsParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    private ApplicationProperties applicationProperties;
    private IShipsParser shipsParser;
    private ICommoditiesParser commoditiesParser;
    private ShipsRepository shipsRepository;
    private CommoditiesRepository commoditiesRepository;
    private GameSituationRepository gameSituationRepository;

    @Autowired
    public DatabaseSeeder(ApplicationProperties applicationProperties, IShipsParser shipsParser, ICommoditiesParser commoditiesParser, ShipsRepository shipsRepository, CommoditiesRepository commoditiesRepository, GameSituationRepository gameSituationRepository) {
        this.applicationProperties = applicationProperties;
        this.shipsParser = shipsParser;
        this.commoditiesParser = commoditiesParser;
        this.shipsRepository = shipsRepository;
        this.commoditiesRepository = commoditiesRepository;
        this.gameSituationRepository = gameSituationRepository;
    }

    @Override
    public void run(String... strings) throws Exception {
        seedDatabase();
    }

    private void seedDatabase() {
        if (applicationProperties.isRecreateDatabase()){
            System.err.println("Recreating database");

            shipsRepository.deleteAll();
            List<Ship> availableShips = shipsParser.parseFile("/static/stuff/default_ships.xml");
            shipsRepository.save(availableShips);

            commoditiesRepository.deleteAll();
            List<Commodity> availableCommodities = commoditiesParser.parseFile("/static/stuff/commodities.xml");
            commoditiesRepository.save(availableCommodities);
        }
        else {
          System.err.println("Database will NOT be recreated.");
        }

        if (applicationProperties.isRemoveSavedGames()) {
            System.err.println("Removing saved games");
            gameSituationRepository.deleteAll();
        }
        else {
            System.out.println("Saved games will not be removed");
        }
    }
}

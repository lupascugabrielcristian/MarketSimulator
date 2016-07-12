package com.marketSim.services;

import com.marketSim.Model.Ship;
import com.marketSim.Repositories.ShipsRepository;
import com.marketSim.interfaces.IShipsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ShipsService implements IShipsService{

    private ShipsRepository shipsRepository;

    @Autowired
    public ShipsService(ShipsRepository shipsRepository) {
        this.shipsRepository = shipsRepository;
    }

    @Override
    public List<Ship> getAvailableShips() {
        return shipsRepository.findAll();
    }
}

package com.marketSim.services;

import com.marketSim.Model.Player;
import com.marketSim.Repositories.PlayerRepository;
import com.marketSim.interfaces.IPlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PlayerService implements IPlayerService {

    @Autowired
    PlayerRepository playerRepository;

    @Override
    public Player initializePlayer() {
        Player player = new Player();
        player.setMoney(100000);
        player.setName("Anonymous");
        return player;
    }
}

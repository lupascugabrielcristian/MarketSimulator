package com.marketSim.services;

import com.marketSim.Model.GameSituation;
import com.marketSim.Repositories.GameRepository;
import com.marketSim.interfaces.IGameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class GameService implements IGameService {

    @Autowired
    private GameRepository gameRepository;

    @Override
    public void saveGame(GameSituation gameSituation) {
        GameSituation previous = gameRepository.findOneById(gameSituation.getId());
        if (previous != null) {
          gameRepository.delete(previous);
        }
        gameRepository.save(gameSituation);
    }

    @Override
    public List<GameSituation> loadGames() {
        return gameRepository.findAll();
    }

    @Override
    public GameSituation loadGame(String id) {
        GameSituation foundGame = gameRepository.findOneById(id);
        return foundGame;
    }
}

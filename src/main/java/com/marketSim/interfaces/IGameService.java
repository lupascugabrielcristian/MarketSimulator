package com.marketSim.interfaces;

import com.marketSim.Model.GameSituation;

import java.util.List;

public interface IGameService {

    void saveGame(GameSituation gameSituation);

    List<GameSituation> loadGames();

    GameSituation loadGame(String id);
}

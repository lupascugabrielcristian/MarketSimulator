package com.marketSim.interfaces;

import com.marketSim.Model.Ship;

import java.util.List;

public interface IShipsParser {
    List<Ship> parseFile(String filePath);
}

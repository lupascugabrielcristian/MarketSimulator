package com.marketSim.interfaces;

import com.marketSim.Model.Commodity;

import java.util.List;

public interface ICommoditiesParser {
    List<Commodity> parseFile(String path);
}

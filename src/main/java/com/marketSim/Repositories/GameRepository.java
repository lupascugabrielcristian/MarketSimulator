package com.marketSim.Repositories;

import com.marketSim.Model.GameSituation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameRepository extends MongoRepository<GameSituation, Long> {
}

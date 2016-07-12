package com.marketSim.Repositories;

import com.marketSim.Model.Ship;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ShipsRepository extends MongoRepository<Ship, Long>{
}

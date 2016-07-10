package com.marketSim.Repositories;

import com.marketSim.Model.Factory;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FactoriesRepository extends MongoRepository<Factory, Long>{
}

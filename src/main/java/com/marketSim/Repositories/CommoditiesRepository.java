package com.marketSim.Repositories;

import com.marketSim.Model.Commodity;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CommoditiesRepository extends MongoRepository<Commodity, Long>{
}

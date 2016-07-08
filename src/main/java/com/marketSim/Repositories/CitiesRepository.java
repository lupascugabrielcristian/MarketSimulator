package com.marketSim.Repositories;

import com.marketSim.Model.City;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CitiesRepository extends MongoRepository<City, Long>{
}

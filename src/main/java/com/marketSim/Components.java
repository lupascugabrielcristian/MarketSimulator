package com.marketSim;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Components {

    @Bean
    ApplicationProperties getApplicationProperties() {
        return new ApplicationProperties();
    }
}

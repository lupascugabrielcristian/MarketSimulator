package com.marketSim;

import org.springframework.beans.factory.annotation.Value;

public class ApplicationProperties {

    @Value("${recreateDatabase}")
    private boolean recreateDatabase;

    public boolean isRecreateDatabase() {
        return recreateDatabase;
    }

    public void setRecreateDatabase(boolean recreateDatabase) {
        this.recreateDatabase = recreateDatabase;
    }
}

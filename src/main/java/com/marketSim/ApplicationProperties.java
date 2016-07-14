package com.marketSim;

import org.springframework.beans.factory.annotation.Value;

public class ApplicationProperties {

    @Value("${recreateDatabase}")
    private boolean recreateDatabase;
    @Value("${removeSavedGames}")
    private boolean removeSavedGames;

    public boolean isRecreateDatabase() {
        return recreateDatabase;
    }

    public void setRecreateDatabase(boolean recreateDatabase) {
        this.recreateDatabase = recreateDatabase;
    }

    public boolean isRemoveSavedGames() {
        return removeSavedGames;
    }

    public void setRemoveSavedGames(boolean removeSavedGames) {
        this.removeSavedGames = removeSavedGames;
    }
}

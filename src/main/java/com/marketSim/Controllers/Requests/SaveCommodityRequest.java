package com.marketSim.Controllers.Requests;

import com.marketSim.Model.Commodity;

public class SaveCommodityRequest {
    private Commodity commodity;

    public SaveCommodityRequest(Commodity commodity) {
        this.commodity = commodity;
    }

    public SaveCommodityRequest() {
    }

    public Commodity getCommodity() {
        return commodity;
    }

    public void setCommodity(Commodity commodity) {
        this.commodity = commodity;
    }
}

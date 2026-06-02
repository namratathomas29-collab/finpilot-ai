package com.namrata.authsystem.model;

import java.util.List;
import java.util.Map;

public class AnalyticsResponse {

    private String title;

    private String insight;

    private List<Map<String, Object>> pieData;

    private List<Map<String, Object>> barData;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getInsight() {
        return insight;
    }

    public void setInsight(String insight) {
        this.insight = insight;
    }

    public List<Map<String, Object>> getPieData() {
        return pieData;
    }

    public void setPieData(
            List<Map<String, Object>> pieData
    ) {
        this.pieData = pieData;
    }

    public List<Map<String, Object>> getBarData() {
        return barData;
    }

    public void setBarData(
            List<Map<String, Object>> barData
    ) {
        this.barData = barData;
    }
}
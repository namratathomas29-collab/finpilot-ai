package com.namrata.authsystem.model;

public class GoalAnalysisResponse {

    private String goalName;

    private Double goalAmount;

    private Double income;

    private Double expenses;

    private Double remainingMoney;

    private Double monthsNeeded;

    public String getGoalName() {
        return goalName;
    }

    public void setGoalName(String goalName) {
        this.goalName = goalName;
    }

    public Double getGoalAmount() {
        return goalAmount;
    }

    public void setGoalAmount(Double goalAmount) {
        this.goalAmount = goalAmount;
    }

    public Double getIncome() {
        return income;
    }

    public void setIncome(Double income) {
        this.income = income;
    }

    public Double getExpenses() {
        return expenses;
    }

    public void setExpenses(Double expenses) {
        this.expenses = expenses;
    }

    public Double getRemainingMoney() {
        return remainingMoney;
    }

    public void setRemainingMoney(Double remainingMoney) {
        this.remainingMoney = remainingMoney;
    }

    public Double getMonthsNeeded() {
        return monthsNeeded;
    }

    public void setMonthsNeeded(Double monthsNeeded) {
        this.monthsNeeded = monthsNeeded;
    }
}
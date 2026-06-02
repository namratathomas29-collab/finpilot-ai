package com.namrata.authsystem.model;

import jakarta.persistence.*;

@Entity
public class FinancialGoal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Monthly income
    private Double monthlyIncome;

    // Goal name
    private String goalName;

    // Target amount
    private Double targetAmount;

    // Goal duration in months
    private Integer targetMonths;

    // Emergency savings
    private Double emergencyReserve;

    // Fixed monthly expenses
    private Double fixedCommitments;

    // Relationship with user
    @OneToOne
    private User user;

    // GETTERS AND SETTERS

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getMonthlyIncome() {
        return monthlyIncome;
    }

    public void setMonthlyIncome(Double monthlyIncome) {
        this.monthlyIncome = monthlyIncome;
    }

    public String getGoalName() {
        return goalName;
    }

    public void setGoalName(String goalName) {
        this.goalName = goalName;
    }

    public Double getTargetAmount() {
        return targetAmount;
    }

    public void setTargetAmount(Double targetAmount) {
        this.targetAmount = targetAmount;
    }

    public Integer getTargetMonths() {
        return targetMonths;
    }

    public void setTargetMonths(Integer targetMonths) {
        this.targetMonths = targetMonths;
    }

    public Double getEmergencyReserve() {
        return emergencyReserve;
    }

    public void setEmergencyReserve(Double emergencyReserve) {
        this.emergencyReserve = emergencyReserve;
    }

    public Double getFixedCommitments() {
        return fixedCommitments;
    }

    public void setFixedCommitments(Double fixedCommitments) {
        this.fixedCommitments = fixedCommitments;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}

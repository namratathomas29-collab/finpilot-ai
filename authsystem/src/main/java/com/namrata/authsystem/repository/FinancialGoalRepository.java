package com.namrata.authsystem.repository;

import com.namrata.authsystem.model.FinancialGoal;
import com.namrata.authsystem.model.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FinancialGoalRepository
        extends JpaRepository<FinancialGoal, Long> {

    FinancialGoal findByUser(User user);
}
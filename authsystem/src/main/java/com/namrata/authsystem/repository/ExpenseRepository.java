package com.namrata.authsystem.repository;

import com.namrata.authsystem.model.Expense;
import com.namrata.authsystem.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    @Query("SELECT SUM(e.amount) FROM Expense e")
    Double getTotalExpenses();

    List<Expense> findByCategory(String category);

    List<Expense> findByUser(User user);

    List<Expense> findByUserAndCategory(
            User user,
            String category
    );

    List<Expense> findByUserAndDateBetween(
            User user,
            LocalDate startDate,
            LocalDate endDate
            
    );


 
}
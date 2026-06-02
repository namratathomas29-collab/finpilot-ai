package com.namrata.authsystem.controller;

import com.namrata.authsystem.model.Expense;
import com.namrata.authsystem.repository.ExpenseRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PathVariable;
import com.namrata.authsystem.model.User;
import com.namrata.authsystem.repository.UserRepository;
import org.springframework.security.core.Authentication;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/expenses")
public class ExpenseController {

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private UserRepository userRepository;

    // ✅ ADD EXPENSE WITH LOGGED-IN USER
    @PostMapping("/add")
    public Expense addExpense(
            @RequestBody Expense expense,
            Authentication authentication
    ) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email);

        expense.setUser(user);

        expense.setDate(LocalDate.now());

        return expenseRepository.save(expense);
    }

    // ✅ GET ALL EXPENSES
    @GetMapping("/all")
    public List<Expense> getAllExpenses() {

        return expenseRepository.findAll();
    }

    // ✅ DELETE EXPENSE
    @DeleteMapping("/delete/{id}")
    public String deleteExpense(@PathVariable Long id) {

        expenseRepository.deleteById(id);

        return "Expense deleted successfully";
    }

    // ✅ UPDATE EXPENSE
    @PutMapping("/update/{id}")
    public Expense updateExpense(
            @PathVariable Long id,
            @RequestBody Expense updatedExpense
    ) {

        Expense expense = expenseRepository.findById(id).orElse(null);

        if (expense != null) {

            expense.setAmount(updatedExpense.getAmount());
            expense.setCategory(updatedExpense.getCategory());
            expense.setDescription(updatedExpense.getDescription());

            return expenseRepository.save(expense);
        }

        return null;
    }


    // ✅ GET EXPENSES BY CATEGORY
    @GetMapping("/category/{category}")
    public List<Expense> getExpensesByCategory(
            @PathVariable String category
    ) {

        return expenseRepository.findByCategory(category);
    }

    // ✅ GET LOGGED-IN USER'S EXPENSES
    @GetMapping("/my-expenses")
    public List<Expense> getMyExpenses(
            Authentication authentication
    ) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email);

        return expenseRepository.findByUser(user);
    }

    // ✅ TOTAL EXPENSE OF LOGGED-IN USER
    @GetMapping("/total")
    public Double getTotalExpense(
            Authentication authentication
    ) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email);

        List<Expense> expenses = expenseRepository.findByUser(user);

        double total = 0;

        for (Expense expense : expenses) {

            total = total + expense.getAmount();
        }

        return total;
    }

    // ✅ CATEGORY TOTAL
    @GetMapping("/category-total/{category}")
    public Double getCategoryTotal(
            @PathVariable String category,
            Authentication authentication
    ) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email);

        List<Expense> expenses =
                expenseRepository.findByUserAndCategory(
                        user,
                        category
                );

        double total = 0;

        for (Expense expense : expenses) {

            total += expense.getAmount();
        }

        return total;
    }

    // ✅ MONTHLY TOTAL EXPENSE
    @GetMapping("/monthly-total")
    public Double getMonthlyTotal(
            Authentication authentication
    ) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email);

        // First day of current month
        LocalDate startDate =
                LocalDate.now().withDayOfMonth(1);

        // Today's date
        LocalDate endDate =
                LocalDate.now();

        List<Expense> expenses =
                expenseRepository.findByUserAndDateBetween(
                        user,
                        startDate,
                        endDate
                );

        double total = 0;

        for (Expense expense : expenses) {

            total += expense.getAmount();
        }

        return total;
    }

    // ✅ AI SMART FOOD ALERT
    @GetMapping("/smart-alert")
    public String smartAlert(
            Authentication authentication
    ) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email);

        List<Expense> foodExpenses =
                expenseRepository.findByUserAndCategory(
                        user,
                        "food"
                );

        double totalFoodExpense = 0;

        for (Expense expense : foodExpenses) {

            totalFoodExpense += expense.getAmount();
        }

        if (totalFoodExpense > 1000) {

            return "⚠ Warning! Your food spending is very high this month!";
        }

        return "✅ Food spending is under control.";
    }
}
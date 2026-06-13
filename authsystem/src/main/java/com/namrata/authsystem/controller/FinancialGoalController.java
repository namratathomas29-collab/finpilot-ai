package com.namrata.authsystem.controller;

import com.namrata.authsystem.model.Expense;
import com.namrata.authsystem.model.FinancialGoal;
import com.namrata.authsystem.model.InsightCard;
import com.namrata.authsystem.model.User;
import com.namrata.authsystem.model.GoalAnalysisResponse;

import com.namrata.authsystem.repository.ExpenseRepository;
import com.namrata.authsystem.repository.FinancialGoalRepository;
import com.namrata.authsystem.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/financial-goal")
public class FinancialGoalController {

    @Autowired
    private FinancialGoalRepository financialGoalRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ExpenseRepository expenseRepository;

    @PostMapping("/save")
    public FinancialGoal saveGoal(
            @RequestBody FinancialGoal financialGoal,
            Authentication authentication
    ) {
        String email = authentication.getName();

        System.out.println("EMAIL = " + email);

        User user = userRepository.findByEmail(email);

        System.out.println("USER ID = " + user.getId());

        FinancialGoal existingGoal =
                financialGoalRepository.findByUser(user);

        System.out.println("GOAL = " + existingGoal);

        //String email = authentication.getName();

        //User user = userRepository.findByEmail(email);

        //FinancialGoal existingGoal =
                //financialGoalRepository.findByUser(user);

        if(existingGoal != null){

            existingGoal.setMonthlyIncome(
                    financialGoal.getMonthlyIncome());

            existingGoal.setGoalName(
                    financialGoal.getGoalName());

            existingGoal.setTargetAmount(
                    financialGoal.getTargetAmount());

            existingGoal.setTargetMonths(
                    financialGoal.getTargetMonths());

            existingGoal.setEmergencyReserve(
                    financialGoal.getEmergencyReserve());

            existingGoal.setFixedCommitments(
                    financialGoal.getFixedCommitments());

            return financialGoalRepository.save(existingGoal);
        }

        financialGoal.setUser(user);

        return financialGoalRepository.save(financialGoal);
    }

    // ✅ AI SMART BUDGET RECOMMENDATION
    @GetMapping("/smart-budget")
    public String smartBudget(
            Authentication authentication
    ) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email);

        FinancialGoal goal =
                financialGoalRepository.findByUser(user);

        // Monthly savings needed
        double monthlySavingNeeded =
                goal.getTargetAmount()
                        / goal.getTargetMonths();

        // Safe spending money
        double safeSpending =
                goal.getMonthlyIncome()
                        - monthlySavingNeeded
                        - goal.getEmergencyReserve()
                        - goal.getFixedCommitments();

        return "AI Recommendation: Your safe monthly spending budget is ₹"
                + safeSpending;
    }

    // ✅ AI OVERSPENDING ANALYZER
    @GetMapping("/analyze-spending")
    public String analyzeSpending(
            Authentication authentication
    ) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email);

        FinancialGoal goal =
                financialGoalRepository.findByUser(user);

        // Monthly savings needed
        double monthlySavingNeeded =
                goal.getTargetAmount()
                        / goal.getTargetMonths();

        // Safe spending calculation
        double safeSpending =
                goal.getMonthlyIncome()
                        - monthlySavingNeeded
                        - goal.getEmergencyReserve()
                        - goal.getFixedCommitments();

        // Current month dates
        LocalDate startDate =
                LocalDate.now().withDayOfMonth(1);

        LocalDate endDate =
                LocalDate.now();

        // Fetch current month expenses
        List<Expense> expenses =
                expenseRepository.findByUserAndDateBetween(
                        user,
                        startDate,
                        endDate
                );

        // Calculate actual spending
        double actualSpending = 0;

        for (Expense expense : expenses) {

            actualSpending += expense.getAmount();
        }

        // AI Analysis
        if (actualSpending > safeSpending) {

            double extraSpent =
                    actualSpending - safeSpending;

            // Remaining days in current month
            int remainingDays =
                    LocalDate.now().lengthOfMonth()
                            - LocalDate.now().getDayOfMonth();

            // Avoid division by zero
            if (remainingDays <= 0) {

                return "⚠ Overspending detected. Month ending today. Financial goal may get delayed.";
            }

            // Daily reduction needed
            double dailyReduction =
                    extraSpent / remainingDays;

            // Extreme overspending case
            if (dailyReduction > 1000) {

                return "⚠ Critical Overspending! You exceeded safe budget by ₹"
                        + extraSpent
                        + ". Goal delay risk is very high.";
            }

            return "⚠ Overspending Alert! To stay on track with your goal, reduce daily spending by ₹"
                    + dailyReduction
                    + " for remaining "
                    + remainingDays
                    + " days.";
        }

        // Safe case
        double remaining =
                safeSpending - actualSpending;

        return "✅ Great! You are within safe budget. You can still safely spend ₹"
                + remaining;
    }

    // ✅ CATEGORY ANALYTICS ENGINE
    @GetMapping("/category-analytics")
    public Map<String, Object> categoryAnalytics(
            Authentication authentication
    ) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email);

        // Current month dates
        LocalDate startDate =
                LocalDate.now().withDayOfMonth(1);

        LocalDate endDate =
                LocalDate.now();

        // Fetch current month expenses
        List<Expense> expenses =
                expenseRepository.findByUserAndDateBetween(
                        user,
                        startDate,
                        endDate
                );

        // Store category totals
        Map<String, Double> categoryTotals =
                new HashMap<>();

        // Calculate totals category-wise
        for (Expense expense : expenses) {

            String category =
                    expense.getCategory();

            double amount =
                    expense.getAmount();

            // If category already exists
            if (categoryTotals.containsKey(category)) {

                double existingAmount =
                        categoryTotals.get(category);

                categoryTotals.put(
                        category,
                        existingAmount + amount
                );

            } else {

                // First entry for category
                categoryTotals.put(category, amount);
            }
        }

        // Find highest spending category
        String highestCategory = "";

        double highestAmount = 0;

        for (String category : categoryTotals.keySet()) {

            double amount =
                    categoryTotals.get(category);

            if (amount > highestAmount) {

                highestAmount = amount;

                highestCategory = category;
            }
        }

        // Final analytics response
        Map<String, Object> response =
                new HashMap<>();

        response.put("categoryTotals", categoryTotals);

        response.put(
                "highestSpendingCategory",
                highestCategory
        );

        response.put(
                "highestAmount",
                highestAmount
        );

        return response;
    }

    // ✅ AI CATEGORY INSIGHT ENGINE
    @GetMapping("/ai-insights")
    public String aiInsights(
            Authentication authentication
    ) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email);

        // Get current month expenses
        LocalDate startDate =
                LocalDate.now().withDayOfMonth(1);

        LocalDate endDate =
                LocalDate.now();

        List<Expense> expenses =
                expenseRepository.findByUserAndDateBetween(
                        user,
                        startDate,
                        endDate
                );

        // Store category totals
        Map<String, Double> categoryTotals =
                new HashMap<>();

        double totalSpending = 0;

        // Calculate totals
        for (Expense expense : expenses) {

            String category =
                    expense.getCategory();

            double amount =
                    expense.getAmount();

            totalSpending += amount;

            if (categoryTotals.containsKey(category)) {

                double existingAmount =
                        categoryTotals.get(category);

                categoryTotals.put(
                        category,
                        existingAmount + amount
                );

            } else {

                categoryTotals.put(category, amount);
            }
        }

        // Find highest category
        String highestCategory = "";

        double highestAmount = 0;

        for (String category : categoryTotals.keySet()) {

            double amount =
                    categoryTotals.get(category);

            if (amount > highestAmount) {

                highestAmount = amount;

                highestCategory = category;
            }
        }

        // Percentage calculation
        double percentage = 0;

        if(totalSpending > 0){

            percentage =
                    (highestAmount / totalSpending) * 100;
        }

        String formattedPercentage =
                String.format("%.1f", percentage);

        // Financial goal info
        FinancialGoal goal =
                financialGoalRepository.findByUser(user);

        // AI interpretation
        return "⚠ AI Financial Insight: Your highest spending category is "
                + highestCategory
                + " with total spending of ₹"
                + String.format("%.0f", highestAmount)
                + ". This category contributes "
                + formattedPercentage
                + "% of your monthly expenses. Reducing "
                + highestCategory
                + " expenses can help you achieve your goal of '"
                + goal.getGoalName()
                + "' faster.";
    }

    // ✅ FINANCIAL HEALTH SCORE SYSTEM
    @GetMapping("/budget-score")
    public String budgetScore(
            Authentication authentication
    ) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email);

        FinancialGoal goal =
                financialGoalRepository.findByUser(user);

        // Starting score
        int score = 100;

        // Monthly savings needed
        double monthlySavingNeeded =
                goal.getTargetAmount()
                        / goal.getTargetMonths();

        // Safe spending
        double safeSpending =
                goal.getMonthlyIncome()
                        - monthlySavingNeeded
                        - goal.getEmergencyReserve()
                        - goal.getFixedCommitments();

        // Current month expenses
        LocalDate startDate =
                LocalDate.now().withDayOfMonth(1);

        LocalDate endDate =
                LocalDate.now();

        List<Expense> expenses =
                expenseRepository.findByUserAndDateBetween(
                        user,
                        startDate,
                        endDate
                );

        // Analytics
        Map<String, Double> categoryTotals =
                new HashMap<>();

        double totalSpending = 0;

        for (Expense expense : expenses) {

            String category =
                    expense.getCategory();

            double amount =
                    expense.getAmount();

            totalSpending += amount;

            if (categoryTotals.containsKey(category)) {

                double existingAmount =
                        categoryTotals.get(category);

                categoryTotals.put(
                        category,
                        existingAmount + amount
                );

            } else {

                categoryTotals.put(category, amount);
            }
        }

        // Overspending check
        if (totalSpending > safeSpending) {

            score -= 25;
        }

        // Highest category analysis
        double highestAmount = 0;

        for (String category : categoryTotals.keySet()) {

            double amount =
                    categoryTotals.get(category);

            if (amount > highestAmount) {

                highestAmount = amount;
            }
        }

        // Percentage concentration
        double percentage = 0;

        if(totalSpending > 0){
            percentage =
                    (highestAmount / totalSpending) * 100;
        }
        String formattedPercentage =
                String.format("%.1f", percentage);

        // Risky category concentration
        if (percentage > 70) {

            score -= 15;
        }

        // Prevent negative score
        if (score < 0) {

            score = 0;
        }

        // AI Financial Status
        String status;

        if (score >= 80) {

            status = "Excellent Financial Health";

        } else if (score >= 60) {

            status = "Good Financial Health";

        } else if (score >= 40) {

            status = "Risky Financial Behavior";

        } else {

            status = "Critical Financial Condition";
        }

        return "⭐ Financial Health Score: "
                + score
                + "/100 | Status: "
                + status;
    }

    // ✅ AI SPENDING SUGGESTION ENGINE
    @GetMapping("/spending-suggestions")
    public String spendingSuggestions(
            Authentication authentication
    ) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email);

        // Current month dates
        LocalDate startDate =
                LocalDate.now().withDayOfMonth(1);

        LocalDate endDate =
                LocalDate.now();

        // Fetch current month expenses
        List<Expense> expenses =
                expenseRepository.findByUserAndDateBetween(
                        user,
                        startDate,
                        endDate
                );

        // Category totals
        Map<String, Double> categoryTotals =
                new HashMap<>();

        for (Expense expense : expenses) {

            String category =
                    expense.getCategory();

            double amount =
                    expense.getAmount();

            if (categoryTotals.containsKey(category)) {

                double existingAmount =
                        categoryTotals.get(category);

                categoryTotals.put(
                        category,
                        existingAmount + amount
                );

            } else {

                categoryTotals.put(category, amount);
            }
        }

        // Highest category
        String highestCategory = "";

        double highestAmount = 0;

        for (String category : categoryTotals.keySet()) {

            double amount =
                    categoryTotals.get(category);

            if (amount > highestAmount) {

                highestAmount = amount;

                highestCategory = category;
            }
        }

        // Suggested reduction percentage
        double reductionPercentage = 15;

        // Savings calculation
        double suggestedSavings =
                (highestAmount * reductionPercentage) / 100;

        // Financial goal
        FinancialGoal goal =
                financialGoalRepository.findByUser(user);

        return "🤖 AI Suggestion: Your highest spending category is "
                + highestCategory
                + ". Reducing "
                + highestCategory
                + " expenses by "
                + reductionPercentage
                + "% can help save approximately ₹"
                + suggestedSavings
                + " per month and accelerate your goal of '"
                + goal.getGoalName()
                + "'.";
    }

    // ✅ AI DASHBOARD ENGINE
    @GetMapping("/ai-dashboard")
    public List<InsightCard> aiDashboard(
            Authentication authentication
    ) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email);

        FinancialGoal goal =
                financialGoalRepository.findByUser(user);
        if (goal == null) {

            List<InsightCard> cards =
                    new ArrayList<>();

            cards.add(
                    new InsightCard(
                            "warning",
                            "No Financial Goal",
                            "Please create a financial goal first."
                    )
            );

            return cards;
        }
        // Current month dates
        LocalDate startDate =
                LocalDate.now().withDayOfMonth(1);

        LocalDate endDate =
                LocalDate.now();

        // Fetch expenses
        List<Expense> expenses =
                expenseRepository.findByUserAndDateBetween(
                        user,
                        startDate,
                        endDate
                );

        // Analytics
        Map<String, Double> categoryTotals =
                new HashMap<>();

        double totalSpending = 0;

        for (Expense expense : expenses) {

            String category =
                    expense.getCategory();

            double amount =
                    expense.getAmount();

            totalSpending += amount;

            if (categoryTotals.containsKey(category)) {

                double existingAmount =
                        categoryTotals.get(category);

                categoryTotals.put(
                        category,
                        existingAmount + amount
                );

            } else {

                categoryTotals.put(category, amount);
            }
        }

        // Highest category
        String highestCategory = "";

        double highestAmount = 0;

        for (String category : categoryTotals.keySet()) {

            double amount =
                    categoryTotals.get(category);

            if (amount > highestAmount) {

                highestAmount = amount;

                highestCategory = category;
            }
        }

        // Percentage
        double percentage = 0;

        if (totalSpending > 0) {

            percentage =
                    (highestAmount / totalSpending) * 100;
        }

        String formattedPercentage =
                String.format("%.1f", percentage);

        // Monthly savings needed
        double monthlySavingNeeded =
                goal.getTargetAmount()
                        / goal.getTargetMonths();

        // Safe spending
        double safeSpending =
                goal.getMonthlyIncome()
                        - monthlySavingNeeded
                        - goal.getEmergencyReserve()
                        - goal.getFixedCommitments();

        // Financial score
        int score = 100;

        if (totalSpending > safeSpending) {

            score -= 25;
        }

        if (percentage > 70) {

            score -= 15;
        }

        // Suggestion savings
        double suggestedSavings =
                (highestAmount * 15) / 100;

        String formattedSavings =
                String.format("%.0f", suggestedSavings);

        // Create dashboard cards
        List<InsightCard> cards =
                new ArrayList<>();

        // SCORE CARD
        cards.add(
                new InsightCard(
                        "score",
                        "Financial Health Score",
                        "Your current financial health score is "
                                + score
                                + "/100."
                )
        );

        // WARNING CARD
        if (totalSpending > safeSpending) {

            cards.add(
                    new InsightCard(
                            "warning",
                            "Overspending Alert",
                            "Your spending exceeded safe budget. Reduce "
                                    + highestCategory
                                    + " expenses to stay on track."
                    )
            );
        }

        // AI INSIGHT CARD
        cards.add(
                new InsightCard(
                        "insight",
                        "Top Spending Category",
                        highestCategory
                                + " contributes "
                                + formattedPercentage
                                + "% of your monthly spending."
                )
        );

        // AI SUGGESTION CARD
        cards.add(
                new InsightCard(
                        "suggestion",
                        "AI Savings Suggestion",
                        "Reducing "
                                + highestCategory
                                + " expenses by 15% can save approximately ₹"
                                + formattedSavings
                                + " per month."
                )
        );

        // GOAL CARD
        cards.add(
                new InsightCard(
                        "goal",
                        "Goal Progress",
                        "Your financial goal is: "
                                + goal.getGoalName()
                )
        );

        return cards;


    }
    @GetMapping("/score-analytics")
    public Map<String,Object> scoreAnalytics(
            Authentication authentication
    ) {

        Map<String,Object> response =
                new HashMap<>();

        response.put(
                "months",
                List.of("Jan","Feb","Mar","Apr","May","Jun")
        );

        response.put(
                "scores",
                List.of(65,70,74,79,84,88)
        );

        return response;
    }
    @GetMapping("/suggestion-analytics")
    public Map<String,Object> suggestionAnalytics(
            Authentication authentication
    ) {

        Map<String,Object> response =
                new HashMap<>();

        response.put("currentSpending", 5000);

        response.put("recommendedSpending", 4200);

        return response;
    }
    @GetMapping("/goal-analytics")
    public Map<String,Object> goalAnalytics(
            Authentication authentication
    ) {

        Map<String,Object> response =
                new HashMap<>();

        response.put("savings",90);
        response.put("income",80);
        response.put("expenses",70);
        response.put("investments",65);
        response.put("emergency",95);

        return response;
    }

    // ✅ GET LOGGED-IN USER GOAL
    @GetMapping("/my-goal")
    public FinancialGoal getMyGoal(
            Authentication authentication
    ) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email);

        return financialGoalRepository.findByUser(user);
    }

    // ✅ CHECK IF GOAL EXISTS
    @GetMapping("/exists")
    public boolean goalExists(
            Authentication authentication
    ) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email);

        FinancialGoal goal =
                financialGoalRepository.findByUser(user);

        return goal != null;
    }
    @GetMapping("/goal-analysis")
    public GoalAnalysisResponse getGoalAnalysis(
            Authentication authentication
    ) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email);

        FinancialGoal goal =
                financialGoalRepository.findByUser(user);

        List<Expense> expenses =
                expenseRepository.findByUser(user);

        double totalExpenses = 0;

        for (Expense expense : expenses) {

            totalExpenses += expense.getAmount();
        }

        double income =
                goal.getMonthlyIncome();

        double remainingMoney =
                income - totalExpenses;

        double monthsNeeded = 0;

        if (remainingMoney > 0) {

            monthsNeeded =
                    Math.ceil(
                            goal.getTargetAmount()
                                    / remainingMoney
                    );
        }

        GoalAnalysisResponse response =
                new GoalAnalysisResponse();

        response.setGoalName(
                goal.getGoalName()
        );

        response.setGoalAmount(
                goal.getTargetAmount()
        );

        response.setIncome(income);

        response.setExpenses(totalExpenses);

        response.setRemainingMoney(
                remainingMoney
        );

        response.setMonthsNeeded(
                monthsNeeded
        );

        return response;
    }

}
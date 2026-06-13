import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function FinancialPlanningForm() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        income: "",
        goalName: "",
        goalAmount: "",
        timeline: "",
        emergencyReserve: "",
        fixedCommitments: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleAnalyze = async () => {

        try {

            const token = localStorage.getItem("token");

            await API.post(
                "/financial-goal/save",
                {
                    monthlyIncome: Number(formData.income),
                    goalName: formData.goalName,
                    targetAmount: Number(formData.goalAmount),
                    targetMonths: Number(formData.timeline),
                    emergencyReserve: Number(formData.emergencyReserve),
                    fixedCommitments: Number(formData.fixedCommitments)
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const monthlyGoalSaving =
                formData.goalAmount / formData.timeline;

            const safeMoney =
                formData.income
                - monthlyGoalSaving
                - formData.emergencyReserve
                - formData.fixedCommitments;

            localStorage.setItem("safeMoney", safeMoney);
            localStorage.setItem("goalName", formData.goalName);
            localStorage.setItem("goalAmount", formData.goalAmount);
            localStorage.setItem("monthlyIncome", formData.income);

            navigate("/expense-tracker");
        }

        catch
            (error)
            {

                console.log("GOAL SAVE ERROR =", error);

                if (error.response) {
                    console.log("STATUS =", error.response.status);
                    console.log("DATA =", error.response.data);
                }

                alert("Goal save failed");
            }
        };

        return (

            <div
                style={{
                    minHeight: "100vh",
                    background: "#050816",
                    padding: "40px",
                    color: "white"
                }}
            >

                <h1
                    style={{
                        fontSize: "55px",
                        fontFamily: "Times New Roman",
                        marginBottom: "40px",
                        textShadow:
                            "0 0 20px rgba(255,255,255,0.25)"
                    }}
                >
                    Financial Planning
                </h1>

                <div
                    style={{
                        maxWidth: "700px",
                        background:
                            "rgba(255,255,255,0.05)",
                        padding: "40px",
                        borderRadius: "25px",
                        backdropFilter: "blur(15px)",
                        boxShadow:
                            "0 0 35px rgba(0,191,255,0.25)"
                    }}
                >

                    <input
                        type="number"
                        name="income"
                        placeholder="Monthly Income"
                        onChange={handleChange}
                        style={inputStyle}
                    />

                    <input
                        type="text"
                        name="goalName"
                        placeholder="Goal Name"
                        onChange={handleChange}
                        style={inputStyle}
                    />

                    <input
                        type="number"
                        name="goalAmount"
                        placeholder="Financial Goal Amount"
                        onChange={handleChange}
                        style={inputStyle}
                    />

                    <input
                        type="number"
                        name="timeline"
                        placeholder="Goal Timeline (Months)"
                        onChange={handleChange}
                        style={inputStyle}
                    />

                    <input
                        type="number"
                        name="emergencyReserve"
                        placeholder="Emergency Reserve"
                        onChange={handleChange}
                        style={inputStyle}
                    />

                    <input
                        type="number"
                        name="fixedCommitments"
                        placeholder="Fixed Commitments"
                        onChange={handleChange}
                        style={inputStyle}
                    />

                    <button
                        onClick={handleAnalyze}
                        style={buttonStyle}
                    >
                        Continue To Expense Tracking
                    </button>

                </div>

            </div>
        );
    }

    const inputStyle = {
        width: "100%",
        padding: "16px",
        marginBottom: "20px",
        borderRadius: "15px",
        border: "none",
        fontSize: "17px",
        outline: "none",
        background: "rgba(255,255,255,0.12)",
        color: "white"
    };

    const buttonStyle = {
        width: "100%",
        padding: "18px",
        borderRadius: "15px",
        border: "none",
        background:
            "linear-gradient(90deg,#00cfff,#7a5cff)",
        color: "white",
        fontSize: "20px",
        fontWeight: "bold",
        cursor: "pointer",
        marginTop: "10px",
        boxShadow:
            "0 0 25px rgba(0,191,255,0.45)"
    };

export default FinancialPlanningForm;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function ExpenseTracker() {

    const navigate = useNavigate();

    const [expenses, setExpenses] = useState([]);

    const [expense, setExpense] = useState({
        category: "",
        amount: "",
        description: ""
    });

    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {

        try {

            const response = await API.get(
                "/expenses/my-expenses",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setExpenses(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    const handleChange = (e) => {

        setExpense({
            ...expense,
            [e.target.name]: e.target.value
        });
    };

    const addExpense = async () => {

        if (!expense.category || !expense.amount) {

            alert("Fill all required fields");
            return;
        }

        try {

            await API.post(
                "/expenses/add",
                expense,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Expense Added Successfully");

            setExpense({
                category: "",
                amount: "",
                description: ""
            });

            fetchExpenses();

        } catch (error) {

            console.log(error);
            alert("Failed to add expense");
        }
    };

    const analyzeFinance = () => {

        navigate("/radar");
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
                    marginBottom: "40px"
                }}
            >
                Expense Tracker
            </h1>

            <div
                style={{
                    maxWidth: "700px",
                    background: "rgba(255,255,255,0.05)",
                    padding: "40px",
                    borderRadius: "25px",
                    backdropFilter: "blur(15px)"
                }}
            >

                <select
                    name="category"
                    value={expense.category}
                    onChange={handleChange}
                    style={inputStyle}
                >

                    <option value="">
                        Select Category
                    </option>

                    <option value="Food">
                        Food
                    </option>

                    <option value="Travel">
                        Travel
                    </option>

                    <option value="Shopping">
                        Shopping
                    </option>

                    <option value="Entertainment">
                        Entertainment
                    </option>

                </select>

                <input
                    type="number"
                    name="amount"
                    placeholder="Expense Amount"
                    value={expense.amount}
                    onChange={handleChange}
                    style={inputStyle}
                />

                <textarea
                    name="description"
                    placeholder="Expense Notes"
                    value={expense.description}
                    onChange={handleChange}
                    rows="4"
                    style={{
                        ...inputStyle,
                        resize: "none"
                    }}
                />

                <button
                    onClick={addExpense}
                    style={buttonStyle}
                >
                    Add Expense
                </button>

            </div>

            <h2
                style={{
                    marginTop: "40px"
                }}
            >
                Expense History
            </h2>

            {expenses.map((item) => (

                <div
                    key={item.id}
                    style={{
                        background:
                            "rgba(255,255,255,0.05)",
                        padding: "15px",
                        marginTop: "10px",
                        borderRadius: "15px"
                    }}
                >
                    {item.category} — ₹{item.amount}
                </div>
            ))}

            <button
                onClick={analyzeFinance}
                style={{
                    ...buttonStyle,
                    marginTop: "30px",
                    maxWidth: "400px"
                }}
            >
                Analyze Finances
            </button>

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
    background: "rgba(255,255,255,0.12)",
    color: "white"
};

const buttonStyle = {
    width: "100%",
    padding: "16px",
    borderRadius: "15px",
    border: "none",
    background:
        "linear-gradient(90deg,#00cfff,#7a5cff)",
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer"
};

export default ExpenseTracker;
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../services/api";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid
} from "recharts";

function DetailedAnalytics() {

    const navigate = useNavigate();
    const location = useLocation();

    const analyticsType =
        location.pathname.split("/")[2];

    const [pieData, setPieData] = useState([]);
    const [highestCategory, setHighestCategory] =
        useState("");
    const [highestAmount, setHighestAmount] =
        useState(0);

    const COLORS = [
        "#3da9fc",
        "#38f97d",
        "#a855f7",
        "#facc15",
        "#ff4d6d",
        "#00d9ff"
    ];

    useEffect(() => {

        fetchAnalytics();

    }, []);

    const fetchAnalytics = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await API.get(
                    "/financial-goal/category-analytics",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            const data = response.data;

            const chartData =
                Object.entries(
                    data.categoryTotals
                ).map(
                    ([name, value]) => ({
                        name,
                        value
                    })
                );

            setPieData(chartData);

            setHighestCategory(
                data.highestSpendingCategory
            );

            setHighestAmount(
                data.highestAmount
            );

        } catch (error) {

            console.log(error);
        }
    };

    let pageTitle = "";
    let insightText = "";
    let chartColor = "#3da9fc";

    switch (analyticsType) {

        case "score":

            pageTitle =
                "Financial Health Analytics";

            chartColor = "#3da9fc";

            insightText =
                "Your financial health score is influenced by spending behaviour, savings potential and expense distribution.";

            break;

        case "suggestion":

            pageTitle =
                "AI Savings Recommendation";

            chartColor = "#38f97d";

            insightText =
                "Reducing discretionary spending and reallocating funds toward savings can accelerate financial growth.";

            break;

        case "goal":

            pageTitle =
                "Goal Progress Analytics";

            chartColor = "#facc15";

            insightText =
                "Your financial goal progress depends on consistent savings and controlled spending.";

            break;

        default:

            pageTitle =
                "Top Spending Category Analytics";

            chartColor = "#a855f7";

            insightText =
                "Understanding your highest spending category helps optimize budgeting decisions.";

            break;
    }

    return (

        <div
            style={{
                minHeight: "100vh",
                background: "#050816",
                padding: "40px",
                color: "white"
            }}
        >

            <button
                onClick={() =>
                    navigate("/dashboard")
                }
                style={{
                    padding: "12px 22px",
                    marginBottom: "30px",
                    borderRadius: "12px",
                    border: "none",
                    background:
                        "linear-gradient(135deg,#00d9ff,#7a5cff)",
                    color: "white",
                    fontWeight: "bold",
                    cursor: "pointer"
                }}
            >
                ← Back To Dashboard
            </button>

            <h1
                style={{
                    fontSize: "55px",
                    marginBottom: "35px",
                    fontFamily: "Times New Roman"
                }}
            >
                {pageTitle}
            </h1>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit,minmax(500px,1fr))",
                    gap: "30px"
                }}
            >

                <div
                    style={{
                        background:
                            "rgba(255,255,255,0.05)",
                        borderRadius: "25px",
                        padding: "25px"
                    }}
                >

                    <h2
                        style={{
                            color: chartColor
                        }}
                    >
                        Category Distribution
                    </h2>

                    <ResponsiveContainer
                        width="100%"
                        height={350}
                    >

                        <PieChart>

                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={120}
                                label
                            >

                                {pieData.map(
                                    (entry, index) => (
                                        <Cell
                                            key={index}
                                            fill={
                                                COLORS[
                                                index %
                                                COLORS.length
                                                    ]
                                            }
                                        />
                                    )
                                )}

                            </Pie>

                            <Tooltip />

                        </PieChart>

                    </ResponsiveContainer>

                </div>

                <div
                    style={{
                        background:
                            "rgba(255,255,255,0.05)",
                        borderRadius: "25px",
                        padding: "25px"
                    }}
                >

                    <h2
                        style={{
                            color: chartColor
                        }}
                    >
                        Spending Breakdown
                    </h2>

                    <ResponsiveContainer
                        width="100%"
                        height={350}
                    >

                        <BarChart data={pieData}>

                            <CartesianGrid
                                strokeDasharray="3 3"
                            />

                            <XAxis
                                dataKey="name"
                            />

                            <YAxis />

                            <Tooltip />

                            <Bar
                                dataKey="value"
                                fill={chartColor}
                                radius={[
                                    10,
                                    10,
                                    0,
                                    0
                                ]}
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>

            </div>

            <div
                style={{
                    marginTop: "40px",
                    background:
                        "rgba(255,255,255,0.05)",
                    borderRadius: "25px",
                    padding: "30px"
                }}
            >

                <h2
                    style={{
                        color: chartColor
                    }}
                >
                    AI Financial Insight
                </h2>

                <p
                    style={{
                        fontSize: "22px",
                        lineHeight: "1.8"
                    }}
                >
                    {insightText}

                    <br /><br />

                    Highest Spending Category:
                    <strong>
                        {" "}
                        {highestCategory}
                    </strong>

                    <br /><br />

                    Amount:
                    <strong>
                        {" "}
                        ₹{Math.round(highestAmount)}
                    </strong>

                </p>

            </div>

        </div>
    );
}

export default DetailedAnalytics;
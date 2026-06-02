import { useEffect, useState } from "react";
import API from "../services/api";
import InsightCard from "../components/InsightCard";

function Dashboard() {

    const [cards, setCards] = useState([]);

    const token = localStorage.getItem("token");

    useEffect(() => {

        fetchDashboard();

    }, []);

    const fetchDashboard = async () => {

        try {

            const response = await API.get(
                "/financial-goal/ai-dashboard",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setCards(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div
            style={{
                minHeight: "100vh",
                background: "#050816",
                padding: "40px 30px"
            }}
        >

            {/* HEADER */}

            <div
                style={{
                    maxWidth: "1500px",
                    margin: "0 auto"
                }}
            >

                <h1
                    style={{
                        color: "#ffffff",
                        fontSize: "60px",
                        fontFamily: "Times New Roman",
                        marginBottom: "10px",
                        textShadow:
                            "0 0 20px rgba(255,255,255,0.15)"
                    }}
                >
                    FinPilot AI Dashboard
                </h1>

                <p
                    style={{
                        color: "#9ca3af",
                        fontSize: "18px",
                        marginBottom: "40px"
                    }}
                >
                    AI-powered financial intelligence,
                    spending analysis and goal tracking.
                </p>

            </div>

            {/* DASHBOARD GRID */}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(500px, 1fr))",
                    gap: "30px",
                    maxWidth: "1500px",
                    margin: "0 auto",
                    alignItems: "stretch"
                }}
            >

                {cards.map((card, index) => (

                    <InsightCard
                        key={index}
                        title={card.title}
                        message={card.message}
                        type={card.type}
                        route={
                            card.type === "score"
                                ? "/analytics/score"
                                : card.type === "warning"
                                    ? "/analytics/warning"
                                    : card.type === "suggestion"
                                        ? "/analytics/suggestion"
                                        : card.type === "goal"
                                            ? "/analytics/goal"
                                            : "/analytics/insight"
                        }
                    />

                ))}

            </div>

        </div>

    );
}

export default Dashboard;
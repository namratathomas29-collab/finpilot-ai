import { useEffect, useState } from "react";
import API from "../services/api";

function SuggestionAnalytics() {

    const [suggestion, setSuggestion] =
        useState("Loading AI recommendation...");

    useEffect(() => {
        fetchSuggestion();
    }, []);

    const fetchSuggestion = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response = await API.get(
                "/financial-goal/spending-suggestions",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            setSuggestion(response.data);

        } catch (error) {

            console.log(error);

            setSuggestion(
                "Unable to load AI recommendation."
            );
        }
    };

    return (

        <div
            style={{
                minHeight: "100vh",
                background: "#050816",
                color: "white",
                padding: "40px"
            }}
        >

            <h1>
                AI Spending Suggestions
            </h1>

            <div
                style={{
                    background: "#0b1025",
                    padding: "40px",
                    borderRadius: "20px",
                    marginTop: "30px"
                }}
            >

                <h2
                    style={{
                        color: "#38f97d",
                        marginBottom: "25px"
                    }}
                >
                    Personalized Recommendation
                </h2>

                <p
                    style={{
                        fontSize: "22px",
                        lineHeight: "1.8"
                    }}
                >
                    {suggestion}
                </p>

            </div>

        </div>
    );
}

export default SuggestionAnalytics;
import { useEffect, useState } from "react";
import API from "../services/api";

function ScoreAnalytics() {

    const [scoreText, setScoreText] = useState("Loading...");
    const [scoreValue, setScoreValue] = useState(0);

    useEffect(() => {
        fetchScore();
    }, []);

    const fetchScore = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await API.get(
                "/financial-goal/budget-score",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const text = response.data;

            setScoreText(text);

            const match = text.match(/(\d+)\/100/);

            if (match) {
                setScoreValue(Number(match[1]));
            }

        } catch (error) {

            console.log(error);

            setScoreText("Unable to load score");
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
                Financial Health Score
            </h1>

            <div
                style={{
                    background: "#0b1025",
                    padding: "40px",
                    borderRadius: "20px",
                    marginTop: "30px",
                    textAlign: "center"
                }}
            >

                <h2
                    style={{
                        fontSize: "90px",
                        color: "#3da9fc"
                    }}
                >
                    {scoreValue}
                </h2>

                <h3>
                    /100
                </h3>

            </div>

            <div
                style={{
                    marginTop: "30px",
                    background: "#0b1025",
                    padding: "25px",
                    borderRadius: "20px"
                }}
            >

                <h2>
                    AI Assessment
                </h2>

                <p>
                    {scoreText}
                </p>

            </div>

        </div>
    );
}

export default ScoreAnalytics;
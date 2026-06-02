import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";

function ScoreAnalytics() {

    const data = [
        { month: "Jan", score: 65 },
        { month: "Feb", score: 70 },
        { month: "Mar", score: 74 },
        { month: "Apr", score: 79 },
        { month: "May", score: 84 },
        { month: "Jun", score: 88 }
    ];

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#050816",
                color: "white",
                padding: "40px"
            }}
        >
            <h1>Financial Health Score Analytics</h1>

            <div
                style={{
                    background: "#0b1025",
                    padding: "30px",
                    borderRadius: "20px",
                    marginTop: "30px"
                }}
            >
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="score"
                            stroke="#3da9fc"
                            strokeWidth={4}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div
                style={{
                    marginTop: "30px",
                    background: "#0b1025",
                    padding: "25px",
                    borderRadius: "20px"
                }}
            >
                <h2>AI Insight</h2>

                <p>
                    Your financial health score has improved
                    steadily over the last six months,
                    indicating stronger spending discipline
                    and better savings habits.
                </p>
            </div>
        </div>
    );
}

export default ScoreAnalytics;
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer
} from "recharts";

function GoalAnalytics() {

    const data = [
        { subject: "Savings", value: 90 },
        { subject: "Income", value: 80 },
        { subject: "Expenses", value: 70 },
        { subject: "Investments", value: 65 },
        { subject: "Emergency", value: 95 }
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
            <h1>Goal Progress Analytics</h1>

            <div
                style={{
                    background: "#0b1025",
                    padding: "30px",
                    borderRadius: "20px"
                }}
            >
                <ResponsiveContainer width="100%" height={500}>
                    <RadarChart data={data}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis />

                        <Radar
                            dataKey="value"
                            stroke="#facc15"
                            fill="#facc15"
                            fillOpacity={0.6}
                        />
                    </RadarChart>
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
                <h2>Goal Insight</h2>

                <p>
                    Emergency preparedness is strong,
                    while investment allocation can
                    be improved to accelerate goal
                    completion.
                </p>
            </div>
        </div>
    );
}

export default GoalAnalytics;
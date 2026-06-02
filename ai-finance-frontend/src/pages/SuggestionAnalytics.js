import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";

function SuggestionAnalytics() {

    const data = [
        { month: "Jan", current: 3000, suggested: 4500 },
        { month: "Feb", current: 3500, suggested: 5000 },
        { month: "Mar", current: 4200, suggested: 6000 },
        { month: "Apr", current: 5000, suggested: 7000 }
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
            <h1>AI Savings Suggestions</h1>

            <div
                style={{
                    background: "#0b1025",
                    padding: "30px",
                    borderRadius: "20px"
                }}
            >
                <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />

                        <Area
                            type="monotone"
                            dataKey="current"
                            stroke="#ff4d6d"
                            fill="#ff4d6d"
                        />

                        <Area
                            type="monotone"
                            dataKey="suggested"
                            stroke="#38f97d"
                            fill="#38f97d"
                        />
                    </AreaChart>
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
                <h2>AI Recommendation</h2>

                <p>
                    Following AI recommendations could
                    increase annual savings by approximately
                    ₹24,000.
                </p>
            </div>
        </div>
    );
}

export default SuggestionAnalytics;
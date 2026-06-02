import { useNavigate } from "react-router-dom";

function InsightCard(props) {

    const navigate = useNavigate();

    let borderColor = "#ffffff";
    let glowColor = "rgba(255,255,255,0.35)";
    let icon = "💡";

    switch (props.type) {

        case "warning":
            borderColor = "#ff4d6d";
            glowColor = "rgba(255,77,109,0.5)";
            icon = "⚠️";
            break;

        case "score":
            borderColor = "#3da9fc";
            glowColor = "rgba(61,169,252,0.5)";
            icon = "📊";
            break;

        case "suggestion":
            borderColor = "#38f97d";
            glowColor = "rgba(56,249,125,0.5)";
            icon = "🎯";
            break;

        case "insight":
            borderColor = "#a855f7";
            glowColor = "rgba(168,85,247,0.5)";
            icon = "💡";
            break;

        case "goal":
            borderColor = "#facc15";
            glowColor = "rgba(250,204,21,0.5)";
            icon = "🚀";
            break;

        default:
            break;
    }

    return (

        <div
            onClick={() => props.route && navigate(props.route)}
            style={{
                position: "relative",
                cursor: props.route ? "pointer" : "default",
                background:
                    "linear-gradient(145deg,#081020,#050816)",
                border: `1px solid ${borderColor}`,
                borderRadius: "28px",
                padding: "28px",
                height: "280px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                boxShadow: `0 0 25px ${glowColor}`,
                transition: "all 0.3s ease",
                overflow: "hidden"
            }}
        >

            <div
                style={{
                    position: "absolute",
                    top: "22px",
                    right: "22px",
                    fontSize: "52px",
                    filter: `drop-shadow(0 0 12px ${glowColor})`
                }}
            >
                {icon}
            </div>

            <div>

                <h2
                    style={{
                        color: borderColor,
                        fontSize: "32px",
                        fontWeight: "700",
                        lineHeight: "1.2",
                        marginBottom: "18px",
                        maxWidth: "75%"
                    }}
                >
                    {props.title}
                </h2>

                <p
                    style={{
                        color: "#ffffff",
                        fontSize: "20px",
                        lineHeight: "1.6",
                        opacity: "0.92",
                        maxWidth: "85%"
                    }}
                >
                    {props.message}
                </p>

            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >

                <span
                    style={{
                        background: borderColor,
                        color: "#ffffff",
                        padding: "10px 18px",
                        borderRadius: "50px",
                        fontSize: "12px",
                        fontWeight: "700",
                        letterSpacing: "1px",
                        textTransform: "uppercase"
                    }}
                >
                    {props.type}
                </span>

                {props.route && (
                    <span
                        style={{
                            color: borderColor,
                            fontSize: "14px",
                            fontWeight: "600"
                        }}
                    >
                        View Details →
                    </span>
                )}

            </div>

        </div>
    );
}

export default InsightCard;
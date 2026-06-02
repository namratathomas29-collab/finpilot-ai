import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

function RadarLoader() {

    const navigate = useNavigate();

    useEffect(() => {

        const timer = setTimeout(() => {

            navigate("/dashboard");

        }, 3000);

        return () => clearTimeout(timer);

    }, [navigate]);

    return (

        <div
            style={{

                height: "100vh",

                width: "100%",

                background: "#050816",

                display: "flex",

                flexDirection: "column",

                justifyContent: "center",

                alignItems: "center"
            }}
        >

            <div
                style={{

                    width: "320px",

                    height: "320px",

                    borderRadius: "50%",

                    border: "2px solid rgba(0,255,255,0.2)",

                    display: "flex",

                    justifyContent: "center",

                    alignItems: "center",

                    position: "relative"
                }}
            >

                <div
                    style={{

                        width: "220px",

                        height: "220px",

                        borderRadius: "50%",

                        border: "2px solid #00d9ff",

                        position: "relative",

                        overflow: "hidden"
                    }}
                >

                    <div
                        style={{

                            width: "12px",

                            height: "12px",

                            borderRadius: "50%",

                            background: "#00d9ff",

                            position: "absolute",

                            top: "50%",

                            left: "50%",

                            transform:
                                "translate(-50%, -50%)"
                        }}
                    />

                    <div
                        style={{

                            width: "110px",

                            height: "3px",

                            background: "#00d9ff",

                            position: "absolute",

                            top: "50%",

                            left: "50%",

                            transformOrigin:
                                "left center",

                            animation:
                                "rotateRadar 2s linear infinite"
                        }}
                    />

                </div>

            </div>

            <h1
                style={{

                    color: "#ffffff",

                    marginTop: "50px",

                    fontSize: "34px"
                }}
            >
                AI ANALYZING YOUR FINANCES...
            </h1>

            <style>
                {`

                @keyframes rotateRadar {

                    from {
                        transform: rotate(0deg);
                    }

                    to {
                        transform: rotate(360deg);
                    }
                }

                `}
            </style>

        </div>
    );
}

export default RadarLoader;
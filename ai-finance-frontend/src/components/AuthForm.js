import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

function AuthForm(props) {

    const navigate = useNavigate();

    // STATES
    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    // LOGIN FUNCTION
    function handleSubmit() {

        // LOGIN API
        if (props.type === "login") {

            API.post("/api/login", {

                email: email,

                password: password

            })

                .then((response) => {

                    console.log("TOKEN =", response.data);

                    // SAVE JWT TOKEN
                    localStorage.setItem(
                        "token",
                        response.data
                    );

                    // OPEN DASHBOARD
                    navigate("/financial-planning")
                })

                .catch((error) => {

                    console.log(error);

                    alert("Invalid Credentials");
                });
        }
    }

    return (

        <div
            style={{

                minHeight: "100vh",

                background: "#050816",

                display: "flex",

                justifyContent: "center",

                alignItems: "center"
            }}
        >

            <div
                style={{

                    width: "400px",

                    padding: "40px",

                    borderRadius: "25px",

                    background:
                        "rgba(255,255,255,0.05)",

                    backdropFilter:
                        "blur(15px)",

                    boxShadow:
                        "0 0 30px rgba(0,191,255,0.2)"
                }}
            >

                {/* TITLE */}
                <h1
                    style={{

                        color: "white",

                        textAlign: "center",

                        marginBottom: "35px",

                        fontFamily:
                            "Times New Roman"
                    }}
                >
                    {props.title}
                </h1>

                {/* EMAIL */}
                <input
                    type="email"

                    placeholder="Enter Email"

                    value={email}

                    onChange={(e) =>
                        setEmail(e.target.value)
                    }

                    style={{

                        width: "100%",

                        padding: "15px",

                        marginBottom: "20px",

                        borderRadius: "12px",

                        border: "none",

                        outline: "none",

                        fontSize: "16px"
                    }}
                />

                {/* PASSWORD */}
                <input
                    type="password"

                    placeholder="Enter Password"

                    value={password}

                    onChange={(e) =>
                        setPassword(e.target.value)
                    }

                    style={{

                        width: "100%",

                        padding: "15px",

                        marginBottom: "30px",

                        borderRadius: "12px",

                        border: "none",

                        outline: "none",

                        fontSize: "16px"
                    }}
                />

                {/* BUTTON */}
                <button

                    onClick={handleSubmit}

                    style={{

                        width: "100%",

                        padding: "15px",

                        borderRadius: "12px",

                        border: "none",

                        background:
                            "linear-gradient(135deg, #00d9ff, #7a5cff)",

                        color: "white",

                        fontSize: "18px",

                        fontWeight: "bold",

                        cursor: "pointer",

                        boxShadow:
                            "0 0 20px rgba(0,217,255,0.4)"
                    }}
                >
                    {props.buttonText}
                </button>

            </div>

        </div>
    );
}

export default AuthForm;
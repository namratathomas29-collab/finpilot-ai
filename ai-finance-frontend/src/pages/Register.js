import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import API from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [userData, setUserData] = useState({

        username: "",

        email: "",

        password: ""
    });

    const handleChange = (e) => {

        setUserData({

            ...userData,

            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async () => {

        try {

            const response = await API.post(

                "/api/register",

                userData
            );

            alert(response.data);

            navigate("/");

        } catch (error) {

            console.log(error);

            alert("Registration Failed");
        }
    };

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

                    width: "420px",

                    padding: "40px",

                    borderRadius: "30px",

                    background:
                        "rgba(255,255,255,0.05)",

                    backdropFilter: "blur(15px)",

                    boxShadow:
                        "0 0 35px rgba(0,191,255,0.35)"
                }}
            >

                <h1
                    style={{

                        color: "white",

                        textAlign: "center",

                        marginBottom: "30px",

                        fontFamily: "Times New Roman",

                        fontSize: "50px"
                    }}
                >
                    Register
                </h1>

                <input
                    type="text"

                    name="username"

                    placeholder="Username"

                    value={userData.username}

                    onChange={handleChange}

                    style={inputStyle}
                />

                <input
                    type="email"

                    name="email"

                    placeholder="Email"

                    value={userData.email}

                    onChange={handleChange}

                    style={inputStyle}
                />

                <input
                    type="password"

                    name="password"

                    placeholder="Password"

                    value={userData.password}

                    onChange={handleChange}

                    style={inputStyle}
                />

                <button
                    onClick={handleRegister}

                    style={buttonStyle}
                >
                    Create Account
                </button>

                <p
                    style={{

                        color: "white",

                        marginTop: "25px",

                        textAlign: "center"
                    }}
                >
                    Already have account?{" "}

                    <Link
                        to="/"

                        style={{
                            color: "#00cfff",
                            textDecoration: "none",
                            fontWeight: "bold"
                        }}
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>
    );
}

const inputStyle = {

    width: "100%",

    padding: "16px",

    marginBottom: "20px",

    borderRadius: "15px",

    border: "none",

    fontSize: "17px",

    outline: "none"
};

const buttonStyle = {

    width: "100%",

    padding: "16px",

    borderRadius: "15px",

    border: "none",

    background:
        "linear-gradient(90deg,#00cfff,#7a5cff)",

    color: "white",

    fontSize: "20px",

    fontWeight: "bold",

    cursor: "pointer",

    boxShadow:
        "0 0 25px rgba(0,191,255,0.5)"
};

export default Register;
import AuthForm from "../components/AuthForm";

import { Link } from "react-router-dom";

function Login() {

    return (

        <div>

            <AuthForm
                title="Login"
                buttonText="Login"
                type="login"
            />

            <div
                style={{

                    marginTop: "-120px",

                    textAlign: "center"
                }}
            >

                <p style={{ color: "white" }}>

                    New User?

                    {" "}

                    <Link
                        to="/register"

                        style={{

                            color: "#00d9ff",

                            textDecoration: "none",

                            fontWeight: "bold"
                        }}
                    >
                        Create Account
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Login;
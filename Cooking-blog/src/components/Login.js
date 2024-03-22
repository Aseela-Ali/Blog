import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from './Header';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            history.push('/');
        }
    }, [history]);

    const handleLogin = async () => {
        const user = { email, password };
        try {
            const response = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            localStorage.setItem("user-info", JSON.stringify(data));
            history.push('/');
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    };

    return (
        <div>
            <Header />
            <h1>Login Page</h1>
            <div className="col-sm-6 offset-sm-3">
                <input
                    type="text"
                    placeholder="Email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button className="btn btn-primary" onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
};

export default Login;

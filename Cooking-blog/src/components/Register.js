import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Header from './Header';

const Register = () => {
    useEffect(()=>{
        if (localStorage.getItem('user-info'))
        {
            history.push('/');


        }

    },[]);
            const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    async function signUp() {
        const item = { name, email, password };
        console.warn(item);
        try {
            const response = await fetch('http://localhost:8000/api/register', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(item)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            localStorage.setItem("user-info", JSON.stringify(result));
            history.push('/');
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    }

    return (
        <>
                            <Header />

        <div className="col-sm-6 offset-sm-3">
            <h1>Register Page</h1>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="name" />
            <br />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="email" />
            <br />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="password" />
            <br />
            <button className="btn btn-primary" onClick={signUp}>Sign Up</button>
        </div></>
    );
}

export default Register;

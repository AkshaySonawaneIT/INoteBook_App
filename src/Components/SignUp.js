import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp(props) {

    const [user, setUser] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/createUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: user.name, email: user.email, password: user.password }),
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem("auth-token", json.authToken);
            navigate(`/`);
            props.showAlert("Account created successfully...", "success");
        }
        else {
            props.showAlert("Invalid credentials..", "danger");
        }
    }

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className='mt-3'>
                <h2><center>Signup to use INoteBook</center></h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name="name" value={user.name} aria-describedby="emailHelp" onChange={onChange} required minLength={5} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" value={user.email} aria-describedby="emailHelp" onChange={onChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" value={user.password} onChange={onChange} required minLength={5} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={user.confirmPassword} onChange={onChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default SignUp

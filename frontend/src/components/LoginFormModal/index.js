import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { Link } from "react-router-dom";
import "./LoginForm.css";

function LoginFormModal() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [buttonState, setButtonState] = useState(true)
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .then(closeModal)
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
    };

    return (
        <div>
            <h1 className='login-header'>Log In</h1>
            <form onSubmit={handleSubmit} className='login-container'>
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <label className='login-username'>
                    <input
                        placeholder="Username or Email"
                        className="input-field"
                        type="text"
                        value={credential}
                        onChange={(e) => {
                            setCredential(e.target.value);
                            setButtonState(false);
                        }}
                        required
                    />
                </label>
                <label className="login-password">
                    <input
                        placeholder="Password"
                        className="input-field"
                        type="password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); setButtonState(false) }}
                        required
                    />
                </label>
                <button disabled={!credential || !password} className={!credential || !password ? "disabled-btn" : "login-button"} type="submit">Log In</button>
                <button onClick={() => { setCredential('demo@user.io'); setPassword('password'); }} type="submit">Log In Demo User</button>
            </form>
        </div>
    );
}

export default LoginFormModal;

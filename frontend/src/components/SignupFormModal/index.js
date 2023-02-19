import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
                .then(closeModal)
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };


    return (
        <>
            <h1 className="signup-header">Sign Up</h1>
            <form className="signup-container" onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label>
                    <input
                        placeholder="Email"
                        className="input-field"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    <input
                        placeholder="Username"
                        className="input-field"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        minLength='4'
                        required
                    />
                </label>
                <label>
                    <input
                        placeholder="First Name"
                        className="input-field"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    <input
                        placeholder="Last Name"
                        className="input-field"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    <input
                        placeholder="Password"
                        className="input-field"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <label className="signup-password">
                    <input
                        placeholder="Confirm Password"
                        className="input-field"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </label>
                <button
                    disabled={!email || !username || (username.length < 4) || !firstName || !lastName || !password || (password.length < 6) || !confirmPassword || (confirmPassword !== password)}
                    className={!email || !username || (username.length < 4) || !firstName || !lastName || !password || (password.length < 6) || !confirmPassword || (confirmPassword !== password) ? 'disabled' : "signup-button"}
                    type="submit">
                    Sign Up
                </button>
            </form>
        </>
    );
}

export default SignupFormModal;

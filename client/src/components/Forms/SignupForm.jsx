import React, { useState } from 'react';
import "./FormCss/Form.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import signup from '../../apis/signup';

const SignupForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordEyeVisibility, setPasswordEyeVisibility] = useState(false);
    const [confirmPasswordEyeVisibility, setConfirmPasswordEyeVisibility] = useState(false);

    // _____________________ Password Validation
    let hasSixChar = password.length > 6;
    let hasUpperChar = /(.*[A-Z].*)/.test(password);
    let hasLowerChar = /(.*[a-z].*)/.test(password);
    let hasNumber = /(.*[0-9].*)/.test(password);
    let hasSpecialChar = /(.*[^a-zA-Z0-9].*)/.test(password);

    const handleSubmission = async (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        try {
            const res = await signup({ username, email, password });
            if (res.error) {
                toast.error(res.error, {
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeButton: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            else {
                toast.success(res.message, {
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeButton: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                navigate("/login");
            }
        } catch (err) {
            toast.error("Server error, please try later!", {
                autoClose: 2000,
                hideProgressBar: true,
                closeButton: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    return (
        <>
            <div className='form-container'>
                <div className='form-content'>
                    <div className='form-header signup-theme'>
                        <h3> Signup </h3>
                    </div>
                    <div className='form-fields-container'>
                        <div className='form-fields'>
                            <input
                                type="text"
                                placeholder='username'
                                className='form-input'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <input
                                type="email"
                                placeholder='email'
                                className='form-input'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <div className='form-password-container'>
                                <input
                                    type={passwordEyeVisibility ? "text" : "password"}
                                    placeholder='password'
                                    className='form-input'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <span className='eye-btn' onClick={() => setPasswordEyeVisibility(!passwordEyeVisibility)}>
                                    {
                                        passwordEyeVisibility
                                            ?
                                            <>
                                                <i className="fa-solid fa-eye-slash"></i>
                                            </>
                                            :
                                            <>
                                                <i className="fa-solid fa-eye"></i>
                                            </>
                                    }
                                </span>
                            </div>
                            <div className='form-field-info-container'>
                                <div className='form-field-info'>
                                    {
                                        hasSixChar
                                            ?
                                            <>
                                                <i className="fa-solid fa-circle-check"></i>
                                            </>
                                            :
                                            ''
                                    }

                                    <p>Length should be greater than 6</p>
                                </div>
                                <div className='form-field-info'>
                                    {
                                        hasUpperChar
                                            ?
                                            <>
                                                <i className="fa-solid fa-circle-check"></i>
                                            </>
                                            :
                                            ''
                                    }
                                    <p>at least one uppercase</p>
                                </div>
                                <div className='form-field-info'>
                                    {
                                        hasLowerChar
                                            ?
                                            <>
                                                <i className="fa-solid fa-circle-check"></i>
                                            </>
                                            :
                                            ''
                                    }
                                    <p>at least one lowercase</p>
                                </div>
                                <div className='form-field-info'>
                                    {
                                        hasNumber
                                            ?
                                            <>
                                                <i className="fa-solid fa-circle-check"></i>
                                            </>
                                            :
                                            ''
                                    }
                                    <p>at least one number</p>
                                </div>
                                <div className='form-field-info'>
                                    {
                                        hasSpecialChar
                                            ?
                                            <>
                                                <i className="fa-solid fa-circle-check"></i>
                                            </>
                                            :
                                            ''
                                    }
                                    <p>at least one special character</p>
                                </div>
                            </div>
                            <div className='form-password-container'>
                                <input
                                    type={confirmPasswordEyeVisibility ? "text" : "password"}
                                    placeholder='confirm password'
                                    className='form-input'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <span className='eye-btn' onClick={() => setConfirmPasswordEyeVisibility(!confirmPasswordEyeVisibility)}>
                                    {
                                        confirmPasswordEyeVisibility
                                            ?
                                            <>
                                                <i className="fa-solid fa-eye-slash"></i>
                                            </>
                                            :
                                            <>
                                                <i className="fa-solid fa-eye"></i>
                                            </>
                                    }
                                </span>
                            </div>

                            <div className='form-field-info-container'>
                                <div className='form-field-info'>
                                    {
                                        password === confirmPassword && password.length > 0
                                            ?
                                            <>
                                                <i className="fa-solid fa-circle-check"></i>
                                            </>
                                            :
                                            ''
                                    }
                                    <p>Password matched</p>
                                </div>
                            </div>

                            {
                                !username ||
                                    !email ||
                                    !password ||
                                    !confirmPassword ||
                                    password !== confirmPassword ||
                                    !hasSixChar ||
                                    !hasUpperChar ||
                                    !hasLowerChar ||
                                    !hasNumber ||
                                    !hasSpecialChar
                                    ?
                                    ''
                                    :
                                    <>
                                        <button
                                            className='btn signup-theme'
                                            id="signup-btn"
                                            onClick={handleSubmission}
                                        >
                                            Signup
                                        </button>
                                    </>
                            }

                            <br />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignupForm;
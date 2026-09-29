import axios from "axios";
import React, { useState } from "react";
import "./CSS/ForgotPassword.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [step, setStep] = useState(1);

    const api_url = import.meta.env.VITE_API_URL;

    const sendOtp = async (e) => {
        e.preventDefault();
        await axios.post(`${api_url}/api/users/forgot-password`, { email });
        setStep(2);
    };

    const resetPassword = async (e) => {
        e.preventDefault();
        await axios.post(`${api_url}/api/users/reset-password`, {
            email,
            otp,
            password,
        });
        alert("Password changed successfully");
    };

    return (
        <div className="main-wrapper">

            {/* 🌟 GLOW EFFECT */}
            <div className="glow-circle"></div>

            {/* 🏷️ BRAND TEXT */}
            <div className="ui-brand">
                <h1>Secure Access</h1>
                <p>Reset your password safely & quickly</p>
            </div>

            {/* 🎥 VIDEO SECTION */}
            <div className="video-section">
                <video autoPlay loop muted playsInline>
                    <source
                        src="https://media.istockphoto.com/id/1768101424/video/a-woman-shopping-online-on-phone.mp4?s=mp4-640x640-is&k=20&c=HgpQU6XgofCsrFrRfbzZZMCT3_ICCJA6MmsF-nXpKRU="
                        type="video/mp4"
                    />
                </video>
            </div>

            {/* 🧾 FORM SECTION */}
            <div className="form-section">

                <div className="glass-box">

                    <h2>{step === 1 ? "Forgot Password" : "Reset Password"}</h2>
                    <p>Secure your account in seconds</p>

                    {step === 1 ? (
                        <form onSubmit={sendOtp}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button type="submit">Send OTP</button>
                        </form>
                    ) : (
                        <form onSubmit={resetPassword}>
                            <input type="email" value={email} disabled />

                            <input
                                type="text"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />

                            <input
                                type="password"
                                placeholder="New Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <button type="submit">Reset Password</button>
                        </form>
                    )}

                </div>

            </div>

        </div>
    );
};

export default ForgotPassword;
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

const Login = () => {
    const api_url = import.meta.env.VITE_API_URL

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    const loginUser = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${api_url}/api/user/login`, formData)
            if (res.status === 200) {
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("user", JSON.stringify(res.data.userData))
                alert("Login Successfully")
                setFormData({ email: "", password: "" })
                navigate("/")
            }
        } catch (error) {
            console.log(error)
            alert("Invalid Email or Password")
        }
    }

    return (
        <div className="login-page">

            <div className="login-left">
                <div className="brand-box">
                    <div className="brand-logo">🛍️</div>
                    <h1>MERN Store</h1>
                    <p>Your one-stop shop for everything you love</p>
                    <div className="brand-features">
                        <div className="feature-item">✅ Fast Delivery</div>
                        <div className="feature-item">✅ Secure Payments</div>
                        <div className="feature-item">✅ 24/7 Support</div>
                    </div>
                </div>
            </div>

            <div className="login-right">
                <div className="login-box">
                    <h2>Welcome Back 👋</h2>
                    <p className="sub-title">Please login to your account</p>

                    <form onSubmit={loginUser}>
                        <div className="field">
                            <label>Email Address</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>

                        <div className="field">
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </div>

                        <div className="forgot-row">
                            <button type="button" className="forgot-btn" onClick={() => navigate("/forgot-password")}>
                                Forgot Password?
                            </button>
                        </div>

                        <button type="submit" className="submit-btn">
                            Login
                        </button>

                        <p className="register-text">
                            Don't have an account?{' '}
                            <span onClick={() => navigate('/register')}>Sign Up</span>
                        </p>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Login

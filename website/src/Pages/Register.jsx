import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Register.css'

const Register = () => {
    const api_url = import.meta.env.VITE_API_URL
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const registerUser = async (e) => {
        e.preventDefault()
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!")
            return
        }
        try {
            const res = await axios.post(`${api_url}/api/user/register`, {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: "customer"
            })
            if (res.status === 201) {
                alert("Account created! Please login.")
                navigate('/login')
            }
        } catch (error) {
            console.log(error)
            alert(error.response?.data?.message || "Registration failed!")
        }
    }

    return (
        <div className="reg-page">

            {/* LEFT - VIDEO */}
            <div className="reg-left">
                <video autoPlay muted loop playsInline className="reg-video">
                    <source
                        src="https://media.istockphoto.com/id/1475146936/video/online-shopping-with-big-telephone-screen-icon-woman-doing-online-shopping-with-fancy-clothes.mp4?s=mp4-640x640-is&k=20&c=BbpP5qbJiKFuUPrY8i52dXYjm5WALFooX3CE-BHqPKc="
                        type="video/mp4"
                    />
                </video>
                <div className="reg-overlay">
                    <div className="reg-overlay-content">
                        <div className="reg-brand-icon">🛍️</div>
                        <h1>ShopNest</h1>
                        <p>Your ultimate shopping destination</p>
                        <div className="reg-features">
                            <div className="reg-feature-item">🚀 Fast Delivery</div>
                            <div className="reg-feature-item">💎 Exclusive Deals</div>
                            <div className="reg-feature-item">🔒 Secure Payments</div>
                            <div className="reg-feature-item">💬 24/7 Support</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT - FORM */}
            <div className="reg-right">
                <div className="reg-card">
                    <div className="reg-header">
                        <h2>Create Account</h2>
                        <p>Fill in the details below to get started 🎉</p>
                    </div>

                    <form onSubmit={registerUser}>

                        <div className="reg-field">
                            <label>Full Name</label>
                            <div className="reg-input-box">
                                <span className="reg-icon">👤</span>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your full name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="reg-field">
                            <label>Email Address</label>
                            <div className="reg-input-box">
                                <span className="reg-icon">📧</span>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="reg-field">
                            <label>Password</label>
                            <div className="reg-input-box">
                                <span className="reg-icon">🔒</span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Create a password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? "🙈" : "👁️"}
                                </span>
                            </div>
                        </div>

                        <div className="reg-field">
                            <label>Confirm Password</label>
                            <div className="reg-input-box">
                                <span className="reg-icon">🔒</span>
                                <input
                                    type={showConfirm ? "text" : "password"}
                                    name="confirmPassword"
                                    placeholder="Confirm your password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                                <span className="eye-icon" onClick={() => setShowConfirm(!showConfirm)}>
                                    {showConfirm ? "🙈" : "👁️"}
                                </span>
                            </div>
                        </div>

                        <button type="submit" className="reg-btn">
                            Create Account →
                        </button>

                        <p className="reg-bottom">
                            Already have an account?{' '}
                            <span onClick={() => navigate('/login')}>Login here</span>
                        </p>

                    </form>
                </div>
            </div>

        </div>
    )
}

export default Register

import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './CSS/Login.css'

const Register = () => {
    const api_url = import.meta.env.VITE_API_URL
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

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
                role: "admin"
            })
            if (res.status === 201) {
                alert("Admin account created! Please login.")
                navigate('/')
            }
        } catch (error) {
            console.log(error)
            alert(error.response?.data?.message || "Registration failed!")
        }
    }

    return (
        <div className="login-page">

            {/* LEFT */}
            <div className="login-left">
                <div className="login-card">
                    <div className="logo"><span>🛒</span></div>
                    <h1 className="title">Create Admin 👑</h1>
                    <p className="subtitle">Register a new admin account</p>

                    <form onSubmit={registerUser}>
                        <div className="input-group">
                            <label>Full Name</label>
                            <div className="input-box">
                                <span className="icon">👤</span>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter full name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label>Email Address</label>
                            <div className="input-box">
                                <span className="icon">📧</span>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label>Password</label>
                            <div className="input-box">
                                <span className="icon">🔒</span>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Create password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label>Confirm Password</label>
                            <div className="input-box">
                                <span className="icon">🔒</span>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="login-btn">Register →</button>
                    </form>

                    <p className="bottom-text">
                        Already have an account?{" "}
                        <span onClick={() => navigate("/")}>Login</span>
                    </p>
                </div>
            </div>

            {/* RIGHT - VIDEO */}
            <div className="login-right">
                <video autoPlay muted loop playsInline className="bg-video">
                    <source
                        src="https://media.istockphoto.com/id/1475146936/video/online-shopping-with-big-telephone-screen-icon-woman-doing-online-shopping-with-fancy-clothes.mp4?s=mp4-640x640-is&k=20&c=BbpP5qbJiKFuUPrY8i52dXYjm5WALFooX3CE-BHqPKc="
                        type="video/mp4"
                    />
                </video>
                <div className="overlay">
                    <div className="overlay-content">
                        <h1>E-Commerce Admin</h1>
                        <p>Manage Products, Orders, Customers & Analytics.</p>
                        <div className="feature-list">
                            <div>✔ Smart Inventory</div>
                            <div>✔ Fast Order Management</div>
                            <div>✔ Customer Analytics</div>
                            <div>✔ Secure Admin Panel</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Register

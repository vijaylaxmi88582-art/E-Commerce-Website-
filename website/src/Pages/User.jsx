import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './User.css'

const User = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('user')
        return stored ? JSON.parse(stored) : null
    })

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (!storedUser) {
            navigate('/login')
        }
    }, [navigate])

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/login')
    }

    if (!user) return null

    return (
        <div className="user-container">
            <div className="user-card">
                <div className="user-avatar">
                    {user.name?.charAt(0).toUpperCase()}
                </div>
                <h2>{user.name}</h2>
                <p className="user-email">{user.email}</p>

                <div className="user-info">
                    <div className="info-row">
                        <span className="info-label">Name</span>
                        <span className="info-value">{user.name}</span>
                    </div>
                    <div className="info-row">
                        <span className="info-label">Email</span>
                        <span className="info-value">{user.email}</span>
                    </div>
                    {user.phone && (
                        <div className="info-row">
                            <span className="info-label">Phone</span>
                            <span className="info-value">{user.phone}</span>
                        </div>
                    )}
                </div>

                <div className="user-actions">
                    <button className="cart-btn" onClick={() => navigate('/cart')}>
                        Go to Cart
                    </button>
                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default User

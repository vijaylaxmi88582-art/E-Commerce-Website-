import React, { useEffect, useState } from 'react'
import DashboardLayout from '../Components/DashboardLayout'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './CSS/Dashboard.css'
import { IndianRupee, Package, ShoppingBag, Users, ArrowRight, Activity, TrendingUp, BarChart3 } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const Dashboard = () => {
    const navigate = useNavigate()
    const api_url = import.meta.env.VITE_API_URL
    const token = localStorage.getItem('token')

    const [stats, setStats] = useState({
        totalOrders: 0,
        totalProducts: 0,
        totalUsers: 0,
        totalRevenue: 0
    })
    const [recentOrders, setRecentOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const oauthToken = params.get('token')
        const oauthUser = params.get('user')
        if (oauthToken && oauthUser) {
            localStorage.setItem('token', oauthToken)
            localStorage.setItem('user', decodeURIComponent(oauthUser))
            window.history.replaceState({}, '', '/dashboard')
        }

        if (!token) {
            navigate('/')
            return
        }
        verifyToken()
        fetchStats()
    }, [navigate, token])

    const verifyToken = async () => {
        try {
            await axios.get(`${api_url}/api/user/check-token`, {
                headers: { Authorization: token }
            })
        } catch (error) {
            localStorage.removeItem('token')
            navigate('/')
        }
    }

    const fetchStats = async () => {
        try {
            const [ordersRes, productsRes, usersRes] = await Promise.all([
                axios.get(`${api_url}/api/order/all-orders`, { headers: { Authorization: token } }),
                axios.get(`${api_url}/api/product/get-all`),
                axios.get(`${api_url}/api/user/all-users`, { headers: { Authorization: token } })
            ])

            const orders = ordersRes.data.orders || []
            const products = productsRes.data.product || []
            const users = usersRes.data.users || []
            const revenue = orders.reduce((acc, o) => acc + (o.totalAmount || 0), 0)

            setStats({
                totalOrders: orders.length,
                totalProducts: products.length,
                totalUsers: users.length,
                totalRevenue: revenue
            })
            setRecentOrders(orders.slice(0, 5))
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const statCards = [
        { label: 'Total Revenue', value: `₹${stats.totalRevenue.toLocaleString()}`, icon: <IndianRupee size={28} />, gradient: 'linear-gradient(135deg, #6366f1, #a855f7)' },
        { label: 'Total Orders', value: stats.totalOrders, icon: <Package size={28} />, gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)' },
        { label: 'Total Products', value: stats.totalProducts, icon: <ShoppingBag size={28} />, gradient: 'linear-gradient(135deg, #10b981, #06b6d4)' },
        { label: 'Total Users', value: stats.totalUsers, icon: <Users size={28} />, gradient: 'linear-gradient(135deg, #3b82f6, #2dd4bf)' },
    ]

    const mockChartData = [
        { name: 'Mon', revenue: 4000 },
        { name: 'Tue', revenue: 3000 },
        { name: 'Wed', revenue: 5000 },
        { name: 'Thu', revenue: 2780 },
        { name: 'Fri', revenue: 6890 },
        { name: 'Sat', revenue: 8390 },
        { name: 'Sun', revenue: 10490 },
    ]

    return (
        <DashboardLayout>
            <div className="dash-page">
                {/* Stats Cards */}
                <div className="stat-cards-grid">
                    {statCards.map((card, i) => (
                        <div className="stat-card glass-panel" key={i}>
                            <div className="stat-card-inner">
                                <div className="stat-info">
                                    <p>{card.label}</p>
                                    {loading ? <div className="skeleton-text" /> : <h3>{card.value}</h3>}
                                </div>
                                <div className="stat-icon-wrapper" style={{ background: card.gradient }}>
                                    {card.icon}
                                </div>
                            </div>
                            <div className="stat-trend">
                                <TrendingUp size={14} className="trend-icon positive" />
                                <span>+12% from last month</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Analytics Chart */}
                <div className="chart-section glass-panel">
                    <div className="section-header">
                        <div className="header-title">
                            <BarChart3 className="section-icon" size={20} />
                            <h3>Revenue Analytics</h3>
                        </div>
                    </div>
                    <div className="chart-container" style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <AreaChart data={mockChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
                                    itemStyle={{ color: '#818cf8' }}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="dashboard-grid-2">
                    {/* Recent Orders */}
                    <div className="recent-section glass-panel">
                        <div className="section-header">
                            <div className="header-title">
                                <Activity className="section-icon" size={20} />
                                <h3>Recent Orders</h3>
                            </div>
                            <button className="view-all-btn" onClick={() => navigate('/orders')}>
                                View All <ArrowRight size={16} />
                            </button>
                        </div>

                        {loading ? (
                            <div className="dash-loading">
                                <div className="spinner"></div>
                                <span>Loading orders...</span>
                            </div>
                        ) : recentOrders.length === 0 ? (
                            <div className="dash-empty">
                                <Package size={48} />
                                <p>No orders yet</p>
                            </div>
                        ) : (
                            <div className="table-container">
                                <table className="modern-table">
                                    <thead>
                                        <tr>
                                            <th>Order ID</th>
                                            <th>Customer</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentOrders.map((order) => (
                                            <tr key={order._id}>
                                                <td className="order-id-cell">#{order._id?.slice(-6).toUpperCase()}</td>
                                                <td>
                                                    <div className="table-user">
                                                        <div className="avatar-sm">{order.userId?.name?.charAt(0).toUpperCase() || 'U'}</div>
                                                        <span>{order.userId?.name || 'N/A'}</span>
                                                    </div>
                                                </td>
                                                <td className="amount-cell">₹{order.totalAmount?.toLocaleString()}</td>
                                                <td>
                                                    <span className={`status-badge status-${order.status?.toLowerCase() || 'pending'}`}>
                                                        {order.status || 'Pending'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* Quick Links */}
                    <div className="quick-links-section glass-panel">
                        <div className="section-header">
                            <h3>Quick Actions</h3>
                        </div>
                        <div className="quick-grid">
                            <div className="quick-action-card" onClick={() => navigate('/category')}>
                                <div className="qa-icon" style={{ background: 'rgba(99, 102, 241, 0.1)', color: '#6366f1' }}>
                                    <Package size={24} />
                                </div>
                                <div className="qa-text">
                                    <h4>Categories</h4>
                                    <p>Manage product categories</p>
                                </div>
                            </div>
                            <div className="quick-action-card" onClick={() => navigate('/products')}>
                                <div className="qa-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                                    <ShoppingBag size={24} />
                                </div>
                                <div className="qa-text">
                                    <h4>Products</h4>
                                    <p>Add or edit items</p>
                                </div>
                            </div>
                            <div className="quick-action-card" onClick={() => navigate('/orders')}>
                                <div className="qa-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
                                    <Activity size={24} />
                                </div>
                                <div className="qa-text">
                                    <h4>Orders</h4>
                                    <p>Track customer orders</p>
                                </div>
                            </div>
                            <div className="quick-action-card" onClick={() => navigate('/users')}>
                                <div className="qa-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                                    <Users size={24} />
                                </div>
                                <div className="qa-text">
                                    <h4>Users</h4>
                                    <p>Manage customer accounts</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Dashboard

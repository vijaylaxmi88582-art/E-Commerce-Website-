import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../Components/DashboardLayout'
import axios from 'axios'
import './CSS/Users.css'
import { Users as UsersIcon, Search, Shield, User, Mail, Phone, MoreVertical } from 'lucide-react'

const Users = () => {
    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const api_url = import.meta.env.VITE_API_URL
    const token = localStorage.getItem('token')

    const fetchUsers = async () => {
        try {
            const res = await axios.get(`${api_url}/api/user/all-users`, {
                headers: { Authorization: `Bearer ${token}`}
            }); 
            setUsers(res.data.users || []);
        } catch (error) {
            console.log("Error:", error.response?.data || error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!token) {
            navigate('/')
            return
        }
        fetchUsers()
    }, [navigate, token])

    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <DashboardLayout>
            <div className="users-page fade-in">
                <div className="page-header-glass glass-panel">
                    <div className="header-left">
                        <div className="header-icon-wrapper user-header-icon">
                            <UsersIcon size={24} />
                        </div>
                        <div>
                            <h2>User Management</h2>
                            <p>Manage customers and administrators</p>
                        </div>
                    </div>
                    <div className="header-right">
                        <div className="stat-badge user-badge">
                            <UsersIcon size={16} />
                            {users.length} Total Users
                        </div>
                    </div>
                </div>

                <div className="table-controls glass-panel">
                    <div className="search-wrapper full-width">
                        <Search size={18} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search users by name or email address..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="glass-input"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="glass-panel loading-panel">
                        <div className="spinner"></div>
                        <p>Loading users database...</p>
                    </div>
                ) : filteredUsers.length === 0 ? (
                    <div className="glass-panel empty-panel">
                        <User size={64} className="empty-icon" />
                        <h3>No Users Found</h3>
                        <p>{search ? `No user matches "${search}"` : "User database is empty."}</p>
                    </div>
                ) : (
                    <div className="glass-panel table-panel">
                        <div className="table-responsive">
                            <table className="glass-table users-table">
                                <thead>
                                    <tr>
                                        <th>User Details</th>
                                        <th>Contact Info</th>
                                        <th>Role</th>
                                        <th className="text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map((user) => (
                                        <tr key={user._id}>
                                            <td>
                                                <div className="user-cell-large">
                                                    <div className="user-avatar-large">
                                                        {user.name?.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="user-details-stacked">
                                                        <span className="user-name-bold">{user.name}</span>
                                                        <span className="user-id">ID: {user._id?.slice(-8).toUpperCase()}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="contact-info">
                                                    <div className="contact-item">
                                                        <Mail size={14} /> <span>{user.email}</span>
                                                    </div>
                                                    <div className="contact-item">
                                                        <Phone size={14} /> <span>{user.phone || 'Not provided'}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={`role-badge ${user.role?.toLowerCase() === 'admin' ? 'role-admin' : 'role-customer'}`}>
                                                    {user.role?.toLowerCase() === 'admin' ? <Shield size={12} /> : <User size={12} />}
                                                    <span>{user.role === 'admin' ? 'Administrator' : 'Customer'}</span>
                                                </div>
                                            </td>
                                            <td className="text-right">
                                                <button className="icon-btn action-btn">
                                                    <MoreVertical size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}

export default Users

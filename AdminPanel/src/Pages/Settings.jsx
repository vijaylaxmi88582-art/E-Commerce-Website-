import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../Components/DashboardLayout'
import './CSS/Settings.css'
import { User, Lock, Bell, Palette, Save } from 'lucide-react'

const Settings = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const [activeTab, setActiveTab] = useState('account')
    
    // Mock user data since we might not have a full profile API yet
    const [profileData, setProfileData] = useState({
        name: 'Admin User',
        email: 'admin@store.com',
        phone: '+1 234 567 8900'
    })

    const [preferences, setPreferences] = useState({
        emailNotifications: true,
        orderAlerts: true,
        darkMode: true
    })

    useEffect(() => {
        if (!token) {
            navigate('/')
            return
        }
        
        // Attempt to load basic info from localStorage
        try {
            const userStr = localStorage.getItem('user')
            if(userStr) {
                const user = JSON.parse(userStr)
                setProfileData(prev => ({
                    ...prev,
                    name: user.name || prev.name,
                    email: user.email || prev.email
                }))
            }
        } catch(e) {}
    }, [navigate, token])

    const handleSave = (e) => {
        e.preventDefault()
        // In a real app, send data to API here
        alert('Settings saved successfully!')
    }

    const togglePref = (key) => {
        setPreferences(prev => ({ ...prev, [key]: !prev[key] }))
    }

    return (
        <DashboardLayout>
            <div className="settings-page fade-in">
                <div className="page-header-glass glass-panel">
                    <div className="header-left">
                        <div className="header-icon-wrapper">
                            <User size={24} />
                        </div>
                        <div>
                            <h2>Settings & Profile</h2>
                            <p>Manage your account preferences and security</p>
                        </div>
                    </div>
                </div>

                <div className="settings-grid">
                    {/* Sidebar Tabs */}
                    <div className="settings-sidebar glass-panel">
                        <div 
                            className={`settings-tab ${activeTab === 'account' ? 'active' : ''}`}
                            onClick={() => setActiveTab('account')}
                        >
                            <User size={18} /> Account Details
                        </div>
                        <div 
                            className={`settings-tab ${activeTab === 'security' ? 'active' : ''}`}
                            onClick={() => setActiveTab('security')}
                        >
                            <Lock size={18} /> Security
                        </div>
                        <div 
                            className={`settings-tab ${activeTab === 'notifications' ? 'active' : ''}`}
                            onClick={() => setActiveTab('notifications')}
                        >
                            <Bell size={18} /> Notifications
                        </div>
                        <div 
                            className={`settings-tab ${activeTab === 'appearance' ? 'active' : ''}`}
                            onClick={() => setActiveTab('appearance')}
                        >
                            <Palette size={18} /> Appearance
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="settings-content glass-panel">
                        {activeTab === 'account' && (
                            <div className="fade-in">
                                <div className="settings-content-header">
                                    <h3>Account Details</h3>
                                    <p>Update your personal information</p>
                                </div>
                                
                                <form onSubmit={handleSave}>
                                    <div className="profile-form-section">
                                        <div className="avatar-upload-area">
                                            <div className="large-avatar">
                                                {profileData.name.charAt(0).toUpperCase()}
                                            </div>
                                            <button type="button" className="btn-outline">Change Avatar</button>
                                        </div>
                                        
                                        <div className="form-fields">
                                            <div className="form-group">
                                                <label>Full Name</label>
                                                <input 
                                                    type="text" 
                                                    className="glass-input" 
                                                    value={profileData.name}
                                                    onChange={e => setProfileData({...profileData, name: e.target.value})}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Email Address</label>
                                                <input 
                                                    type="email" 
                                                    className="glass-input" 
                                                    value={profileData.email}
                                                    onChange={e => setProfileData({...profileData, email: e.target.value})}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Phone Number</label>
                                                <input 
                                                    type="text" 
                                                    className="glass-input" 
                                                    value={profileData.phone}
                                                    onChange={e => setProfileData({...profileData, phone: e.target.value})}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="save-action-row">
                                        <button type="submit" className="glass-btn" style={{background: 'var(--accent-primary)', border: 'none'}}>
                                            <Save size={16} /> Save Changes
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div className="fade-in">
                                <div className="settings-content-header">
                                    <h3>Security</h3>
                                    <p>Update your password and secure your account</p>
                                </div>
                                <form onSubmit={handleSave} className="form-fields" style={{maxWidth: '500px'}}>
                                    <div className="form-group">
                                        <label>Current Password</label>
                                        <input type="password" className="glass-input" placeholder="••••••••" />
                                    </div>
                                    <div className="form-group">
                                        <label>New Password</label>
                                        <input type="password" className="glass-input" placeholder="••••••••" />
                                    </div>
                                    <div className="form-group">
                                        <label>Confirm New Password</label>
                                        <input type="password" className="glass-input" placeholder="••••••••" />
                                    </div>
                                    <div className="save-action-row">
                                        <button type="submit" className="glass-btn" style={{background: 'var(--accent-primary)', border: 'none'}}>
                                            <Lock size={16} /> Update Password
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {activeTab === 'notifications' && (
                            <div className="fade-in">
                                <div className="settings-content-header">
                                    <h3>Notification Preferences</h3>
                                    <p>Choose what alerts you want to receive</p>
                                </div>
                                <div className="toggles-list">
                                    <div className="toggle-row">
                                        <div className="toggle-info">
                                            <h4>Email Notifications</h4>
                                            <p>Receive daily summary emails of store activity</p>
                                        </div>
                                        <div className={`toggle-switch ${preferences.emailNotifications ? 'active' : ''}`} onClick={() => togglePref('emailNotifications')}>
                                            <div className="toggle-knob"></div>
                                        </div>
                                    </div>
                                    <div className="toggle-row">
                                        <div className="toggle-info">
                                            <h4>New Order Alerts</h4>
                                            <p>Get push notifications when a new order is placed</p>
                                        </div>
                                        <div className={`toggle-switch ${preferences.orderAlerts ? 'active' : ''}`} onClick={() => togglePref('orderAlerts')}>
                                            <div className="toggle-knob"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'appearance' && (
                            <div className="fade-in">
                                <div className="settings-content-header">
                                    <h3>Appearance</h3>
                                    <p>Customize how the dashboard looks</p>
                                </div>
                                <div className="toggles-list">
                                    <div className="toggle-row">
                                        <div className="toggle-info">
                                            <h4>Dark Glassmorphism Theme</h4>
                                            <p>Enable the premium dark frosted-glass visual style</p>
                                        </div>
                                        <div className={`toggle-switch ${preferences.darkMode ? 'active' : ''}`} onClick={() => togglePref('darkMode')}>
                                            <div className="toggle-knob"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Settings

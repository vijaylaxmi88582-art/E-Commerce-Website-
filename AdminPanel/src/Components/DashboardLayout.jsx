import React, { useEffect, useState } from 'react'
import './CSS/DashboardLayout.css'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Menu, 
  ChevronDown, 
  X, 
  LogOut, 
  Package, 
  Users, 
  ShoppingCart, 
  Layers,
  Search,
  Bell,
  Settings,
  Command
} from 'lucide-react'
import CommandPalette from './CommandPalette'

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const [loginPerson, setLoginPerson] = useState('')
  const [role, setRole] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    if (!token) {
      navigate('/')
    } else {
      const Loginedperson = JSON.parse(user)
      setLoginPerson(Loginedperson.name)
      setRole(Loginedperson.role)
    }

    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsCommandPaletteOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  const tabs = {
    admin: [
      { name: "Dashboard", path: '/dashboard', icon: <LayoutDashboard size={20} /> },
      { name: "Category", path: '/category', icon: <Layers size={20} /> },
      { name: "Products", path: '/products', icon: <Package size={20} /> },
      { name: "Orders", path: '/orders', icon: <ShoppingCart size={20} /> },
      { name: "Users", path: '/users', icon: <Users size={20} /> },
      { name: "Settings", path: '/settings', icon: <Settings size={20} /> },
    ],
    customer: [
      { name: "My Orders", path: '/my-orders', icon: <ShoppingCart size={20} /> },
      { name: "Address", path: '/my-address', icon: <Layers size={20} /> },
      { name: "Carts", path: '/my-carts', icon: <Package size={20} /> },
    ]
  }

  // Get current page name for header
  const getCurrentPageName = () => {
    const currentTab = tabs[role]?.find(t => location.pathname.includes(t.path))
    return currentTab ? currentTab.name : 'Dashboard'
  }

  return (
    <div className="dashboard-outer">
      {/* Sidebar Overlay for mobile */}
      {!sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(true)}></div>}
      
      <aside className={`sidebar glass-panel ${sidebarOpen ? 'open' : 'close'}`}>
        <div className="sidebar-logo">
          <div className="logo-icon-wrapper">
            <span className="logo-icon">D</span>
          </div>
          <span className="logo-text">Dashboard</span>
          <button className="close-sidebar-btn" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>
        
        <div className="sidebar-nav">
          <p className="nav-label">MAIN MENU</p>
          <div className="sidebar-tabs">
            {tabs[role]?.map((tab, index) => (
              <NavLink 
                key={index} 
                to={tab.path} 
                className={({isActive}) => `sidebar-tab-name ${isActive ? 'active-tab' : ''}`}
              >
                <span className="tab-icon">{tab.icon}</span> 
                <span className="tab-text">{tab.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
        
        <div className="sidebar-footer">
          <div className="sidebar-logout" onClick={handleLogout}>
            <LogOut size={20} /> <span>Logout</span>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="dashboard-header glass-panel">
          <div className="dashboard-header-left">
            <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu size={24} />
            </button>
            <div className="header-title-area">
              <h2>{getCurrentPageName()}</h2>
              <p>Welcome back, <span className="highlight-text">{loginPerson}</span>!</p>
            </div>
          </div>

          <div className="dashboard-header-right">
            <div className="header-search" onClick={() => setIsCommandPaletteOpen(true)} style={{cursor: 'pointer'}}>
              <Search size={18} className="search-icon-sm" />
              <div className="header-search-input" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)'}}>
                <span>Search...</span>
                <div style={{display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontFamily: 'monospace'}}>
                  <Command size={10} /> K
                </div>
              </div>
            </div>
            
            <div className="notification-wrapper">
              <button className="icon-action-btn" onClick={() => setShowNotifications(!showNotifications)}>
                <Bell size={20} />
                <span className="notification-dot"></span>
              </button>
              
              {showNotifications && (
                <div className="notification-dropdown glass-panel">
                  <div className="notif-header">
                    <h4>Notifications</h4>
                    <span className="notif-badge">3 New</span>
                  </div>
                  <div className="notif-list">
                    <div className="notif-item unread">
                      <div className="notif-icon" style={{background: 'rgba(99, 102, 241, 0.1)', color: '#6366f1'}}>
                        <ShoppingCart size={16} />
                      </div>
                      <div className="notif-content">
                        <p>New order <strong>#1029</strong> placed</p>
                        <span>2 mins ago</span>
                      </div>
                    </div>
                    <div className="notif-item unread">
                      <div className="notif-icon" style={{background: 'rgba(16, 185, 129, 0.1)', color: '#10b981'}}>
                        <Users size={16} />
                      </div>
                      <div className="notif-content">
                        <p>New user <strong>Rahul</strong> registered</p>
                        <span>1 hour ago</span>
                      </div>
                    </div>
                    <div className="notif-item">
                      <div className="notif-icon" style={{background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b'}}>
                        <Package size={16} />
                      </div>
                      <div className="notif-content">
                        <p>Product <strong>AirPods</strong> is low on stock</p>
                        <span>5 hours ago</span>
                      </div>
                    </div>
                  </div>
                  <div className="notif-footer">
                    View All Activity
                  </div>
                </div>
              )}
            </div>

            <div className="profile-wrapper">
              <div className="dashboard-admin-outer" onClick={() => setShowProfileMenu(!showProfileMenu)}>
                <div className="admin-avatar">
                  {loginPerson ? loginPerson.charAt(0).toUpperCase() : 'A'}
                </div>
                <div className="admin-info">
                  <p>{loginPerson || 'Admin'}</p>
                  <span>{role === 'admin' ? 'Super Admin' : 'Customer'}</span>
                </div>
                <div className="dropdown-icon">
                  <ChevronDown size={16} />
                </div>
              </div>
              
              {showProfileMenu && (
                <div className="profile-dropdown glass-panel">
                  <div className="profile-dropdown-item" onClick={() => {navigate('/settings'); setShowProfileMenu(false)}}>
                    <Settings size={16} />
                    <span>Settings</span>
                  </div>
                  <div className="profile-dropdown-item text-danger" onClick={handleLogout}>
                    <LogOut size={16} />
                    <span>Logout</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>
        
        <div className="dashboard-content">
          <div className="content-inner">
            {children}
          </div>
        </div>
      </main>

      <CommandPalette 
        isOpen={isCommandPaletteOpen} 
        onClose={() => setIsCommandPaletteOpen(false)} 
      />
    </div>
  )
}

export default DashboardLayout
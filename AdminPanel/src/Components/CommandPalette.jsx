import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, LayoutDashboard, Package, ShoppingCart, Users, Layers, Settings, X } from 'lucide-react'
import './CSS/CommandPalette.css'

const CommandPalette = ({ isOpen, onClose }) => {
    const [search, setSearch] = useState('')
    const [activeIndex, setActiveIndex] = useState(0)
    const inputRef = useRef(null)
    const navigate = useNavigate()

    const routes = [
        { id: 'dashboard', title: 'Dashboard', icon: <LayoutDashboard />, path: '/dashboard', group: 'Navigation' },
        { id: 'categories', title: 'Categories', icon: <Layers />, path: '/category', group: 'Navigation' },
        { id: 'products', title: 'Products', icon: <Package />, path: '/products', group: 'Navigation' },
        { id: 'orders', title: 'Orders', icon: <ShoppingCart />, path: '/orders', group: 'Navigation' },
        { id: 'users', title: 'Users', icon: <Users />, path: '/users', group: 'Navigation' },
        { id: 'settings', title: 'Settings', icon: <Settings />, path: '/settings', group: 'Preferences' },
    ]

    const filteredRoutes = routes.filter(route => 
        route.title.toLowerCase().includes(search.toLowerCase())
    )

    useEffect(() => {
        if (isOpen) {
            setSearch('')
            setActiveIndex(0)
            setTimeout(() => inputRef.current?.focus(), 50)
        }
    }, [isOpen])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isOpen) return

            if (e.key === 'ArrowDown') {
                e.preventDefault()
                setActiveIndex(prev => (prev < filteredRoutes.length - 1 ? prev + 1 : prev))
            } else if (e.key === 'ArrowUp') {
                e.preventDefault()
                setActiveIndex(prev => (prev > 0 ? prev - 1 : prev))
            } else if (e.key === 'Enter') {
                e.preventDefault()
                if (filteredRoutes[activeIndex]) {
                    navigate(filteredRoutes[activeIndex].path)
                    onClose()
                }
            } else if (e.key === 'Escape') {
                onClose()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, activeIndex, filteredRoutes, navigate, onClose])

    if (!isOpen) return null

    return (
        <div className="command-palette-overlay" onClick={onClose}>
            <div className="command-palette-modal" onClick={e => e.stopPropagation()}>
                <div className="cp-search-header">
                    <Search className="cp-search-icon" size={20} />
                    <input 
                        ref={inputRef}
                        type="text" 
                        className="cp-input" 
                        placeholder="Search for pages, settings, or actions..." 
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value)
                            setActiveIndex(0)
                        }}
                    />
                    <span className="cp-badge">ESC</span>
                </div>

                <div className="cp-results">
                    {filteredRoutes.length === 0 ? (
                        <div className="cp-empty">
                            No results found for "{search}"
                        </div>
                    ) : (
                        <>
                            <div className="cp-group-label">Pages</div>
                            {filteredRoutes.map((route, index) => (
                                <div 
                                    key={route.id} 
                                    className={`cp-item ${index === activeIndex ? 'active' : ''}`}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    onClick={() => {
                                        navigate(route.path)
                                        onClose()
                                    }}
                                >
                                    <div className="cp-item-icon">
                                        {route.icon}
                                    </div>
                                    <div className="cp-item-details">
                                        <span className="cp-item-title">{route.title}</span>
                                        <span className="cp-item-subtitle">Go to {route.title.toLowerCase()}</span>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>

                <div className="cp-footer">
                    <div className="cp-shortcut">
                        <span className="cp-key">↑</span>
                        <span className="cp-key">↓</span>
                        <span>to navigate</span>
                    </div>
                    <div className="cp-shortcut">
                        <span className="cp-key">↵</span>
                        <span>to select</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommandPalette

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../Components/DashboardLayout'
import axios from 'axios'
import './CSS/Orders.css'
import { Package, Search, Filter, ShoppingCart, ChevronDown, Download } from 'lucide-react'

const Orders = () => {
    const navigate = useNavigate()
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const api_url = import.meta.env.VITE_API_URL
    const token = localStorage.getItem('token')

    const fetchOrders = async () => {
        try {
            const res = await axios.get(`${api_url}/api/order/all-orders`, {
                headers: { Authorization: token }
            })
            setOrders(res.data.orders)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const updateStatus = async (orderId, status) => {
        try {
            await axios.put(`${api_url}/api/order/update-status/${orderId}`,
                { status },
                { headers: { Authorization: token } }
            )
            fetchOrders()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (!token) {
            navigate('/')
            return
        }
        fetchOrders()
    }, [navigate, token])

    const handleExportCSV = () => {
        if (orders.length === 0) return;

        const headers = ['Order ID', 'Customer Name', 'Items Count', 'Total Amount (INR)', 'Payment Type', 'Status'];
        
        const csvRows = orders.map(order => {
            return [
                order._id,
                order.userId?.name || 'N/A',
                order.items?.length || 0,
                order.totalAmount || 0,
                order.paymentType || 'COD',
                order.status || 'Pending'
            ].map(val => `"${val}"`).join(',');
        });

        const csvString = [headers.join(','), ...csvRows].join('\n');
        
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `orders_export_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const filteredOrders = orders.filter(order => 
        order._id?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        order.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <DashboardLayout>
            <div className="orders-page fade-in">
                <div className="page-header-glass glass-panel">
                    <div className="header-left">
                        <div className="header-icon-wrapper">
                            <ShoppingCart size={24} />
                        </div>
                        <div>
                            <h2>Order Management</h2>
                            <p>Track and manage customer orders</p>
                        </div>
                    </div>
                    <div className="header-right">
                        <div className="stat-badge">
                            <span className="dot pulse"></span>
                            {orders.length} Total Orders
                        </div>
                    </div>
                </div>

                <div className="table-controls glass-panel">
                    <div className="search-wrapper">
                        <Search size={18} className="search-icon" />
                        <input 
                            type="text" 
                            placeholder="Search by Order ID or Customer Name..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="glass-input"
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button className="glass-btn" onClick={handleExportCSV}>
                            <Download size={18} />
                            <span>Export CSV</span>
                        </button>
                        <button className="filter-btn glass-btn">
                            <Filter size={18} />
                            <span>Filter</span>
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="glass-panel loading-panel">
                        <div className="spinner"></div>
                        <p>Loading orders...</p>
                    </div>
                ) : filteredOrders.length === 0 ? (
                    <div className="glass-panel empty-panel">
                        <Package size={64} className="empty-icon" />
                        <h3>No Orders Found</h3>
                        <p>{searchTerm ? "Try adjusting your search" : "When customers place orders, they will appear here."}</p>
                    </div>
                ) : (
                    <div className="glass-panel table-panel">
                        <div className="table-responsive">
                            <table className="glass-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Order ID</th>
                                        <th>Customer</th>
                                        <th>Items</th>
                                        <th>Total</th>
                                        <th>Payment</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredOrders.map((order, index) => (
                                        <tr key={order._id}>
                                            <td className="text-muted">{index + 1}</td>
                                            <td className="font-mono">#{order._id?.slice(-6).toUpperCase()}</td>
                                            <td>
                                                <div className="user-cell">
                                                    <div className="user-avatar">{order.userId?.name?.charAt(0).toUpperCase() || 'U'}</div>
                                                    <div className="user-details">
                                                        <span className="user-name">{order.userId?.name || 'N/A'}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="items-badge">{order.items?.length || 0} items</span>
                                            </td>
                                            <td className="amount-text">₹{order.totalAmount?.toLocaleString()}</td>
                                            <td>
                                                <span className={`pay-badge pay-${order.paymentType?.toLowerCase() || 'cod'}`}>
                                                    {order.paymentType}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="custom-select-wrapper">
                                                    <select
                                                        className={`status-select ${order.status?.toLowerCase() || 'pending'}`}
                                                        value={order.status || 'Pending'}
                                                        onChange={(e) => updateStatus(order._id, e.target.value)}
                                                    >
                                                        <option value="Pending">Pending</option>
                                                        <option value="Processing">Processing</option>
                                                        <option value="Shipped">Shipped</option>
                                                        <option value="Delivered">Delivered</option>
                                                        <option value="Cancelled">Cancelled</option>
                                                    </select>
                                                    <ChevronDown size={14} className="select-icon" />
                                                </div>
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

export default Orders

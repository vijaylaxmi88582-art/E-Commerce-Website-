import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Order.css'

const Order = () => {
    const navigate = useNavigate()
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const api_url = import.meta.env.VITE_API_URL
    const token = localStorage.getItem('token')

    const fetchOrders = async () => {
        try {
            const res = await axios.get(`${api_url}/api/order/my-orders`, {
                headers: {
                    Authorization: token
                }
            })
            setOrders(res.data.orders)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!token) {
            navigate('/login')
            return
        }
        fetchOrders()
    }, [navigate, token])

    if (loading) return <div className="order-loading">Loading orders...</div>

    return (
        <div className="order-container">
            <div className="order-header">
                <button className="back-btn" onClick={() => navigate('/')}>← Back</button>
                <h2>My Orders</h2>
            </div>

            {orders.length === 0 ? (
                <div className="no-orders">
                    <p>No orders found</p>
                    <button className="shop-btn" onClick={() => navigate('/')}>Start Shopping</button>
                </div>
            ) : (
                orders.map((order) => (
                    <div className="order-card" key={order._id}>
                        <div className="order-top">
                            <span className="order-id">Order ID: {order._id}</span>
                            <span className={`order-status ${order.status?.toLowerCase()}`}>
                                {order.status}
                            </span>
                        </div>

                        <div className="order-items">
                            {order.items?.map((item, index) => (
                                <div className="order-item" key={index}>
                                    <img
                                        src={item.productId?.images?.[0]?.url}
                                        alt={item.productId?.productName}
                                        className="order-item-img"
                                    />
                                    <div className="order-item-info">
                                        <p className="item-name">{item.productId?.productName}</p>
                                        <p>Qty: {item.qty}</p>
                                        <p>Price: ₹{item.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="order-bottom">
                            <p className="order-address">📍 {order.address}</p>
                            <p className="order-payment">💳 {order.paymentType}</p>
                            <p className="order-total">Total: ₹{order.totalAmount?.toLocaleString()}</p>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default Order

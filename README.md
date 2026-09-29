# 🛒 MERN Stack E-Commerce Website

A full-stack **E-Commerce web application** built using the **MERN Stack**. The application allows users to browse products, create an account, login securely, add products to their cart, and place orders.

## 🚀 Features

### 👤 User Features

* User Registration & Login
* JWT-based Authentication
* Browse Products
* View Product Details
* Add Products to Cart
* Update Cart Quantity
* Remove Products from Cart
* Place Orders
* Responsive User Interface

### 🔐 Admin Features

* Add New Products
* Update Product Details
* Delete Products
* Manage Product Prices
* Manage Product Sizes
* View Product Information

## 🛠️ Tech Stack

### Frontend

* React.js
* JavaScript
* HTML
* CSS

### Backend

* Node.js
* Express.js
* REST APIs
* JWT Authentication

### Database

* MongoDB
* MongoDB Atlas

### Tools

* Git & GitHub
* Postman
* VS Code

## 🔑 Authentication

The project uses **JWT (JSON Web Token)** for secure user authentication.

Basic flow:

`Login → Server verifies user → JWT Token generated → Token sent to client → Token used for protected APIs`

## 📂 Project Structure

```text
E-Commerce/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   ├── package.json
│   └── ...
│
└── README.md
```

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the backend folder:

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 5. Start Backend Server

```bash
npm start
```

### 6. Start Frontend

```bash
npm run dev
```

The application will run locally on the frontend and backend ports configured in the project.

## 🔌 API Testing

I used **Postman** to test and verify the REST APIs.

APIs include operations for:

* User Registration
* User Login
* Products
* Cart
* Orders
* Admin Product Management

## 🗄️ Database

**MongoDB** is used to store application data such as:

* User information
* Product details
* Cart data
* Order information

## 🔒 Security

* JWT authentication
* Protected routes
* Environment variables for sensitive configuration
* Authentication middleware for protected APIs

## 📸 Screenshots

Add your project screenshots here:

```text
screenshots/
├── home.png
├── login.png
├── products.png
├── cart.png
└── admin.png
```

## 🎯 Future Enhancements

* Online Payment Integration
* Order Tracking
* Product Search
* Product Filtering
* Product Reviews & Ratings
* Wishlist
* Email Notifications

## 👩‍💻 Author

**Vijaylaxmi Prajapti**

### Skills

* React.js
* Node.js
* Express.js
* MongoDB
* JavaScript
* REST API
* JWT
* Git & GitHub

## ⭐ Project

If you find this project useful, feel free to ⭐ the repository.

import { useEffect, useState } from "react";
import DashboardLayout from "../Components/DashboardLayout";
import axios from "axios";
import "./CSS/Products.css";
import { PackagePlus, Image as ImageIcon, Trash2, Package } from 'lucide-react';

const Products = () => {
  const api_url = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [data, setData] = useState({
    productName: "",
    price: "",
    description: "",
    category: "",
  });

  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return
    try {
      await axios.delete(`${api_url}/api/product/delete/${id}`, {
        headers: { Authorization: token }
      })
      getProducts()
    } catch (error) {
      console.log(error)
    }
  }

  const getCategory = async () => {
    try {
      const res = await axios.get(`${api_url}/api/category/all-category`, {
        headers: { Authorization: token },
      });
      setCategories(res.data.category);
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async () => {
    try {
      const res = await axios.get(`${api_url}/api/product/get-all`, {
        headers: { Authorization: token },
      });
      setProducts(res.data.product);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    
    // Create preview URLs
    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(previews);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("productName", data.productName);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("category", data.category);

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      await axios.post(`${api_url}/api/product/create`, formData, {
        headers: { Authorization: token },
      });
      
      setData({ productName: "", price: "", description: "", category: "" });
      setImages([]);
      setPreviewImages([]);
      getProducts();
      alert("Product Added Successfully!");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    getCategory();
    getProducts();
  }, [token, api_url]);

  return (
    <DashboardLayout>
      <div className="products-page fade-in">
        
        <div className="product-layout-grid">
          
          {/* Add Product Form */}
          <div className="glass-panel add-product-card">
            <div className="card-header">
              <div className="header-icon">
                <PackagePlus size={24} />
              </div>
              <div>
                <h2>Add New Product</h2>
                <p>Fill in the details to list a new item</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="product-form">
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  placeholder="e.g. Wireless Headphones"
                  value={data.productName}
                  onChange={(e) => setData({ ...data, productName: e.target.value })}
                  required
                  className="glass-input"
                />
              </div>

              <div className="form-row">
                <div className="form-group half">
                  <label>Price (₹)</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={data.price}
                    onChange={(e) => setData({ ...data, price: e.target.value })}
                    required
                    className="glass-input"
                  />
                </div>
                <div className="form-group half">
                  <label>Category</label>
                  <select
                    value={data.category}
                    onChange={(e) => setData({ ...data, category: e.target.value })}
                    required
                    className="glass-input"
                  >
                    <option value="" disabled>Select Category</option>
                    {categories.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.categoryName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  placeholder="Describe your product..."
                  value={data.description}
                  onChange={(e) => setData({ ...data, description: e.target.value })}
                  required
                  className="glass-input textarea"
                  rows="4"
                ></textarea>
              </div>

              <div className="form-group">
                <label>Product Images</label>
                <div className="image-upload-wrapper">
                  <input
                    type="file"
                    multiple
                    id="image-upload"
                    className="hidden-file-input"
                    onChange={handleImageChange}
                  />
                  <label htmlFor="image-upload" className="upload-dropzone">
                    <ImageIcon size={32} className="upload-icon" />
                    <span>Click to browse or drag images here</span>
                    <p className="upload-hint">Supports JPG, PNG, WEBP</p>
                  </label>
                </div>
                
                {previewImages.length > 0 && (
                  <div className="image-preview-container">
                    {previewImages.map((src, index) => (
                      <div key={index} className="preview-box">
                        <img src={src} alt="Preview" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button className="submit-btn" type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="btn-loading">
                    <span className="spinner-sm"></span> Publishing...
                  </span>
                ) : "Publish Product"}
              </button>
            </form>
          </div>

          {/* Product List */}
          <div className="glass-panel table-card">
            <div className="card-header border-bottom">
              <div>
                <h2>Product Inventory</h2>
                <p>Manage your existing products</p>
              </div>
              <div className="inventory-badge">
                <Package size={16} /> {products.length} Items
              </div>
            </div>

            <div className="table-responsive inventory-table-wrapper">
              <table className="glass-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length > 0 ? (
                    products.map((item) => (
                      <tr key={item._id}>
                        <td>
                          <div className="product-cell">
                            <div className="product-img-wrapper">
                              {item.images[0]?.url ? (
                                <img src={item.images[0].url} alt={item.productName} />
                              ) : (
                                <ImageIcon size={20} className="placeholder-icon" />
                              )}
                            </div>
                            <span className="product-name">{item.productName}</span>
                          </div>
                        </td>
                        <td className="price-cell">₹{item.price?.toLocaleString()}</td>
                        <td>
                          <span className="category-badge">
                            {item.category?.categoryName || 'Uncategorized'}
                          </span>
                        </td>
                        <td>
                          <button 
                            className="icon-btn delete-btn" 
                            onClick={() => handleDelete(item._id)}
                            title="Delete Product"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="empty-table-cell">
                        <div className="empty-inventory">
                          <Package size={48} className="empty-icon" />
                          <p>Inventory is empty</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default Products;
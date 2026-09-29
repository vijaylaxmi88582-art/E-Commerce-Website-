import React, { useEffect, useState } from "react"
import DashboardLayout from "../Components/DashboardLayout"
import axios from "axios"
import "./CSS/Category.css"
import { Layers, PlusCircle, Edit2, Trash2, Image as ImageIcon, CheckCircle, XCircle } from 'lucide-react'

const Category = () => {
  const [categoryName, setCategoryName] = useState("")
  const [image, setImage] = useState(null)
  const [categories, setCategories] = useState([])
  const [editId, setEditId] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)

  const api_url = import.meta.env.VITE_API_URL
  const token = localStorage.getItem("token")

  const getCategories = async () => {
    try {
      const res = await axios.get(`${api_url}/api/category/all-category`)
      setCategories(res.data.category)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setImage(file)
    if (file) {
      setPreviewImage(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    const formData = new FormData()
    formData.append("categoryName", categoryName)
    if (image) formData.append("image", image)

    try {
      if (editId) {
        await axios.put(`${api_url}/api/category/update/${editId}`, formData, {
          headers: { Authorization: token }
        })
        setEditId(null)
      } else {
        await axios.post(`${api_url}/api/category/create-category`, formData, {
          headers: { Authorization: token }
        })
      }
      setCategoryName("")
      setImage(null)
      setPreviewImage(null)
      getCategories()
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (item) => {
    setEditId(item._id)
    setCategoryName(item.categoryName)
    setImage(null)
    setPreviewImage(item.image) // Use existing image as preview initially
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return
    try {
      await axios.delete(`${api_url}/api/category/delete/${id}`, {
        headers: { Authorization: token }
      })
      getCategories()
    } catch (error) {
      console.log(error)
    }
  }

  const handleCancel = () => {
    setEditId(null)
    setCategoryName("")
    setImage(null)
    setPreviewImage(null)
  }

  return (
    <DashboardLayout>
      <div className="cat-page fade-in">
        
        <div className="cat-layout-grid">
          
          {/* FORM */}
          <div className="glass-panel cat-form-card">
            <div className="cat-form-header">
              <div className="header-icon-wrapper" style={{background: editId ? 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(245,158,11,0.1))' : ''}}>
                {editId ? <Edit2 size={24} color={editId ? '#f59e0b' : 'var(--accent-primary)'} /> : <PlusCircle size={24} color="var(--accent-primary)" />}
              </div>
              <div>
                <h2>{editId ? "Edit Category" : "New Category"}</h2>
                <p>{editId ? "Update existing category details" : "Create a new product category"}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="cat-form">
              <div className="form-group">
                <label>Category Name</label>
                <input
                  type="text"
                  placeholder="e.g. Smart Watches"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="glass-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>Category Image {editId && <span className="text-muted">(Optional)</span>}</label>
                
                <div className="image-upload-wrapper">
                  <input
                    type="file"
                    accept="image/*"
                    id="cat-image-upload"
                    className="hidden-file-input"
                    onChange={handleImageChange}
                  />
                  {!previewImage ? (
                    <label htmlFor="cat-image-upload" className="upload-dropzone cat-dropzone">
                      <ImageIcon size={28} className="upload-icon" />
                      <span>Click to upload image</span>
                    </label>
                  ) : (
                    <div className="cat-img-preview-box">
                      <img src={previewImage} alt="preview" />
                      <label htmlFor="cat-image-upload" className="change-img-overlay">
                        <Edit2 size={16} /> Change Image
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <div className="cat-form-actions">
                <button type="submit" className="glass-btn primary-btn" disabled={isSubmitting}>
                  {isSubmitting ? <div className="spinner-sm"></div> : (editId ? <CheckCircle size={16}/> : <PlusCircle size={16}/>)}
                  {editId ? "Update Category" : "Create Category"}
                </button>
                {editId && (
                  <button type="button" className="glass-btn cancel-btn" onClick={handleCancel}>
                    <XCircle size={16} /> Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* LIST */}
          <div className="glass-panel cat-list-card">
            <div className="cat-list-header">
              <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                <Layers size={20} color="var(--text-secondary)" />
                <h2>Category Library</h2>
              </div>
              <span className="inventory-badge">{categories.length} Categories</span>
            </div>

            <div className="cat-grid">
              {categories.length === 0 ? (
                <div className="cat-empty">
                  <Layers size={48} className="empty-icon" />
                  <p>No categories found.</p>
                </div>
              ) : (
                categories.map((item) => (
                  <div className="cat-item-card" key={item._id}>
                    <div className="cat-item-img">
                      {item.image ? (
                        <img src={item.image} alt={item.categoryName} />
                      ) : (
                        <ImageIcon size={32} className="placeholder-icon" />
                      )}
                    </div>
                    <div className="cat-item-info">
                      <h3>{item.categoryName}</h3>
                    </div>
                    <div className="cat-item-overlay">
                      <button className="icon-btn edit-action" onClick={() => handleEdit(item)}>
                        <Edit2 size={18} />
                      </button>
                      <button className="icon-btn delete-action" onClick={() => handleDelete(item._id)}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  )
}

export default Category

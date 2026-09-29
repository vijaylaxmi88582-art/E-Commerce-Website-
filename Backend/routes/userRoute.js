const express = require('express')
const userRouter = express.Router()

const {registerUser, loginUser, forgetPassword, resetPassword,getAllUsers, addToWishlist, removeFromWishlist, getWishlist} = require('../controllers/userController')
const auth = require('../middleware/auth')

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)


userRouter.post('/forgot-password',forgetPassword)
userRouter.post('/reset-password',resetPassword)
// check-token

userRouter.get('/all-users', getAllUsers)

userRouter.post('/wishlist/add', auth, addToWishlist)
userRouter.post('/wishlist/remove', auth, removeFromWishlist)
userRouter.get('/wishlist', auth, getWishlist)

userRouter.get('/check-token',auth,(req,res)=>{
        res.status(200).json({message:"Token is valid",user:req.user})
})


module.exports = userRouter
const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const authRouter = express.Router()

// ---- GOOGLE ----
authRouter.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
)

authRouter.get('/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: `${process.env.ADMIN_URL}/?error=google_failed` }),
    (req, res) => {
        const token = jwt.sign(
            { userId: req.user._id, role: req.user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        )
        const userData = JSON.stringify({ name: req.user.name, role: req.user.role })
        res.redirect(`${process.env.ADMIN_URL}/dashboard?token=${token}&user=${encodeURIComponent(userData)}`)
    }
)

// ---- GITHUB ----
authRouter.get('/github',
    passport.authenticate('github', { scope: ['user:email'] })
)

authRouter.get('/github/callback',
    passport.authenticate('github', { session: false, failureRedirect: `${process.env.ADMIN_URL}/?error=github_failed` }),
    (req, res) => {
        const token = jwt.sign(
            { userId: req.user._id, role: req.user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        )
        const userData = JSON.stringify({ name: req.user.name, role: req.user.role })
        res.redirect(`${process.env.ADMIN_URL}/dashboard?token=${token}&user=${encodeURIComponent(userData)}`)
    }
)

module.exports = authRouter

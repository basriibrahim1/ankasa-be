const express = require('express')
const router = express.Router()
const authRoutes = require('./authRoutes')
const userRoutes = require('./userRoutes')
const ticketRoutes = require('./ticketRoutes')
const bookingRoutes = require('./bookingRoutes')


router.use("/auth", authRoutes)
router.use("/users", userRoutes)
router.use("/ticket", ticketRoutes)
router.use("/booking", bookingRoutes)



module.exports = router
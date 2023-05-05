const express = require("express");
const { getBookingController, bookingPayloadController, bookingInsertController } = require("../controllers/bookingController");
const protect = require("../middleware/userAuth");

const router = express.Router();


router.get("/", getBookingController);
router.get("/mybooking", protect, bookingPayloadController);
router.post("/", protect, bookingInsertController);

module.exports = router;
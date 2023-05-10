const express = require("express");
const { getBookingController, bookingPayloadController, bookingInsertController, bookingIdController, bookingUpdateController } = require("../controllers/bookingController");
const protect = require("../middleware/userAuth");

const router = express.Router();


router.get("/", getBookingController);
router.get("/mybooking", protect, bookingPayloadController);
router.get("/:id", bookingIdController);
router.post("/", protect, bookingInsertController);
router.put("/:id", bookingUpdateController);

module.exports = router;
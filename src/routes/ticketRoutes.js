const express = require("express");
const { getTicketController, ticketIdController } = require("../controllers/ticketController");
const router = express.Router();


router.get("/", getTicketController);
router.get("/:id", ticketIdController);

module.exports = router;
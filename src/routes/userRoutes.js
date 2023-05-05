const express = require("express");
const { userPayloadController, userUpdateController } = require("../controllers/userController");
const protect = require("../middleware/userAuth");
const upload = require("../middleware/photo");
const router = express.Router();


router.get("/myuser", protect, userPayloadController);
router.put("/", protect, upload.single("photo"), userUpdateController);

module.exports = router;
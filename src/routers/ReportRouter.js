const express = require("express");
const router = express.Router();
const { verifyAuth } = require("../middleware/auth");
const ReportController = require("../controllers/ReportController");

router.get(
    "/relatorio",
    verifyAuth,
    ReportController.getReport
);

module.exports = router;
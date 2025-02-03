const express = require("express");
const router = express.Router();
const { verifyAuth } = require("../middleware/auth");

router.get(
    "/relatorio",
    verifyAuth
);
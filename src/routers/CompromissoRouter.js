const express = require("express");
const router = express.Router();
const { verifyAuth } = require("../middleware/auth");
const CompromissoController = require("../controllers/CompromissoController");

router.get(
    "/compromisso",
    verifyAuth,
    CompromissoController.getCompromisso
);
router.post(
    "/compromisso",
    verifyAuth,
    CompromissoController.postCompromisso
);
router.put(
    "/compromisso/:compromisso_id",
    verifyAuth,
    CompromissoController.putCompromisso
);
router.delete(
    "/compromisso/:compromisso_id",
    verifyAuth,
    CompromissoController.deleteCompromisso
);

module.exports = router;
const express = require("express");
const router = express.Router();
const CompromissoController = require("../controllers/CompromissoController");

router.get(
    "/compromisso",
    CompromissoController.getCompromisso()
);
router.post(
    "/compromisso",
    CompromissoController.postCompromisso()
);
router.put(
    "/compromisso/:compromisso_id",
    CompromissoController.putCompromisso()
);
router.delete(
    "/compromisso/:compromisso_id",
    CompromissoController.deleteCompromisso()
);

module.exports = router;
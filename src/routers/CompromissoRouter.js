const express = require("express");
const router = express.Router();
const { verifyAuth } = require("../middleware/auth");
const CompromissoController = require("../controllers/CompromissoController");

router.get("/compromisso", verifyAuth, CompromissoController.getCompromisso);
router.get(
  "/compromisso/:compromisso_id",
  verifyAuth,
  CompromissoController.getCompromissoId
);
router.post("/compromisso", verifyAuth, CompromissoController.postCompromisso);

router.post(
  "/compromissoAll",
  verifyAuth,
  CompromissoController.postCompromissoAll
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

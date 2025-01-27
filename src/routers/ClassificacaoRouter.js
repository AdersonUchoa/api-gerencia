const express = require("express");
const router = express.Router();
const { verifyAuth } = require("../middleware/auth");
const ClassificacaoController = require("../controllers/ClassificacaoController");

router.get(
    "/classificacao",
    verifyAuth,
    ClassificacaoController.getClassificacao
);
router.post(
    "/classificacao",
    verifyAuth,
    ClassificacaoController.postClassificacao
);
router.put(
    "/classificacao/:classificacao_id",
    verifyAuth,
    ClassificacaoController.putClassificacao
);
router.delete(
    "/classificacao/:classificacao_id",
    verifyAuth,
    ClassificacaoController.deleteClassificacao
);

module.exports = router;
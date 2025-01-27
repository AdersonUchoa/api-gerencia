const express = require("express");
const router = express.Router();
const ClassificacaoController = require("../controllers/ClassificacaoController");

router.get(
    "/classificacao",
    ClassificacaoController.getClassificacao()
);
router.post(
    "/classificacao",
    ClassificacaoController.postClassificacao()
);
router.put(
    "/classificacao/:classificacao_id",
    ClassificacaoController.putClassificacao()
);
router.delete(
    "/classificacao/:classificacao_id",
    ClassificacaoController.deleteClassificacao()
);

module.exports = router;
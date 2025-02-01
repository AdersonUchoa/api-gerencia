const express = require("express");
const { verifyAuth } = require("../middleware/auth");
const router = express.Router();
const TarefaController = require("../controllers/TarefaController");

router.get(
    "/compromisso/:compromisso_id/tarefa",
    verifyAuth,
    TarefaController.getTarefa
);
router.post(
    "/compromisso/:compromisso_id/tarefa",
    verifyAuth,
    TarefaController.postTarefa
);
router.put(
    "/compromisso/tarefa/:tarefa_id",
    verifyAuth,
    TarefaController.putTarefa
);
router.delete(
    "/compromisso/tarefa/:tarefa_id",
    verifyAuth,
    TarefaController.deleteTarefa
);

module.exports = router;
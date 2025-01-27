const express = require("express");
const { verifyAuth } = require("../middleware/auth");
const router = express.Router();
const TarefaController = require("../controllers/TarefaController");

router.get(
    "/tarefa",
    verifyAuth,
    TarefaController.getTarefa
);
router.post(
    "/tarefa",
    verifyAuth,
    TarefaController.postTarefa
);
router.put(
    "/tarefa/:tarefa_id",
    verifyAuth,
    TarefaController.putTarefa
);
router.delete(
    "/tarefa/:tarefa_id",
    verifyAuth,
    TarefaController.deleteTarefa
);

module.exports = router;
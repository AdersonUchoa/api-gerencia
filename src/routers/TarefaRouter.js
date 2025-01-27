const express = require("express");
const router = express.Router();
const TarefaController = require("../controllers/TarefaController");

router.get(
    "/tarefa",
    TarefaController.getTarefa()
);
router.post(
    "/tarefa",
    TarefaController.postTarefa()
);
router.put(
    "/tarefa/:tarefa_id",
    TarefaController.putTarefa()
);
router.delete(
    "/tarefa/:tarefa_id",
    TarefaController.deleteTarefa()
);

module.exports = router;
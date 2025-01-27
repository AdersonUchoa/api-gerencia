const express = require("express");
const router = express.Router();
const NotificacaoController = require("../controllers/NotificacaoController");

router.get(
    "/notificacao",
    NotificacaoController.getNotificacao()
);
router.post(
    "/notificacao",
    NotificacaoController.postNotificacao()
);
router.put(
    "/notificacao/:notificacao_id",
    NotificacaoController.putNotificacao()
);
router.delete(
    "/notificacao/:notificacao_id",
    NotificacaoController.deleteNotificacao()
);

module.exports = router;
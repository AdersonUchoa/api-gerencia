const express = require("express");
const router = express.Router();
const { verifyAuth } = require("../middleware/auth");
const NotificacaoController = require("../controllers/NotificacaoController");

router.get(
    "/notificacao",
    verifyAuth,
    NotificacaoController.getNotificacao
);
router.post(
    "/notificacao",
    verifyAuth,
    NotificacaoController.postNotificacao
);
router.put(
    "/notificacao/:notificacao_id",
    verifyAuth,
    NotificacaoController.putNotificacao
);
router.delete(
    "/notificacao/:notificacao_id",
    verifyAuth,
    NotificacaoController.deleteNotificacao
);

module.exports = router;
const express = require("express");
const router = express.Router();
const { verifyAuth } = require("../middleware/auth");
const NotificacaoController = require("../controllers/NotificacaoController");

router.get("/notificacao", verifyAuth, NotificacaoController.getNotificacao);

router.post(
  "/notificao/readAll",
  verifyAuth,
  NotificacaoController.postReadAll
);

router.post("/notificacao/:id", verifyAuth, NotificacaoController.postRead);

router.get(
  "/compromisso/:compromisso_id/notificacao",
  verifyAuth,
  NotificacaoController.getNotificacao
);
router.post(
  "/compromisso/:compromisso_id/notificacao",
  verifyAuth,
  NotificacaoController.postNotificacao
);

router.put(
  "/compromisso/notificacao/:notificacao_id",
  verifyAuth,
  NotificacaoController.putNotificacao
);
router.delete(
  "/compromisso/notificacao/:notificacao_id",
  verifyAuth,
  NotificacaoController.deleteNotificacao
);

module.exports = router;

const express = require("express");
const router = express.Router();
const { verifyAuth } = require("../middleware/auth");
const UsuarioController = require("../controllers/UsuarioController");

router.get(
    "/usuario",
    verifyAuth,
    UsuarioController.getUsuario
);
router.post(
    "/usuario",
    UsuarioController.postUsuario
);
router.put(
    "/usuario/:usuario_id",
    verifyAuth,
    UsuarioController.putUsuario
);
router.delete(
    "/usuario/:usuario_id",
    verifyAuth,
    UsuarioController.deleteUsuario
);

module.exports = router;
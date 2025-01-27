const express = require("express");
const router = express.Router();
const UsuarioController = require("../controllers/UsuarioController");

router.get(
    "/usuario",
    UsuarioController.getUsuario()
);
router.post(
    "/usuario",
    UsuarioController.postUsuario()
);
router.put(
    "/usuario/:usuario_id",
    UsuarioController.putUsuario()
);
router.delete(
    "/usuario/:usuario_id",
    UsuarioController.deleteUsuario()
);

module.exports = router;
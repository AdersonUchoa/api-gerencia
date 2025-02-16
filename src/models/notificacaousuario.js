const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const NotificacaoUsuario = sequelize.define("NotificacaoUsuario", {
    notificacao_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    }
});

module.exports = NotificacaoUsuario;
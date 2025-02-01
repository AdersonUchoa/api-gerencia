const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Notificacao = sequelize.define("Notificacao", {
    notificacao_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    compromisso_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    titulo: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    hora: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

module.exports = Notificacao;
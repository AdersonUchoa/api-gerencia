const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Classificacao = sequelize.define("Classificacao", {
    classificacao_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    titulo: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
});

module.exports = Classificacao;
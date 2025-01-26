const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Usuario = sequelize.define("Usuario", {
    usuario_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
});

module.exports = Usuario;
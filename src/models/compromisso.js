const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Compromisso = sequelize.define("Compromisso", {
    compromisso_id: {
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
    },
    descricao: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    dataCompromisso: {
        type: DataTypes.DATE,
        allowNull: false
    },
    horario: {
        type: DataTypes.TIME,
        allowNull: false,
    } 
});

module.exports = Compromisso;
const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Tarefa = sequelize.define("Tarefa", {
    tarefa_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    compromisso_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dataConclusao: {
        type: DataTypes.DATE,
        allowNull: false,
    } 
});

module.exports = Tarefa;
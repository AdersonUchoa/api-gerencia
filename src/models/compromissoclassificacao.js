const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const CompromissoClassificacao = sequelize.define("CompromissoClassificacao", {
    classificacao_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    compromisso_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    }
});

module.exports = CompromissoClassificacao;
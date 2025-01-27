const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
    process.env.CONNECTION_DB,
    {
        pool: {
            max: 10,
        },
    }
);

sequelize
    .authenticate()
    .then(() => {
        console.log("Conexão com o banco de dados foi bem sucedida.");
    })
    .catch((err) => {
        console.error("Não foi possível a conexão com o banco de dados: " ,err);
    });

module.exports = sequelize;
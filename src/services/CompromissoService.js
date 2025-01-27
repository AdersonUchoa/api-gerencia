const sequelize = require("../database/database");
const CompromissoResponse = require("../DTO/Response/CompromissoResponse");

class CompromissoService {
    async getCompromisso() {
        const [results] = await sequelize.query("SELECT * FROM classificacao");
        const response = results.map(CompromissoResponse.fromModel);
        return response;
    }

    async postCompromisso(usuario_id, titulo, descricao, dataCompromisso, horario){
        const query = `
            INSERT INTO classificacao (usuario_id, titulo, descricao, dataCompromisso, horario)
            VALUES (:usuario_id, :titulo, :descricao, :dataCompromisso, :horario)
            RETURNING*`;
        const [results] = await sequelize.query(query, { 
            replacements: { usuario_id, titulo, descricao, dataCompromisso, horario },
        });

        return results[0]
    }

    async putCompromisso(compromisso_id, usuario_id, titulo, descricao, dataCompromisso, horario){
        const query = `
            UPDATE compromisso
            SET usuario_id = :usuario_id, titulo = :titulo, descricao = :descricao, dataCompromisso = :dataCompromisso, horario = :horario
            WHERE compromisso_id = :compromisso_id
            RETURNING*`;
        const [results] = await sequelize.query(query, {
            replacements: { compromisso_id, usuario_id, titulo, descricao, dataCompromisso, horario },
        });

        if (results.length === 0) {
            throw Error("Compromisso não encontrado!");
        }

        return results[0];
    }

    async deleteCompromisso(compromisso_id){
        const query = `DELETE FROM compromisso WHERE compromisso_id = :compromisso_id RETURNING*`;
        const [results] = await sequelize.query(query, {
            replacements: { compromisso_id },
        });

        if(results.length === 0){
            throw Error("Compromisso não encontrado!");
        }

        return results[0];
    }
}

module.exports = new CompromissoService();
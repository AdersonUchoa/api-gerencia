const sequelize = require("../database/database");
const TarefaResponse = require("../DTO/Response/TarefaResponse");

class TarefaService {
    async getTarefa(compromisso_id) {
        const [results] = await sequelize.query("SELECT * FROM tarefa WHERE idCompromisso = :compromisso_id", { replacements: { compromisso_id }});
        const response = results.map(TarefaResponse.fromModel);
        return response;
    }

    async postTarefa(compromisso_id, descricao, status, dataConclusao){
        const query = `
            INSERT INTO tarefa (idCompromisso, descricao, status, dataConclusao)
            VALUES (:compromisso_id, :descricao, :status, :dataConclusao)
            RETURNING*`;
        const [results] = await sequelize.query(query, { 
            replacements: { compromisso_id, descricao, status, dataConclusao },
        });

        return results[0]
    }

    async putTarefa(tarefa_id, descricao, status, dataConclusao){
        const query = `
            UPDATE tarefa
            SET descricao = :descricao, status = :status, dataConclusao = :dataConclusao
            WHERE id = :tarefa_id
            RETURNING*`;
        const [results] = await sequelize.query(query, {
            replacements: { tarefa_id, descricao, status, dataConclusao },
        });

        if (results.length === 0) {
            throw Error("Tarefa não encontrada!");
        }

        return results[0];
    }

    async deleteTarefa(tarefa_id){
        const query = `DELETE FROM tarefa WHERE id = :tarefa_id RETURNING*`;
        const [results] = await sequelize.query(query, {
            replacements: { tarefa_id },
        });

        if(results.length === 0){
            throw Error("Tarefa não encontrada!");
        }

        return results[0];
    }
}

module.exports = new TarefaService();
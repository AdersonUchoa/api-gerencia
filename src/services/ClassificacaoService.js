const sequelize = require("../database/database");
const ClassificacaoResponse = require("../DTO/Response/ClassificacaoResponse");

class ClassificacaoService {
    async getClassificacao() {
        const [results] = await sequelize.query("SELECT * FROM classificacao");
        const response = results.map(ClassificacaoResponse.fromModel);
        return response;
    }

    async postClassificacao(usuario_id, titulo){
        const query = `
            INSERT INTO classificacao (usuario_id, titulo)
            VALUES (:usuario_id, :titulo)
            RETURNING*`;
        const [results] = await sequelize.query(query, { 
            replacements: { usuario_id, titulo },
        });

        return results[0]
    }

    async putClassificacao(classificacao_id, usuario_id, titulo){
        const query = `
            UPDATE classificacao
            SET usuario_id = :usuario_id, titulo = :titulo
            WHERE id = :classificacao_id
            RETURNING*`;
        const [results] = await sequelize.query(query, {
            replacements: { classificacao_id, usuario_id, titulo },
        });

        if (results.length === 0) {
            throw Error("Classificação não encontrada!");
        }

        return results[0];
    }

    async deleteClassificacao(classificacao_id){
        const query = `DELETE FROM classificacao WHERE id = :classificacao_id RETURNING*`;
        const [results] = await sequelize.query(query, {
            replacements: { classificacao_id },
        });

        if(results.length === 0){
            throw Error("Classificação não encontrada!");
        }

        return results[0];
    }
}

module.exports = new ClassificacaoService();
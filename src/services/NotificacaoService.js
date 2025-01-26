const sequelize = require("../database/database");
const NotificacaoResponse = require("../DTO/Response/NotificacaoResponse");

class NotificacaoService {
    async getNotificacao() {
        const [results] = await sequelize.query("SELECT * FROM notificacao");
        const response = results.map(NotificacaoResponse.fromModel);
        return response;
    }

    async postNotificacao(compromisso_id, titulo, descricao){
        const query = `
            INSERT INTO notificacao (compromisso_id, titulo, descricao)
            VALUES (:compromisso_id, :titulo, :descricao)
            RETURNING*`;
        const [results] = await sequelize.query(query, { 
            replacements: { compromisso_id, titulo, descricao },
        });

        return results[0]
    }

    async putNotificacao(notificacao_id, compromisso_id, titulo, descricao){
        const query = `
            UPDATE notificacao
            SET compromisso_id = :compromisso_id, titulo = :titulo, descricao = :descricao
            WHERE notificacao_id = :notificacao_id
            RETURNING*`;
        const [results] = await sequelize.query(query, {
            replacements: { notificacao_id, compromisso_id, titulo, descricao },
        });

        if (results.length === 0) {
            throw Error("Notificação não encontrada!");
        }

        return results[0];
    }

    async deleteNotificacao(notificacao_id){
        const query = `DELETE FROM notificacao WHERE notificacao_id = :notificacao_id RETURNING*`;
        const [results] = await sequelize.query(query, {
            replacements: { notificacao_id },
        });

        if(results.length === 0){
            throw Error("Notificação não encontrada!");
        }

        return results[0];
    }
}

module.exports = new NotificacaoService();
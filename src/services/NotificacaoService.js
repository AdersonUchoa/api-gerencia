const sequelize = require("../database/database");
const NotificacaoResponse = require("../DTO/Response/NotificacaoResponse");

class NotificacaoService {
    async getNotificacao() {
        const [results] = await sequelize.query("SELECT * FROM notificacao");
        const response = results.map(NotificacaoResponse.fromModel);
        return response;
    }

    async postNotificacao(compromisso_id, titulo, descricao, hora){
        const query = `
            INSERT INTO notificacao (idCompromisso, titulo, descricao, hora)
            VALUES (:compromisso_id, :titulo, :descricao, :hora)
            RETURNING*`;
        const [results] = await sequelize.query(query, { 
            replacements: { compromisso_id, titulo, descricao, hora },
        });

        return results[0]
    }

    async putNotificacao(notificacao_id, titulo, descricao, hora){
        const query = `
            UPDATE notificacao
            SET  titulo = :titulo, descricao = :descricao, hora = :hora
            WHERE id = :notificacao_id
            RETURNING*`;
        const [results] = await sequelize.query(query, {
            replacements: { notificacao_id, titulo, descricao, hora },
        });

        if (results.length === 0) {
            throw Error("Notificação não encontrada!");
        }

        return results[0];
    }

    async deleteNotificacao(notificacao_id){
        const query = `DELETE FROM notificacao WHERE id = :notificacao_id RETURNING*`;
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
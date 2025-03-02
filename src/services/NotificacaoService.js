const sequelize = require("../database/database");
const NotificacaoResponse = require("../DTO/Response/NotificacaoResponse");

class NotificacaoService {
  async getNotificacao(id) {
    const [results] = await sequelize.query(
      `
            select nu.idnotificacao, nu.idusuario, n.titulo, n.descricao, n.hora, nu.visualizado
            from notificacaousuario nu
            join notificacao n on n.id = nu.idnotificacao
            where nu.idusuario = :idusuario  
        `,
      {
        replacements: { idusuario: id },
      }
    );

    const response = results.map(NotificacaoResponse.fromModel);
    return response;
  }

  async postReadAll(id) {
    const [results] = await sequelize.query(
      `
            UPDATE notificacaousuario
            SET visualizado = true
            WHERE idusuario = :idusuario
        `,
      {
        replacements: { idusuario: id },
      }
    );
    return results;
  }

  async postRead(idusuario, idnotificacao) {
    const [results] = await sequelize.query(
      `
            UPDATE notificacaousuario
            SET visualizado = true
            WHERE idusuario = :idusuario
            AND idnotificacao = :idnotificacao
        `,
      { replacements: { idnotificacao: idnotificacao, idusuario: idusuario } }
    );
    return results;
  }

  async postNotificacao(compromisso_id, titulo, descricao, hora) {
    const query = `
            INSERT INTO notificacao (idCompromisso, titulo, descricao, hora)
            VALUES (:compromisso_id, :titulo, :descricao, :hora)
            RETURNING*`;
    const [results] = await sequelize.query(query, {
      replacements: { compromisso_id, titulo, descricao, hora },
    });

    return results[0];
  }

  async putNotificacao(notificacao_id, titulo, descricao, hora, visualizado) {
    const query = `
            UPDATE notificacao
            SET  titulo = :titulo, descricao = :descricao, hora = :hora, visualizado = :visualizado
            WHERE id = :notificacao_id
            RETURNING*`;
    const [results] = await sequelize.query(query, {
      replacements: { notificacao_id, titulo, descricao, hora, visualizado },
    });

    if (results.length === 0) {
      throw Error("Notificação não encontrada!");
    }

    return results[0];
  }

  async deleteNotificacao(notificacao_id) {
    const query = `DELETE FROM notificacao WHERE id = :notificacao_id RETURNING*`;
    const [results] = await sequelize.query(query, {
      replacements: { notificacao_id },
    });

    if (results.length === 0) {
      throw Error("Notificação não encontrada!");
    }

    return results[0];
  }
}

module.exports = new NotificacaoService();

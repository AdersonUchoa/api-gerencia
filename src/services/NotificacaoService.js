const sequelize = require("../database/database");
const NotificacaoResponse = require("../DTO/Response/NotificacaoResponse");

class NotificacaoService {
  async getNotificacao(id) {
    const [results] = await sequelize.query(
      `
            select nu.idnotificacao, n.idcompromisso, nu.idusuario, n.titulo, n.descricao, n.hora, nu.visualizado
            from notificacaousuario nu
            join notificacao n on n.id = nu.idnotificacao
            where nu.idusuario = :idusuario  
        `,
      {
        replacements: { idusuario: id },
      }
    );

    return results;
  }

  async getNotificacaoById(id) {
    const [results] = await sequelize.query(
      `
          select nu.*, u.nome
          from notificacaousuario nu
          join usuario u on u.id = nu.idusuario
          where nu.idnotificacao = :idnotificacao
        `,
      {
        replacements: { idnotificacao: id },
      }
    );

    return results;
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

  async postNotificacao(usuario_id, compromisso_id, titulo, descricao, hora) {
    const query = `
            INSERT INTO notificacao (idCompromisso, titulo, descricao, hora)
            VALUES (:compromisso_id, :titulo, :descricao, :hora)
            RETURNING*`;
    const [results] = await sequelize.query(query, {
      replacements: { compromisso_id, titulo, descricao, hora },
    });

    const [results2] = await sequelize.query(
      `
            INSERT INTO notificacaousuario (idnotificacao, idusuario)
            VALUES (:idnotificacao, :idusuario);
      `,
      {
        replacements: { idnotificacao: results[0].id, idusuario: usuario_id },
      }
    );
    return results[0];
  }

  async postNotificacaoPessoa(idnotificacao, idusuario) {
    const [results] = await sequelize.query(
      `
            INSERT INTO notificacaousuario (idnotificacao, idusuario)
            VALUES (:idnotificacao, :idusuario);
      `,
      {
        replacements: { idnotificacao, idusuario },
      }
    );
    return results;
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
    const query = `
    delete from notificacaousuario where idnotificacao = :notificacao_id;
    delete from notificacao where id = :notificacao_id;`;
    const [results] = await sequelize.query(query, {
      replacements: { notificacao_id },
    });

    return results[0];
  }

  async deleteNotificacaoPessoa(idnotificacao, idusuario) {
    const query = `
    delete from notificacaousuario where idnotificacao = :idnotificacao and idusuario = :idusuario;`;
    const [results] = await sequelize.query(query, {
      replacements: { idnotificacao, idusuario },
    });

    return results;
  }
}

module.exports = new NotificacaoService();

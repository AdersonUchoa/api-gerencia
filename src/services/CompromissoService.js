const sequelize = require("../database/database");
const CompromissoResponse = require("../DTO/Response/CompromissoResponse");

class CompromissoService {
  async getCompromisso(usuario_id) {
    let [results] = await sequelize.query(
      `
            SELECT 
                c.*, 
                array_agg(cl.titulo) AS classificacao,
                (select json_agg(t.*) from tarefa t where t.idcompromisso = c.id) AS tarefa,
                (select json_agg(n.*) from notificacao n where n.idcompromisso = c.id)  AS notificacao
            FROM compromisso c
            LEFT JOIN compromissoclassificacao cp ON c.id = cp.idcompromisso
            LEFT JOIN classificacao cl ON cl.id = cp.idclassificacao
            WHERE c.idUsuario = :usuario_id
            GROUP BY c.id
        `,
      {
        replacements: { usuario_id },
      }
    );

    return results;
  }

  async postComprissoAll({
    usuario_id,
    titulo,
    descricao,
    dataCompromisso,
    horario,
    classificao,
    tasks,
    notification,
  }) {
    const queryCompromisso = `
        INSERT INTO compromisso (idUsuario, titulo, descricao, dataCompromisso, horario)
        VALUES (:usuario_id, :titulo, :descricao, :dataCompromisso, :horario)
        RETURNING* 
    `;

    const [results] = await sequelize.query(queryCompromisso, {
      replacements: { usuario_id, titulo, descricao, dataCompromisso, horario },
    });

    const queryClassificacao = `
            INSERT INTO CompromissoClassificacao (idcompromisso, idclassificacao)
            VALUES (:idcompromisso, :idclassificacao)
        `;

    for (const itemClassificacao of classificao) {
      const [resultsClassificacao] = await sequelize.query(queryClassificacao, {
        replacements: {
          idcompromisso: results[0].id,
          idclassificacao: itemClassificacao,
        },
      });
    }

    const queryTarefa = `
        INSERT INTO tarefa (idCompromisso, descricao, status)
        VALUES (:idCompromisso, :descricao, :status)
    `;

    for (const itemTarefa of tasks) {
      const [resultsTarefa] = await sequelize.query(queryTarefa, {
        replacements: {
          idCompromisso: results[0].id,
          descricao: itemTarefa.descricao,
          status: itemTarefa.status,
        },
      });
    }

    const queryNotificacao = `
        INSERT INTO notificacao (idCompromisso, titulo, descricao, hora)
        VALUES (:idCompromisso, :titulo, :descricao, :hora)
        RETURNING* 
    `;

    const queryNotificacaoUsuario = `
        INSERT INTO notificacaousuario 
        (idNotificacao, idUsuario, visualizado)
        VALUES (:idNotificacao, :idUsuario, false)
    `;

    for (const itemNotificacao of notification) {
      const [resultsNotificacao] = await sequelize.query(queryNotificacao, {
        replacements: {
          idCompromisso: results[0].id,
          titulo: itemNotificacao.titulo,
          descricao: itemNotificacao.descricao,
          hora: itemNotificacao.hora,
        },
      });

      const [resultsNotificacaoUsuario] = await sequelize.query(
        queryNotificacaoUsuario,
        {
          replacements: {
            idNotificacao: resultsNotificacao[0].id,
            idUsuario: usuario_id,
          },
        }
      );
    }

    return [results];
  }
  async postCompromisso(
    usuario_id,
    titulo,
    descricao,
    dataCompromisso,
    horario,
    classificacoes
  ) {
    const query = `
            INSERT INTO compromisso (idUsuario, titulo, descricao, dataCompromisso, horario)
            VALUES (:usuario_id, :titulo, :descricao, :dataCompromisso, :horario)
            RETURNING*`;
    const [results] = await sequelize.query(query, {
      replacements: { usuario_id, titulo, descricao, dataCompromisso, horario },
    });

    const queryClassificacao = `
            INSERT INTO CompromissoClassificacao (idcompromisso, idclassificacao)
            VALUES (:idcompromisso, :idclassificacao)
        `;

    for (const classificacao of classificacoes) {
      const [resultsClassificacao] = await sequelize.query(queryClassificacao, {
        replacements: {
          idcompromisso: results[0].id,
          idclassificacao: classificacao,
        },
      });
    }

    return results[0];
  }

  async putCompromisso(
    compromisso_id,
    usuario_id,
    titulo,
    descricao,
    datacompromisso,
    horario
  ) {
    const query = `
            UPDATE compromisso
            SET idUsuario = :usuario_id, titulo = :titulo, descricao = :descricao, datacompromisso = :datacompromisso, horario = :horario
            WHERE id = :compromisso_id
            RETURNING*`;
    const [results] = await sequelize.query(query, {
      replacements: {
        compromisso_id,
        usuario_id,
        titulo,
        descricao,
        datacompromisso,
        horario,
      },
    });
    return results[0];
  }

  async deleteCompromisso(compromisso_id) {
    const query = `
      delete from compromissoclassificacao where idcompromisso = :compromisso_id;
      delete from notificacaousuario where idnotificacao in (
        select id from notificacao where idcompromisso = :compromisso_id
      );
      delete from notificacao where idcompromisso = :compromisso_id;
      delete from tarefa where idcompromisso = :compromisso_id; 
      delete from compromisso where id = :compromisso_id;
    `;
    const [results] = await sequelize.query(query, {
      replacements: { compromisso_id },
    });

    return results[0];
  }
}

module.exports = new CompromissoService();

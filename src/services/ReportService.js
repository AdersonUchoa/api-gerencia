const sequelize = require("../database/database");

class ReportService {
    async getReport(dtInicio, dtFim, idUsuario) {
        const query = `
            select count(*) 
            from compromisso c
            join tarefa t on c.id = t.idCompromisso
            where c.dataCompromisso BETWEEN :dtInicio and :dtFim 
            and status = :status      
            and idUsuario = :idUsuario
        `

        const [resultsAndamento] = await sequelize.query(query, {
            replacements: {
                dtInicio: dtInicio,
                dtFim: dtFim,
                status: 1,
                idUsuario: idUsuario
            }
        });

        const [resultsPendente] = await sequelize.query(query, {
            replacements: {
                dtInicio: dtInicio,
                dtFim: dtFim,
                status: 2,
                idUsuario: idUsuario
            }
        });
        const [resultsConcluido] = await sequelize.query(query, {
            replacements: {
                dtInicio: dtInicio,
                dtFim: dtFim,
                status: 3,
                idUsuario: idUsuario
            }
        });
        const [resultsCancelado] = await sequelize.query(query, {
            replacements: {
                dtInicio: dtInicio,
                dtFim: dtFim,
                status: 4,
                idUsuario: idUsuario
            }
        }); 
        const response = {
            andamento: resultsAndamento,
            pendente: resultsPendente,
            concluido: resultsConcluido,
            cancelado: resultsCancelado,
        }
        return response;
    }

}

module.exports = new ReportService();
const sequelize = require("../database/database");
const CompromissoResponse = require("../DTO/Response/CompromissoResponse");

class CompromissoService {
    async getCompromisso(usuario_id) { 
        let [results] = await sequelize.query(
            "SELECT * FROM compromisso WHERE idUsuario = :usuario_id", 
            { replacements: { usuario_id } }
        );
    
        for (let i = 0; i < results.length; i++) {
            const [responseJoin] = await sequelize.query(
                "SELECT * FROM classificacao c JOIN compromissoclassificacao cp ON c.id = cp.idclassificacao WHERE cp.idcompromisso = :idcompromisso", 
                { replacements: { idcompromisso: results[i].id } }
            );
    
            const classificacaoObj = responseJoin.map(C => C.titulo);
            results[i].classificacao = classificacaoObj; 
        }
    
        console.log(results);   
        const response = results.map(CompromissoResponse.fromModel);
        return response;
    }
    
    async postCompromisso(usuario_id, titulo, descricao, dataCompromisso, horario, classificacoes){
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

        for(const classificacao of classificacoes) {
            const [resultsClassificacao] = await sequelize.query(queryClassificacao, { 
                replacements: { idcompromisso: results[0].id, idclassificacao: classificacao }
            })
        }
        
        return results[0]
    }

    async putCompromisso(compromisso_id, usuario_id, titulo, descricao, dataCompromisso, horario){
        const query = `
            UPDATE compromisso
            SET idUsuario = :usuario_id, titulo = :titulo, descricao = :descricao, dataCompromisso = :dataCompromisso, horario = :horario
            WHERE id = :compromisso_id
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
        const query = `DELETE FROM compromisso WHERE id = :compromisso_id RETURNING*`;
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
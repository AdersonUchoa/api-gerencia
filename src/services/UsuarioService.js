const sequelize = require("../database/database");
const UsuarioResponse = require("../DTO/Response/UsuarioResponse");

class UsuarioService {
    async getUsuario() {
        const [results] = await sequelize.query("SELECT * FROM usuario");
        const response = results.map(UsuarioResponse.fromModel);
        return response;
    }

    async postUsuario(nome, senha){
        const query = `
            INSERT INTO usuario (nome, senha)
            VALUES (:nome, :senha)
            RETURNING*`;
        const [results] = await sequelize.query(query, { 
            replacements: { nome, senha },
        });

        return results[0]
    }

    async putUsuario(usuario_id, nome, senha){
        const query = `
            UPDATE usuario
            SET nome = :nome, senha = :senha
            WHERE id = :usuario_id
            RETURNING*`;
        const [results] = await sequelize.query(query, {
            replacements: { usuario_id, nome, senha },
        });

        if (results.length === 0) {
            throw Error("Usuário não encontrado!");
        }

        return results[0];
    }

    async deleteUsuario(usuario_id){
        const query = `DELETE FROM usuario WHERE id = :usuario_id RETURNING*`;
        const [results] = await sequelize.query(query, {
            replacements: { usuario_id },
        });

        if(results.length === 0){
            throw Error("Usuário não encontrado!");
        }

        return results[0];
    }
}

module.exports = new UsuarioService();
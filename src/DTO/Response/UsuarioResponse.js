class UsuarioResponse {
    constructor({ usuario_id, nome, senha}) {
        this.usuario_id = usuario_id;
        this.nome = nome;
        this.senha = senha;
    }

    static fromModel(obj){
        return {
            nome: obj.nome,
            senha: obj.senha
        };
    }
}

module.exports = UsuarioResponse;
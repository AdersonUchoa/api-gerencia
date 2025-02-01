class UsuarioResponse {
    constructor({ id, nome, senha}) {
        this.id = id;
        this.nome = nome;
        this.senha = senha;
    }

    static fromModel(obj){
        return {
            id: obj.id,
            nome: obj.nome,
            senha: obj.senha
        };
    }
}

module.exports = UsuarioResponse;
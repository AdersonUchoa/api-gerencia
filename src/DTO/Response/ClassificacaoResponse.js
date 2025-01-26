class ClassificacaoResponse{
    constructor({ classificacao_id, usuario_id, titulo }) {
        this.classificacao_id = classificacao_id;
        this.usuario_id = usuario_id;
        this.titulo = titulo;
    }

    static fromModel(obj){
        return{
            usuario_id: obj.usuario_id,
            titulo: obj.titulo
        }
    }
}

module.exports = ClassificacaoResponse;
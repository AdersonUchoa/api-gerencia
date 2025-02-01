class ClassificacaoResponse{
    constructor({ id, usuario_id, titulo }) {
        this.id = id;
        this.usuario_id = usuario_id;
        this.titulo = titulo;
    }

    static fromModel(obj){
        return{
            id: obj.id,
            usuario_id: obj.usuario_id,
            titulo: obj.titulo
        }
    }
}

module.exports = ClassificacaoResponse;
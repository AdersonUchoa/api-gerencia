class NotificacaoResponse {
    constructor({ id, compromisso_id, titulo, descricao, hora, visualizado }) {
        this.id = id;
        this.compromisso_id = compromisso_id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.hora = hora;
        this.visualizado = visualizado;
    }

    static fromModel(obj){
        return {
            id: obj.id,
            compromisso_id: obj.compromisso_id,
            titulo: obj.titulo,
            descricao: obj.descricao,
            hora: obj.hora,
            visualizado: obj.visualizado,
        }
    }
}

module.exports = NotificacaoResponse;
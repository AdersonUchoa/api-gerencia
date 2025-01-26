class NotificacaoResponse {
    constructor({ notificacao_id, compromisso_id, titulo, descricao }) {
        this.notificacao_id = notificacao_id;
        this.compromisso_id = compromisso_id;
        this.titulo = titulo;
        this.descricao = descricao;
    }

    static fromModel(obj){
        return {
            compromisso_id: obj.compromisso_id,
            titulo: obj.titulo,
            descricao: obj.descricao
        }
    }
}

module.exports = NotificacaoResponse;
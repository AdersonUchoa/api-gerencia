class TarefaResponse {
    constructor({ id, compromisso_id, descricao, status, dataconclusao }) {
        this.id = id;
        this.compromisso_id = compromisso_id;
        this.descricao = descricao;
        this.status = status;
        this.dataconclusao = dataconclusao;
    }

    static fromModel(obj){
        return{
            id: obj.id,
            compromisso_id: obj.compromisso_id,
            descricao: obj.descricao,
            status: obj.status,
            dataconclusao: obj.dataconclusao
        };
    }
}

module.exports = TarefaResponse;
class TarefaResponse {
    constructor({ tarefa_id, compromisso_id, descricao, status, dataConclusao }) {
        this.tarefa_id = tarefa_id;
        this.compromisso_id = compromisso_id;
        this.descricao = descricao;
        this.status = status;
        this.dataConclusao = dataConclusao;
    }

    static fromModel(obj){
        return{
            compromisso_id: obj.compromisso_id,
            descricao: obj.descricao,
            status: obj.status,
            dataConclusao: obj.dataConclusao
        };
    }
}

module.exports = TarefaResponse;
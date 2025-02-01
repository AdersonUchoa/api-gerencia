class CompromissoResponse {
    constructor({ id, usuario_id, titulo, descricao, datacompromisso, horario }) {
        this.id = id;
        this.usuario_id = usuario_id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.datacompromisso = datacompromisso;
        this.horario = horario;
    }

    static fromModel(obj){
        return {
            id: obj.id,
            usuario_id: obj.usuario_id,
            titulo: obj.titulo,
            descricao: obj.descricao,
            datacompromisso: obj.datacompromisso,
            horario: obj.horario
        }
    }
}

module.exports = CompromissoResponse;
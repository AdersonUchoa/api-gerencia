class CompromissoResponse {
    constructor({ compromisso_id, usuario_id, titulo, descricao, dataCompromisso, horario }) {
        this.compromisso_id = compromisso_id;
        this.usuario_id = usuario_id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.dataCompromisso = dataCompromisso;
        this.horario = horario;
    }

    static fromModel(obj){
        return {
            usuario_id: obj.usuario_id,
            titulo: obj.titulo,
            descricao: obj.descricao,
            dataCompromisso: obj.dataCompromisso,
            horario: obj.horario
        }
    }
}

module.exports = CompromissoResponse;
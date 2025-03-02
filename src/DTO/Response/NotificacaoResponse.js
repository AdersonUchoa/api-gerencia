class NotificacaoResponse {
  constructor({
    idnotificacao,
    idusuario,
    titulo,
    descricao,
    hora,
    visualizado,
  }) {
    this.idnotificacao = idnotificacao;
    (this.idusuario = idusuario), (this.titulo = titulo);
    this.descricao = descricao;
    this.hora = hora;
    this.visualizado = visualizado;
  }

  static fromModel(obj) {
    return {
      idnotificacao: obj.idnotificacao,
      idusuario: obj.idusuario,
      titulo: obj.titulo,
      descricao: obj.descricao,
      hora: obj.hora,
      visualizado: obj.visualizado,
    };
  }
}

module.exports = NotificacaoResponse;

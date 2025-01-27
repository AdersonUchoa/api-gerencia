class LoginRequest {
    constructor({ nome, senha }) {
        (this.nome = nome), (this.senha = senha);
    }
}
  
module.exports = LoginRequest;
  
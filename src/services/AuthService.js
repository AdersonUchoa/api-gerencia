const { QueryTypes } = require("sequelize");
const sequelize = require("../database/database");
const LoginRequest = require("../DTO/Request/postLoginRequest");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class AuthService {
  async postLogin(req, res) {
    const loginDTO = new LoginRequest(req.body);
    const query = await sequelize.query(
      `
        select * from usuario where nome = :nome
    `,
      {
        replacements: { nome: loginDTO.nome },
        type: QueryTypes.SELECT,
      }
    );
    const user = query[0];
    console.log(query);
    if (user.senha === loginDTO.senha) {
      const tokenObj = {
        nome: user.nome,
        usuario_id: user.id,
      };
      return jwt.sign(tokenObj, process.env.JWT_SECURE, { expiresIn: 3000 });
    }
    return null;
  }
}

module.exports = new AuthService();

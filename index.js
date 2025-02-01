const express = require("express");
const sequelize = require("./src/database/database");
const { verifyAuth } = require("./src/middleware/auth");
const app = express();
const PORT = 3000;
const cors = require("cors");

const AuthRouter = require("./src/routers/AuthRouter");
const ClassificacaoRouter = require("./src/routers/ClassificacaoRouter");
const CompromissoRouter = require("./src/routers/CompromissoRouter");
const NotificacaoRouter = require("./src/routers/NotificacaoRouter");
const TarefaRouter = require("./src/routers/TarefaRouter");
const UsuarioRouter = require("./src/routers/UsuarioRouter");

app.use(cors());
app.use(express.json());
app.use(AuthRouter);
app.use(ClassificacaoRouter);
app.use(CompromissoRouter);
app.use(NotificacaoRouter);
app.use(TarefaRouter);
app.use(UsuarioRouter);


// Rota para a raiz
app.get("/", (req, res) => {
  res.send("Bem-vindo à API!");
});

// Rota de teste para o banco de dados
app.get("/teste", verifyAuth, async (req, res) => {
  try {
    await sequelize.authenticate();
    res.status(200).json({ message: "Conexão com o banco está OK!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao conectar com o banco!", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
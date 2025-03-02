const express = require("express");
const sequelize = require("./src/database/database");
const { verifyAuth } = require("./src/middleware/auth");
const app = express();
const PORT = 3000;
const cors = require("cors");
const nodemailer = require("nodemailer");

const AuthRouter = require("./src/routers/AuthRouter");
const ClassificacaoRouter = require("./src/routers/ClassificacaoRouter");
const CompromissoRouter = require("./src/routers/CompromissoRouter");
const NotificacaoRouter = require("./src/routers/NotificacaoRouter");
const TarefaRouter = require("./src/routers/TarefaRouter");
const UsuarioRouter = require("./src/routers/UsuarioRouter");
const ReportRouter = require("./src/routers/ReportRouter");

app.use(cors());
app.use(express.json());
app.use(AuthRouter);
app.use(ClassificacaoRouter);
app.use(CompromissoRouter);
app.use(NotificacaoRouter);
app.use(TarefaRouter);
app.use(UsuarioRouter);
app.use(ReportRouter);

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

const transporter = nodemailer.createTransport({
  host: "smtp.mailersend.net",
  port: 587,
  secure: false,
  auth: {
    user: "MS_vFTTI2@trial-3vz9dlen93plkj50.mlsender.net", // Seu e-mail do Outlook/Hotmail/Office365
    pass: "mssp.KghwuwV.pr9084z1yn8gw63d.W1kaJL8", // Senha do e-mail (ou senha de aplicativo)
  },
});

transporter.sendMail({
  from: "MS_vFTTI2@trial-3vz9dlen93plkj50.mlsender.net",
  to: "iamuchoa@gmail.com",
  subject: "Teste de envio de e-mail",
  text: "Ola, tudo bem?",
});

setInterval(async () => {
  try {
    await sequelize.query(`
        SELECT n.id, n.titulo, n.descricao, u.email
        FROM notificacao n
        JOIN notificacaousuario nu ON n.id = nu.idnotificacao
        JOIN usuario u ON nu.idusuario = u.id
        WHERE nu.notificado = false
    `);
  } catch (error) {
    console.log(`Erro ao enviar um email: ${error}`);
  }
}, 3000);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

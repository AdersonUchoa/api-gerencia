const express = require("express");
const sequelize = require("./src/database/database");
const app = express();
const PORT = 3000;

app.use(express.json());


// Rota para a raiz
app.get("/", (req, res) => {
  res.send("Bem-vindo à API!");
});

// Rota de teste para o banco de dados
app.get("/teste", async (req, res) => {
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
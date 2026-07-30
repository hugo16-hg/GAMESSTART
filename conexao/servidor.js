const express = require ("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const conexao = require("./conexao");

//criar uma rota para testar a conexão com o 
// banco de dados
const clienteRotas = require("../routes/clientes_routes.js");
app.use("/clientes", clienteRotas);






app.listen(3000, ()=> {
    console.log("Servidor iniciado!");
}); 
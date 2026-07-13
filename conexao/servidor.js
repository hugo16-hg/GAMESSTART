const express = require ("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const conexao = require("./conexao");

app.listen(3000, ()=> {
    console.log("Servidor iniciado!");
}); 
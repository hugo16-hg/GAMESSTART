const mysql2 = require('mysql2');
const conexao = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: "GAMESSTART"
});
conexao.connect((erro) => {

    if (erro) {
        console.log("Erro ao se conectar:", erro);
        return;
    }
    console.log("Conexão com o banco de dados bem-sucedida!");
});

module.exports = conexao;
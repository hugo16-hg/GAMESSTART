const mysql2 = require('mysql2');
const conexao = mysql2.createConnection({
    host: 'sakura.proxy.rlwy.net',
    user: 'root',
    password: "ONLRohOwedhGsZoeTYhoNMMSlSgImXSW",
    port: 30453,
    database: "railway"
});
conexao.connect((erro) => {

    if (erro) {
        console.log("Erro ao se conectar:", erro);
        return;
    }
    console.log("Conexão com o banco de dados bem-sucedida!");
});

module.exports = conexao;
const conexao = require("../conexao/conexao.js");

// =========================
// Cadastrar Cliente
// =========================

function cadastrar(cliente, callback) {

    const sql = `INSERT INTO Cliente
        ( nome,cpf,telefone,email,senha,
         data_nascimento,Loja_id_Loja )
        VALUES (?, ?, ?, ?, ?, ?, ?)`;

    conexao.query(
        sql,
        [
            cliente.nome,
            cliente.cpf,
            cliente.telefone,
            cliente.email,
            cliente.senha,
            cliente.data_nascimento,
            cliente.Loja_id_Loja
        ],
        callback
    );

}

// =========================
// Listar Clientes
// =========================

function listar(callback) {

    const sql = `
        SELECT * FROM Cliente
    `;

    conexao.query(sql, callback);

}

// =========================
// Buscar por ID
// =========================

function buscarPorId(id, callback) {

    const sql = `
        SELECT *
        FROM Cliente
        WHERE idCliente = ?
    `;

    conexao.query(sql, [id], callback);

}

// =========================
// Buscar por Email
// =========================

function buscarPorEmail(email, callback) {

    const sql = `
        SELECT * FROM Cliente
        WHERE email = ?
    `;

    conexao.query(sql, [email], callback);

}

// =========================
// Atualizar Cliente
// =========================

function atualizar(id, cliente, callback) {

    const sql = `
        UPDATE Cliente
        SET

            nome = ?,
            cpf = ?,
            telefone = ?,
            email = ?,
            senha = ?,
            data_nascimento = ?,
            Loja_id_Loja = ?

        WHERE idCliente = ?
    `;

    conexao.query(
        sql,
        [
            cliente.nome,
            cliente.cpf,
            cliente.telefone,
            cliente.email,
            cliente.senha,
            cliente.data_nascimento,
            cliente.Loja_id_Loja,
            id
        ],
        callback
    );

}

// =========================
// Excluir Cliente
// =========================

function excluir(id, callback) {

    const sql = `
        DELETE FROM Cliente
        WHERE idCliente = ?
    `;

    conexao.query(sql, [id], callback);

}

module.exports = {

    cadastrar,
    listar,
    buscarPorId,
    buscarPorEmail,
    atualizar,
    excluir

};
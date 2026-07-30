const conexao = require("../conexao/conexao.js");

// =========================
// Cadastrar Cliente
// =========================

function cadastrar(cliente, callback) {

    const sql = `INSERT INTO cliente
        ( nome,cpf,telefone,email,senha,
         data_nascimento,Loja_idloja )
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
            cliente.Loja_idloja
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
            Loja_idloja = ?

        WHERE id_cliente = ?
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
            cliente.Loja_idloja,
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
        WHERE id_cliente = ?
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
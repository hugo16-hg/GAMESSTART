const conexao = require("../conexao/conexao.js");

// =========================
// Cadastrar Forma de Pagamento
// =========================

function cadastrar(formaPagamento, callback) {

    const sql = `
        INSERT INTO Forma_Pagamento
        (
            nome,
            link,
            ativo
        )
        VALUES (?, ?, ?)
    `;

    conexao.query(
        sql,
        [
            formaPagamento.nome,
            formaPagamento.link,
            formaPagamento.ativo
        ],
        callback
    );

}

// =========================
// Listar Formas de Pagamento
// =========================

function listar(callback) {

    const sql = `
        SELECT *
        FROM Forma_Pagamento
    `;

    conexao.query(sql, callback);

}

// =========================
// Buscar por ID
// =========================

function buscarPorId(id, callback) {

    const sql = `
        SELECT *
        FROM Forma_Pagamento
        WHERE id_forma_pagamento = ?
    `;

    conexao.query(sql, [id], callback);

}

// =========================
// Buscar por Nome
// =========================

function buscarPorNome(nome, callback) {

    const sql = `
        SELECT *
        FROM Forma_Pagamento
        WHERE nome LIKE ?
    `;

    conexao.query(sql, [`%${nome}%`], callback);

}

// =========================
// Listar Formas Ativas
// =========================

function listarAtivas(callback) {

    const sql = `
        SELECT *
        FROM Forma_Pagamento
        WHERE ativo = TRUE
    `;

    conexao.query(sql, callback);

}

// =========================
// Atualizar Forma de Pagamento
// =========================

function atualizar(id, formaPagamento, callback) {

    const sql = `
        UPDATE Forma_Pagamento
        SET
            nome = ?,
            link = ?,
            ativo = ?
        WHERE id_forma_pagamento = ?
    `;

    conexao.query(
        sql,
        [
            formaPagamento.nome,
            formaPagamento.link,
            formaPagamento.ativo,
            id
        ],
        callback
    );

}

// =========================
// Excluir Forma de Pagamento
// =========================

function excluir(id, callback) {

    const sql = `
        DELETE FROM Forma_Pagamento
        WHERE id_forma_pagamento = ?
    `;

    conexao.query(sql, [id], callback);

}

module.exports = {
    cadastrar,
    listar,
    buscarPorId,
    buscarPorNome,
    listarAtivas,
    atualizar,
    excluir
};
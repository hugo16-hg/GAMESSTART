const conexao = require("../conexao/conexao.js");


//==========================================
// CADASTRAR CARTÃO
//==========================================

function cadastrar(cartao, callback) {

    const sql = `
        INSERT INTO Cartao_Pagamento
        (
            numero,
            data_vencimento,
            cvc,
            cpf,
            nome_proprietario,
            nome_identificacao,
            bandeira,
            tipo,
            ativo,
            Cliente_id_cliente
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    conexao.query(
        sql,
        [
            cartao.numero,
            cartao.data_vencimento,
            cartao.cvc,
            cartao.cpf,
            cartao.nome_proprietario,
            cartao.nome_identificacao,
            cartao.bandeira,
            cartao.tipo,
            cartao.ativo,
            cartao.Cliente_id_cliente
        ],
        callback
    );
}


//==========================================
// LISTAR CARTÕES
//==========================================

function listar(callback) {

    const sql = `
        SELECT *
        FROM Cartao_Pagamento
    `;

    conexao.query(sql, callback);
}


//==========================================
// BUSCAR POR ID
//==========================================

function buscarPorId(id, callback) {

    const sql = `
        SELECT *
        FROM Cartao_Pagamento
        WHERE id_cartao_pagamento = ?
    `;

    conexao.query(sql, [id], callback);
}


//==========================================
// LISTAR POR CLIENTE
//==========================================

function listarPorCliente(idCliente, callback) {

    const sql = `
        SELECT *
        FROM Cartao_Pagamento
        WHERE Cliente_id_cliente = ?
    `;

    conexao.query(
        sql,
        [idCliente],
        callback
    );
}


//==========================================
// LISTAR CARTÕES ATIVOS
//==========================================

function listarAtivos(callback) {

    const sql = `
        SELECT *
        FROM Cartao_Pagamento
        WHERE ativo = TRUE
    `;

    conexao.query(sql, callback);
}


//==========================================
// ATUALIZAR CARTÃO
//==========================================

function atualizar(id, cartao, callback) {

    const sql = `
        UPDATE Cartao_Pagamento
        SET
            numero = ?,
            data_vencimento = ?,
            cvc = ?,
            cpf = ?,
            nome_proprietario = ?,
            nome_identificacao = ?,
            bandeira = ?,
            tipo = ?,
            ativo = ?,
            Cliente_id_cliente = ?
        WHERE id_cartao_pagamento = ?
    `;

    conexao.query(
        sql,
        [
            cartao.numero,
            cartao.data_vencimento,
            cartao.cvc,
            cartao.cpf,
            cartao.nome_proprietario,
            cartao.nome_identificacao,
            cartao.bandeira,
            cartao.tipo,
            cartao.ativo,
            cartao.Cliente_id_cliente,
            id
        ],
        callback
    );
}


//==========================================
// EXCLUIR CARTÃO
//==========================================

function excluir(id, callback) {

    const sql = `
        DELETE FROM Cartao_Pagamento
        WHERE id_cartao_pagamento = ?
    `;

    conexao.query(sql, [id], callback);
}


//==========================================
// EXPORTAÇÃO
//==========================================

module.exports = {
    cadastrar,
    listar,
    buscarPorId,
    listarPorCliente,
    listarAtivos,
    atualizar,
    excluir
};
const conexao = require("../conexao/conexao.js");

// =========================
// Cadastrar Cartão de Pagamento
// =========================

function cadastrar(cartao, callback) {

    const sql = `
        INSERT INTO Cartao_pagamento
        (
            numero,
            data_vencimento,
            cvc,
            cpf,
            nome_proprietario,
            nome_indentificacao,
            bandereira,
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
            cartao.nome_indentificacao,
            cartao.bandereira,
            cartao.tipo,
            cartao.ativo,
            cartao.Cliente_id_cliente
        ],
        callback
    );

}

// =========================
// Listar Cartões
// =========================

function listar(callback) {

    const sql = `
        SELECT *
        FROM Cartao_pagamento
    `;

    conexao.query(sql, callback);

}

// =========================
// Buscar Cartão por ID
// =========================

function buscarPorId(id, callback) {

    const sql = `
        SELECT *
        FROM Cartao_pagamento
        WHERE id_cartao_pagamento = ?
    `;

    conexao.query(sql, [id], callback);

}

// =========================
// Listar Cartões por Cliente
// =========================

function listarPorCliente(idCliente, callback) {

    const sql = `
        SELECT *
        FROM Cartao_pagamento
        WHERE Cliente_id_cliente = ?
    `;

    conexao.query(sql, [idCliente], callback);

}

// =========================
// Listar Cartões Ativos
// =========================

function listarAtivos(callback) {

    const sql = `
        SELECT *
        FROM Cartao_pagamento
        WHERE ativo = TRUE
    `;

    conexao.query(sql, callback);

}

// =========================
// Atualizar Cartão
// =========================

function atualizar(id, cartao, callback) {

    const sql = `
        UPDATE Cartao_pagamento
        SET
            numero = ?,
            data_vencimento = ?,
            cvc = ?,
            cpf = ?,
            nome_proprietario = ?,
            nome_indentificacao = ?,
            bandereira = ?,
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
            cartao.nome_indentificacao,
            cartao.bandeira,
            cartao.tipo,
            cartao.ativo,
            cartao.Cliente_id_cliente,
            id
        ],
        callback
    );

}

// =========================
// Excluir Cartão
// =========================

function excluir(id, callback) {

    const sql = `
        DELETE FROM Cartao_pagamento
        WHERE id_cartao_pagamento = ?
    `;

    conexao.query(sql, [id], callback);

}

module.exports = {
    cadastrar,
    listar,
    buscarPorId,
    listarPorCliente,
    listarAtivos,
    atualizar,
    excluir
};
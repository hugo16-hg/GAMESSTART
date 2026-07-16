const conexao = require("../conexao/conexao.js");

// =========================
// Cadastrar Frete
// =========================

function cadastrar(frete, callback) {

    const sql = `
        INSERT INTO Frete
        (
            valor,
            tipo,
            bairro,
            entrega_full,
            codigo_rastreio,
            Pedidos_id_pedidos
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    conexao.query(
        sql,
        [
            frete.valor,
            frete.tipo,
            frete.bairro,
            frete.entrega_full,
            frete.codigo_rastreio,
            frete.Pedidos_id_pedidos
        ],
        callback
    );

}

// =========================
// Listar Fretes
// =========================

function listar(callback) {

    const sql = `
        SELECT *
        FROM Frete
    `;

    conexao.query(sql, callback);

}

// =========================
// Buscar Frete por ID
// =========================

function buscarPorId(id, callback) {

    const sql = `
        SELECT *
        FROM Frete
        WHERE id_frete = ?
    `;

    conexao.query(sql, [id], callback);

}

// =========================
// Buscar Frete por Pedido
// =========================

function buscarPorPedido(idPedido, callback) {

    const sql = `
        SELECT *
        FROM Frete
        WHERE Pedidos_id_pedidos = ?
    `;

    conexao.query(sql, [idPedido], callback);

}

// =========================
// Buscar por Código de Rastreio
// =========================

function buscarPorCodigoRastreio(codigo, callback) {

    const sql = `
        SELECT *
        FROM Frete
        WHERE codigo_rastreio = ?
    `;

    conexao.query(sql, [codigo], callback);

}

// =========================
// Listar Entregas Full
// =========================

function listarEntregaFull(callback) {

    const sql = `
        SELECT *
        FROM Frete
        WHERE entrega_full = TRUE
    `;

    conexao.query(sql, callback);

}

// =========================
// Atualizar Frete
// =========================

function atualizar(id, frete, callback) {

    const sql = `
        UPDATE Frete
        SET
            valor = ?,
            tipo = ?,
            bairro = ?,
            entrega_full = ?,
            codigo_rastreio = ?,
            Pedidos_id_pedidos = ?
        WHERE id_frete = ?
    `;

    conexao.query(
        sql,
        [
            frete.valor,
            frete.tipo,
            frete.bairro,
            frete.entrega_full,
            frete.codigo_rastreio,
            frete.Pedidos_id_pedidos,
            id
        ],
        callback
    );

}

// =========================
// Excluir Frete
// =========================

function excluir(id, callback) {

    const sql = `
        DELETE FROM Frete
        WHERE id_frete = ?
    `;

    conexao.query(sql, [id], callback);

}

module.exports = {
    cadastrar,
    listar,
    buscarPorId,
    buscarPorPedido,
    buscarPorCodigoRastreio,
    listarEntregaFull,
    atualizar,
    excluir
};
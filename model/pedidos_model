const conexao = require("../conexao/conexao.js");

// =========================
// Cadastrar Pedido
// =========================

function cadastrar(pedido, callback) {

    const sql = `
        INSERT INTO Pedidos
        (
            data_pedido,
            data_entrega,
            nota_fiscal,
            statutos_entrega,
            statutos_pagamento,
            codigo,
            Cliente_id_cliente,
            Loja_id_loja,
            Endereco_id_endereco,
            Forma_pagamento_id_forma_pagamento
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    conexao.query(
        sql,
        [
            pedido.data_pedido,
            pedido.data_entrega,
            pedido.nota_fiscal,
            pedido.statutos_entrega,
            pedido.statutos_pagamento,
            pedido.codigo,
            pedido.Cliente_id_cliente,
            pedido.Loja_id_loja,
            pedido.Endereco_id_endereco,
            pedido.Forma_pagamento_id_forma_pagamento
        ],
        callback
    );

}

// =========================
// Listar Pedidos
// =========================

function listar(callback) {

    const sql = `
        SELECT *
        FROM Pedidos
    `;

    conexao.query(sql, callback);

}

// =========================
// Buscar Pedido por ID
// =========================

function buscarPorId(id, callback) {

    const sql = `
        SELECT *
        FROM Pedidos
        WHERE id_pedidos = ?
    `;

    conexao.query(sql, [id], callback);

}

// =========================
// Buscar Pedido por Código
// =========================

function buscarPorCodigo(codigo, callback) {

    const sql = `
        SELECT *
        FROM Pedidos
        WHERE codigo = ?
    `;

    conexao.query(sql, [codigo], callback);

}

// =========================
// Listar Pedidos por Cliente
// =========================

function listarPorCliente(idCliente, callback) {

    const sql = `
        SELECT *
        FROM Pedidos
        WHERE Cliente_id_cliente = ?
    `;

    conexao.query(sql, [idCliente], callback);

}

// =========================
// Listar Pedidos por Loja
// =========================

function listarPorLoja(idLoja, callback) {

    const sql = `
        SELECT *
        FROM Pedidos
        WHERE Loja_id_loja = ?
    `;

    conexao.query(sql, [idLoja], callback);

}

// =========================
// Buscar por Status de Entrega
// =========================

function listarPorStatusEntrega(status, callback) {

    const sql = `
        SELECT *
        FROM Pedidos
        WHERE statutos_entrega = ?
    `;

    conexao.query(sql, [status], callback);

}

// =========================
// Buscar por Status de Pagamento
// =========================

function listarPorStatusPagamento(status, callback) {

    const sql = `
        SELECT *
        FROM Pedidos
        WHERE statutos_pagamento = ?
    `;

    conexao.query(sql, [status], callback);

}

// =========================
// Atualizar Pedido
// =========================

function atualizar(id, pedido, callback) {

    const sql = `
        UPDATE Pedidos
        SET
            data_pedido = ?,
            data_entrega = ?,
            nota_fiscal = ?,
            statutos_entrega = ?,
            statutos_pagamento = ?,
            codigo = ?,
            Cliente_id_cliente = ?,
            Loja_id_loja = ?,
            Endereco_id_endereco = ?,
            Forma_pagamento_id_forma_pagamento = ?
        WHERE id_pedidos = ?
    `;

    conexao.query(
        sql,
        [
            pedido.data_pedido,
            pedido.data_entrega,
            pedido.nota_fiscal,
            pedido.statutos_entrega,
            pedido.statutos_pagamento,
            pedido.codigo,
            pedido.Cliente_id_cliente,
            pedido.Loja_id_loja,
            pedido.Endereco_id_endereco,
            pedido.Forma_pagamento_id_forma_pagamento,
            id
        ],
        callback
    );

}

// =========================
// Excluir Pedido
// =========================

function excluir(id, callback) {

    const sql = `
        DELETE FROM Pedidos
        WHERE id_pedidos = ?
    `;

    conexao.query(sql, [id], callback);

}

module.exports = {
    cadastrar,
    listar,
    buscarPorId,
    buscarPorCodigo,
    listarPorCliente,
    listarPorLoja,
    listarPorStatusEntrega,
    listarPorStatusPagamento,
    atualizar,
    excluir
};
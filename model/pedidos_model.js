const conexao = require("../conexao/conexao.js");


//==========================================
// CADASTRAR PEDIDO
//==========================================

function cadastrar(pedido, callback) {

    const sql = `
        INSERT INTO Pedidos
        (
            data_pedido,
            data_entrega,
            nota_fiscal,
            status_entrega,
            status_pagamento,
            codigo,
            Cliente_id_cliente,
            Loja_id_loja,
            Endereco_id_endereco,
            Forma_Pagamento_id_forma_pagamento
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    conexao.query(
        sql,
        [
            pedido.data_pedido,
            pedido.data_entrega,
            pedido.nota_fiscal,
            pedido.status_entrega,
            pedido.status_pagamento,
            pedido.codigo,
            pedido.Cliente_id_cliente,
            pedido.Loja_id_loja,
            pedido.Endereco_id_endereco,
            pedido.Forma_Pagamento_id_forma_pagamento
        ],
        callback
    );
}


//==========================================
// LISTAR PEDIDOS
//==========================================

function listar(callback) {

    const sql = `
        SELECT *
        FROM Pedidos
    `;

    conexao.query(sql, callback);
}


//==========================================
// BUSCAR PEDIDO POR ID
//==========================================

function buscarPorId(id, callback) {

    const sql = `
        SELECT *
        FROM Pedidos
        WHERE id_pedidos = ?
    `;

    conexao.query(sql, [id], callback);
}


//==========================================
// BUSCAR PEDIDO POR CÓDIGO
//==========================================

function buscarPorCodigo(codigo, callback) {

    const sql = `
        SELECT *
        FROM Pedidos
        WHERE codigo = ?
    `;

    conexao.query(sql, [codigo], callback);
}


//==========================================
// LISTAR PEDIDOS POR CLIENTE
//==========================================

function listarPorCliente(idCliente, callback) {

    const sql = `
        SELECT *
        FROM Pedidos
        WHERE Cliente_id_cliente = ?
    `;

    conexao.query(sql, [idCliente], callback);
}


//==========================================
// LISTAR PEDIDOS POR LOJA
//==========================================

function listarPorLoja(idLoja, callback) {

    const sql = `
        SELECT *
        FROM Pedidos
        WHERE Loja_id_loja = ?
    `;

    conexao.query(sql, [idLoja], callback);
}


//==========================================
// LISTAR POR STATUS DE ENTREGA
//==========================================

function listarPorStatusEntrega(status, callback) {

    const sql = `
        SELECT *
        FROM Pedidos
        WHERE status_entrega = ?
    `;

    conexao.query(sql, [status], callback);
}


//==========================================
// LISTAR POR STATUS DE PAGAMENTO
//==========================================

function listarPorStatusPagamento(status, callback) {

    const sql = `
        SELECT *
        FROM Pedidos
        WHERE status_pagamento = ?
    `;

    conexao.query(sql, [status], callback);
}


//==========================================
// ATUALIZAR PEDIDO
//==========================================

function atualizar(id, pedido, callback) {

    const sql = `
        UPDATE Pedidos
        SET
            data_pedido = ?,
            data_entrega = ?,
            nota_fiscal = ?,
            status_entrega = ?,
            status_pagamento = ?,
            codigo = ?,
            Cliente_id_cliente = ?,
            Loja_id_loja = ?,
            Endereco_id_endereco = ?,
            Forma_Pagamento_id_forma_pagamento = ?
        WHERE id_pedidos = ?
    `;

    conexao.query(
        sql,
        [
            pedido.data_pedido,
            pedido.data_entrega,
            pedido.nota_fiscal,
            pedido.status_entrega,
            pedido.status_pagamento,
            pedido.codigo,
            pedido.Cliente_id_cliente,
            pedido.Loja_id_loja,
            pedido.Endereco_id_endereco,
            pedido.Forma_Pagamento_id_forma_pagamento,
            id
        ],
        callback
    );
}


//==========================================
// EXCLUIR PEDIDO
//==========================================

function excluir(id, callback) {

    const sql = `
        DELETE FROM Pedidos
        WHERE id_pedidos = ?
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
    buscarPorCodigo,
    listarPorCliente,
    listarPorLoja,
    listarPorStatusEntrega,
    listarPorStatusPagamento,
    atualizar,
    excluir
};
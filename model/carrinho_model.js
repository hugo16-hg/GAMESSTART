const conexao = require("../conexao/conexao.js");


//==========================================
// CADASTRAR CARRINHO
//==========================================

function cadastrar(carrinho, callback) {

    const sql = `
        INSERT INTO Carrinho
        (
            quantidade_produto,
            preco_total,
            Cliente_id_cliente
        )
        VALUES (?, ?, ?)
    `;

    conexao.query(
        sql,
        [
            carrinho.quantidade_produto,
            carrinho.preco_total,
            carrinho.Cliente_id_cliente
        ],
        callback
    );
}


//==========================================
// LISTAR CARRINHOS
//==========================================

function listar(callback) {

    const sql = `
        SELECT *
        FROM Carrinho
    `;

    conexao.query(sql, callback);
}


//==========================================
// BUSCAR CARRINHO POR ID
//==========================================

function buscarPorId(id, callback) {

    const sql = `
        SELECT *
        FROM Carrinho
        WHERE id_carrinho = ?
    `;

    conexao.query(sql, [id], callback);
}


//==========================================
// BUSCAR CARRINHO DO CLIENTE
//==========================================

function buscarPorCliente(idCliente, callback) {

    const sql = `
        SELECT *
        FROM Carrinho
        WHERE Cliente_id_cliente = ?
    `;

    conexao.query(
        sql,
        [idCliente],
        callback
    );
}


//==========================================
// ATUALIZAR CARRINHO
//==========================================

function atualizar(id, carrinho, callback) {

    const sql = `
        UPDATE Carrinho
        SET
            quantidade_produto = ?,
            preco_total = ?,
            Cliente_id_cliente = ?
        WHERE id_carrinho = ?
    `;

    conexao.query(
        sql,
        [
            carrinho.quantidade_produto,
            carrinho.preco_total,
            carrinho.Cliente_id_cliente,
            id
        ],
        callback
    );
}


//==========================================
// EXCLUIR CARRINHO
//==========================================

function excluir(id, callback) {

    const sql = `
        DELETE FROM Carrinho
        WHERE id_carrinho = ?
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
    buscarPorCliente,
    atualizar,
    excluir
};
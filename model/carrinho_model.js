const conexao = require("../conexao/conexao.js");

// =========================
// Cadastrar Carrinho
// =========================

function cadastrar(carrinho, callback) {

    const sql = `
        INSERT INTO Carrinho
        (
            quantidade_produto,
            preco_total,
            Carrinho_id_carrinho
        )
        VALUES (?, ?, ?)
    `;

    conexao.query(
        sql,
        [
            carrinho.quantidade_produto,
            carrinho.preco_total,
            carrinho.Carrinho_id_carrinho
        ],
        callback
    );

}

// =========================
// Listar Carrinhos
// =========================

function listar(callback) {

    const sql = `
        SELECT *
        FROM Carrinho
    `;

    conexao.query(sql, callback);

}

// =========================
// Buscar Carrinho por ID
// =========================

function buscarPorId(id, callback) {

    const sql = `
        SELECT *
        FROM Carrinho
        WHERE id_carrinho = ?
    `;

    conexao.query(sql, [id], callback);

}

// =========================
// Atualizar Carrinho
// =========================

function atualizar(id, carrinho, callback) {

    const sql = `
        UPDATE Carrinho
        SET
            quantidade_produto = ?,
            preco_total = ?,
            Carrinho_id_carrinho = ?
        WHERE id_carrinho = ?
    `;

    conexao.query(
        sql,
        [
            carrinho.quantidade_produto,
            carrinho.preco_total,
            carrinho.Carrinho_id_carrinho,
            id
        ],
        callback
    );

}

// =========================
// Excluir Carrinho
// =========================

function excluir(id, callback) {

    const sql = `
        DELETE FROM Carrinho
        WHERE id_carrinho = ?
    `;

    conexao.query(sql, [id], callback);

}

module.exports = {
    cadastrar,
    listar,
    buscarPorId,
    atualizar,
    excluir
};
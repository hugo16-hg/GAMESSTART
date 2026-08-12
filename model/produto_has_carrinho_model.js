const conexao = require("../conexao/conexao.js");


//==========================================
// ADICIONAR PRODUTO AO CARRINHO
//==========================================

function cadastrar(produtoCarrinho, callback) {

    const sql = `
        INSERT INTO Produto_has_Carrinho
        (
            Produto_id_produto,
            Carrinho_id_carrinho,
            quantidade
        )
        VALUES (?, ?, ?)
    `;

    conexao.query(
        sql,
        [
            produtoCarrinho.Produto_id_produto,
            produtoCarrinho.Carrinho_id_carrinho,
            produtoCarrinho.quantidade || 1
        ],
        callback
    );
}


//==========================================
// LISTAR RELACIONAMENTOS
//==========================================

function listar(callback) {

    const sql = `
        SELECT *
        FROM Produto_has_Carrinho
    `;

    conexao.query(sql, callback);
}


//==========================================
// LISTAR PRODUTOS DO CARRINHO
//==========================================

function listarPorCarrinho(idCarrinho, callback) {

    const sql = `
        SELECT
            Produto.*,
            Produto_has_Carrinho.quantidade
        FROM Produto_has_Carrinho
        INNER JOIN Produto
            ON Produto.id_produto =
               Produto_has_Carrinho.Produto_id_produto
        WHERE Produto_has_Carrinho.Carrinho_id_carrinho = ?
    `;

    conexao.query(
        sql,
        [idCarrinho],
        callback
    );
}


//==========================================
// LISTAR CARRINHOS DO PRODUTO
//==========================================

function listarPorProduto(idProduto, callback) {

    const sql = `
        SELECT *
        FROM Produto_has_Carrinho
        WHERE Produto_id_produto = ?
    `;

    conexao.query(
        sql,
        [idProduto],
        callback
    );
}


//==========================================
// ATUALIZAR QUANTIDADE
//==========================================

function atualizarQuantidade(
    idProduto,
    idCarrinho,
    quantidade,
    callback
) {

    const sql = `
        UPDATE Produto_has_Carrinho
        SET quantidade = ?
        WHERE Produto_id_produto = ?
        AND Carrinho_id_carrinho = ?
    `;

    conexao.query(
        sql,
        [
            quantidade,
            idProduto,
            idCarrinho
        ],
        callback
    );
}


//==========================================
// EXCLUIR PRODUTO DO CARRINHO
//==========================================

function excluir(idProduto, idCarrinho, callback) {

    const sql = `
        DELETE FROM Produto_has_Carrinho
        WHERE Produto_id_produto = ?
        AND Carrinho_id_carrinho = ?
    `;

    conexao.query(
        sql,
        [
            idProduto,
            idCarrinho
        ],
        callback
    );
}


//==========================================
// LIMPAR CARRINHO
//==========================================

function excluirPorCarrinho(idCarrinho, callback) {

    const sql = `
        DELETE FROM Produto_has_Carrinho
        WHERE Carrinho_id_carrinho = ?
    `;

    conexao.query(
        sql,
        [idCarrinho],
        callback
    );
}


//==========================================
// EXPORTAÇÃO
//==========================================

module.exports = {
    cadastrar,
    listar,
    listarPorCarrinho,
    listarPorProduto,
    atualizarQuantidade,
    excluir,
    excluirPorCarrinho
};
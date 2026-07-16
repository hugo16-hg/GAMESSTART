const conexao = require("../conexao/conexao.js");

// =========================
// Vincular Produto à Categoria
// =========================

function cadastrar(produtoCategoria, callback) {

    const sql = `
        INSERT INTO Produto_has_Categorias
        (
            Produto_id_produto,
            Categorias_id_categorias
        )
        VALUES (?, ?)
    `;

    conexao.query(
        sql,
        [
            produtoCategoria.Produto_id_produto,
            produtoCategoria.Categorias_id_categorias
        ],
        callback
    );

}

// =========================
// Listar Relações
// =========================

function listar(callback) {

    const sql = `
        SELECT *
        FROM Produto_has_Categorias
    `;

    conexao.query(sql, callback);

}

// =========================
// Listar Categorias do Produto
// =========================

function listarPorProduto(idProduto, callback) {

    const sql = `
        SELECT *
        FROM Produto_has_Categorias
        WHERE Produto_id_produto = ?
    `;

    conexao.query(sql, [idProduto], callback);

}

// =========================
// Listar Produtos da Categoria
// =========================

function listarPorCategoria(idCategoria, callback) {

    const sql = `
        SELECT *
        FROM Produto_has_Categorias
        WHERE Categorias_id_categorias = ?
    `;

    conexao.query(sql, [idCategoria], callback);

}

// =========================
// Buscar Produtos com Dados da Categoria
// =========================

function buscarProdutosPorCategoria(idCategoria, callback) {

    const sql = `
        SELECT 
            Produto.*
        FROM Produto
        INNER JOIN Produto_has_Categorias
        ON Produto.id_produto = Produto_has_Categorias.Produto_id_produto
        WHERE Produto_has_Categorias.Categorias_id_categorias = ?
    `;

    conexao.query(sql, [idCategoria], callback);

}

// =========================
// Remover Categoria do Produto
// =========================

function excluir(idProduto, idCategoria, callback) {

    const sql = `
        DELETE FROM Produto_has_Categorias
        WHERE Produto_id_produto = ?
        AND Categorias_id_categorias = ?
    `;

    conexao.query(
        sql,
        [
            idProduto,
            idCategoria
        ],
        callback
    );

}

// =========================
// Remover Todas as Categorias do Produto
// =========================

function excluirPorProduto(idProduto, callback) {

    const sql = `
        DELETE FROM Produto_has_Categorias
        WHERE Produto_id_produto = ?
    `;

    conexao.query(sql, [idProduto], callback);

}

// =========================
// Remover Todos os Produtos da Categoria
// =========================

function excluirPorCategoria(idCategoria, callback) {

    const sql = `
        DELETE FROM Produto_has_Categorias
        WHERE Categorias_id_categorias = ?
    `;

    conexao.query(sql, [idCategoria], callback);

}

module.exports = {
    cadastrar,
    listar,
    listarPorProduto,
    listarPorCategoria,
    buscarProdutosPorCategoria,
    excluir,
    excluirPorProduto,
    excluirPorCategoria
};
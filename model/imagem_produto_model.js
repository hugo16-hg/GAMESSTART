const conexao = require("../conexao/conexao.js");

// =========================
// Cadastrar Imagem do Produto
// =========================

function cadastrar(imagemProduto, callback) {

    const sql = `
        INSERT INTO Imagem_produto
        (
            arquivo,
            Produto_id_produto
        )
        VALUES (?, ?)
    `;

    conexao.query(
        sql,
        [
            imagemProduto.arquivo,
            imagemProduto.Produto_id_produto
        ],
        callback
    );

}

// =========================
// Listar Imagens
// =========================

function listar(callback) {

    const sql = `
        SELECT *
        FROM Imagem_produto
    `;

    conexao.query(sql, callback);

}

// =========================
// Buscar Imagem por ID
// =========================

function buscarPorId(id, callback) {

    const sql = `
        SELECT *
        FROM Imagem_produto
        WHERE id_imagem_produto = ?
    `;

    conexao.query(sql, [id], callback);

}

// =========================
// Listar Imagens por Produto
// =========================

function listarPorProduto(idProduto, callback) {

    const sql = `
        SELECT *
        FROM Imagem_produto
        WHERE Produto_id_produto = ?
    `;

    conexao.query(sql, [idProduto], callback);

}

// =========================
// Atualizar Imagem
// =========================

function atualizar(id, imagemProduto, callback) {

    const sql = `
        UPDATE Imagem_produto
        SET
            arquivo = ?,
            Produto_id_produto = ?
        WHERE id_imagem_produto = ?
    `;

    conexao.query(
        sql,
        [
            imagemProduto.arquivo,
            imagemProduto.Produto_id_produto,
            id
        ],
        callback
    );

}

// =========================
// Excluir Imagem
// =========================

function excluir(id, callback) {

    const sql = `
        DELETE FROM Imagem_produto
        WHERE id_imagem_produto = ?
    `;

    conexao.query(sql, [id], callback);

}

// =========================
// Excluir Todas as Imagens do Produto
// =========================

function excluirPorProduto(idProduto, callback) {

    const sql = `
        DELETE FROM Imagem_produto
        WHERE Produto_id_produto = ?
    `;

    conexao.query(sql, [idProduto], callback);

}

module.exports = {
    cadastrar,
    listar,
    buscarPorId,
    listarPorProduto,
    atualizar,
    excluir,
    excluirPorProduto
};
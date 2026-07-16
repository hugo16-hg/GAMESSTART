const conexao = require("../conexao/conexao.js");

// =========================
// Cadastrar Produto
// =========================

function cadastrar(produto, callback) {

    const sql = `
        INSERT INTO Produto
        (
            nome,
            descricao,
            codigo,
            preco_antigo,
            preco_promocional,
            quantidade_estoque,
            ativo,
            Loja_id_loja,
            Lojista_id_lojista
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    conexao.query(
        sql,
        [
            produto.nome,
            produto.descricao,
            produto.codigo,
            produto.preco_antigo,
            produto.preco_promocional,
            produto.quantidade_estoque,
            produto.ativo,
            produto.Loja_id_loja,
            produto.Lojista_id_lojista
        ],
        callback
    );

}

// =========================
// Listar Produtos
// =========================

function listar(callback) {

    const sql = `
        SELECT *
        FROM Produto
    `;

    conexao.query(sql, callback);

}

// =========================
// Buscar Produto por ID
// =========================

function buscarPorId(id, callback) {

    const sql = `
        SELECT *
        FROM Produto
        WHERE id_produto = ?
    `;

    conexao.query(sql, [id], callback);

}

// =========================
// Buscar Produto por Nome
// =========================

function buscarPorNome(nome, callback) {

    const sql = `
        SELECT *
        FROM Produto
        WHERE nome LIKE ?
    `;

    conexao.query(sql, [`%${nome}%`], callback);

}

// =========================
// Buscar Produto por Código
// =========================

function buscarPorCodigo(codigo, callback) {

    const sql = `
        SELECT *
        FROM Produto
        WHERE codigo = ?
    `;

    conexao.query(sql, [codigo], callback);

}

// =========================
// Listar Produtos por Loja
// =========================

function listarPorLoja(idLoja, callback) {

    const sql = `
        SELECT *
        FROM Produto
        WHERE Loja_id_loja = ?
    `;

    conexao.query(sql, [idLoja], callback);

}

// =========================
// Listar Produtos por Lojista
// =========================

function listarPorLojista(idLojista, callback) {

    const sql = `
        SELECT *
        FROM Produto
        WHERE Lojista_id_lojista = ?
    `;

    conexao.query(sql, [idLojista], callback);

}

// =========================
// Listar Produtos Ativos
// =========================

function listarAtivos(callback) {

    const sql = `
        SELECT *
        FROM Produto
        WHERE ativo = TRUE
    `;

    conexao.query(sql, callback);

}

// =========================
// Listar Produtos em Estoque
// =========================

function listarEmEstoque(callback) {

    const sql = `
        SELECT *
        FROM Produto
        WHERE quantidade_estoque > 0
    `;

    conexao.query(sql, callback);

}

// =========================
// Atualizar Produto
// =========================

function atualizar(id, produto, callback) {

    const sql = `
        UPDATE Produto
        SET
            nome = ?,
            descricao = ?,
            codigo = ?,
            preco_antigo = ?,
            preco_promocional = ?,
            quantidade_estoque = ?,
            ativo = ?,
            Loja_id_loja = ?,
            Lojista_id_lojista = ?
        WHERE id_produto = ?
    `;

    conexao.query(
        sql,
        [
            produto.nome,
            produto.descricao,
            produto.codigo,
            produto.preco_antigo,
            produto.preco_promocional,
            produto.quantidade_estoque,
            produto.ativo,
            produto.Loja_id_loja,
            produto.Lojista_id_lojista,
            id
        ],
        callback
    );

}

// =========================
// Excluir Produto
// =========================

function excluir(id, callback) {

    const sql = `
        DELETE FROM Produto
        WHERE id_produto = ?
    `;

    conexao.query(sql, [id], callback);

}

module.exports = {
    cadastrar,
    listar,
    buscarPorId,
    buscarPorNome,
    buscarPorCodigo,
    listarPorLoja,
    listarPorLojista,
    listarAtivos,
    listarEmEstoque,
    atualizar,
    excluir
};
//==========================================
// IMPORTA A CONEXÃO
//==========================================

const conexao = require("../conexao/conexao.js");


//==========================================
// CADASTRAR PRODUTO
//==========================================

function cadastrar(produto, callback) {

    const sql = `
        INSERT INTO Produto
        (
            nome,
            descricao,
            sku,
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
            produto.sku,
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


//==========================================
// LISTAR PRODUTOS
//==========================================

function listar(callback) {

    const sql = `
        SELECT *
        FROM Produto
        ORDER BY nome
    `;

    conexao.query(sql, callback);
}


//==========================================
// BUSCAR PRODUTO POR ID
//==========================================

function buscarPorId(id, callback) {

    const sql = `
        SELECT *
        FROM Produto
        WHERE id_produto = ?
    `;

    conexao.query(
        sql,
        [id],
        callback
    );
}


//==========================================
// BUSCAR PRODUTO POR NOME
//==========================================

function buscarPorNome(nome, callback) {

    const sql = `
        SELECT *
        FROM Produto
        WHERE nome LIKE ?
    `;

    conexao.query(
        sql,
        [`%${nome}%`],
        callback
    );
}


//==========================================
// BUSCAR PRODUTO POR SKU
//==========================================

function buscarPorSku(sku, callback) {

    const sql = `
        SELECT *
        FROM Produto
        WHERE sku = ?
    `;

    conexao.query(
        sql,
        [sku],
        callback
    );
}


//==========================================
// LISTAR PRODUTOS POR LOJA
//==========================================

function listarPorLoja(idLoja, callback) {

    const sql = `
        SELECT *
        FROM Produto
        WHERE Loja_id_loja = ?
    `;

    conexao.query(
        sql,
        [idLoja],
        callback
    );
}


//==========================================
// LISTAR PRODUTOS POR LOJISTA
//==========================================

function listarPorLojista(idLojista, callback) {

    const sql = `
        SELECT *
        FROM Produto
        WHERE Lojista_id_lojista = ?
    `;

    conexao.query(
        sql,
        [idLojista],
        callback
    );
}


//==========================================
// LISTAR PRODUTOS ATIVOS
//==========================================

function listarAtivos(callback) {

    const sql = `
        SELECT *
        FROM Produto
        WHERE ativo = TRUE
    `;

    conexao.query(sql, callback);
}


//==========================================
// LISTAR PRODUTOS EM ESTOQUE
//==========================================

function listarEmEstoque(callback) {

    const sql = `
        SELECT *
        FROM Produto
        WHERE quantidade_estoque > 0
        AND ativo = TRUE
    `;

    conexao.query(sql, callback);
}


//==========================================
// ATUALIZAR PRODUTO
//==========================================

function atualizar(id, produto, callback) {

    const sql = `
        UPDATE Produto
        SET
            nome = ?,
            descricao = ?,
            sku = ?,
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
            produto.sku,
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


//==========================================
// ATUALIZAR ESTOQUE
//==========================================

function atualizarEstoque(id, quantidade, callback) {

    const sql = `
        UPDATE Produto
        SET quantidade_estoque = ?
        WHERE id_produto = ?
    `;

    conexao.query(
        sql,
        [
            quantidade,
            id
        ],
        callback
    );
}


//==========================================
// EXCLUIR PRODUTO
//==========================================

function excluir(id, callback) {

    const sql = `
        DELETE FROM Produto
        WHERE id_produto = ?
    `;

    conexao.query(
        sql,
        [id],
        callback
    );
}


//==========================================
// EXPORTAÇÃO
//==========================================

module.exports = {

    cadastrar,
    listar,
    buscarPorId,
    buscarPorNome,
    buscarPorSku,
    listarPorLoja,
    listarPorLojista,
    listarAtivos,
    listarEmEstoque,
    atualizar,
    atualizarEstoque,
    excluir

};
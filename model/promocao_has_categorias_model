const conexao = require("../conexao/conexao.js");

// =========================
// Vincular Promoção à Categoria
// =========================

function cadastrar(promocaoCategoria, callback) {

    const sql = `
        INSERT INTO Promocao_has_Categorias
        (
            Promocao_id_promocao,
            Categorias_id_categorias
        )
        VALUES (?, ?)
    `;

    conexao.query(
        sql,
        [
            promocaoCategoria.Promocao_id_promocao,
            promocaoCategoria.Categorias_id_categorias
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
        FROM Promocao_has_Categorias
    `;

    conexao.query(sql, callback);

}

// =========================
// Listar Categorias da Promoção
// =========================

function listarPorPromocao(idPromocao, callback) {

    const sql = `
        SELECT *
        FROM Promocao_has_Categorias
        WHERE Promocao_id_promocao = ?
    `;

    conexao.query(sql, [idPromocao], callback);

}

// =========================
// Listar Promoções da Categoria
// =========================

function listarPorCategoria(idCategoria, callback) {

    const sql = `
        SELECT *
        FROM Promocao_has_Categorias
        WHERE Categorias_id_categorias = ?
    `;

    conexao.query(sql, [idCategoria], callback);

}

// =========================
// Buscar Categorias de uma Promoção
// =========================

function buscarCategoriasPorPromocao(idPromocao, callback) {

    const sql = `
        SELECT
            Categorias.*
        FROM Categorias
        INNER JOIN Promocao_has_Categorias
        ON Categorias.id_categorias = Promocao_has_Categorias.Categorias_id_categorias
        WHERE Promocao_has_Categorias.Promocao_id_promocao = ?
    `;

    conexao.query(sql, [idPromocao], callback);

}

// =========================
// Buscar Promoções de uma Categoria
// =========================

function buscarPromocoesPorCategoria(idCategoria, callback) {

    const sql = `
        SELECT
            Promocao.*
        FROM Promocao
        INNER JOIN Promocao_has_Categorias
        ON Promocao.id_promocao = Promocao_has_Categorias.Promocao_id_promocao
        WHERE Promocao_has_Categorias.Categorias_id_categorias = ?
    `;

    conexao.query(sql, [idCategoria], callback);

}

// =========================
// Buscar Promoções Ativas por Categoria
// =========================

function listarPromocoesAtivasPorCategoria(idCategoria, callback) {

    const sql = `
        SELECT
            Promocao.*
        FROM Promocao
        INNER JOIN Promocao_has_Categorias
        ON Promocao.id_promocao = Promocao_has_Categorias.Promocao_id_promocao
        WHERE Promocao_has_Categorias.Categorias_id_categorias = ?
        AND CURDATE() BETWEEN Promocao.data_inicio
        AND IFNULL(Promocao.data_final, CURDATE())
    `;

    conexao.query(sql, [idCategoria], callback);

}

// =========================
// Remover Categoria da Promoção
// =========================

function excluir(idPromocao, idCategoria, callback) {

    const sql = `
        DELETE FROM Promocao_has_Categorias
        WHERE Promocao_id_promocao = ?
        AND Categorias_id_categorias = ?
    `;

    conexao.query(
        sql,
        [
            idPromocao,
            idCategoria
        ],
        callback
    );

}

// =========================
// Remover Todas as Categorias da Promoção
// =========================

function excluirPorPromocao(idPromocao, callback) {

    const sql = `
        DELETE FROM Promocao_has_Categorias
        WHERE Promocao_id_promocao = ?
    `;

    conexao.query(sql, [idPromocao], callback);

}

// =========================
// Remover Todas as Promoções da Categoria
// =========================

function excluirPorCategoria(idCategoria, callback) {

    const sql = `
        DELETE FROM Promocao_has_Categorias
        WHERE Categorias_id_categorias = ?
    `;

    conexao.query(sql, [idCategoria], callback);

}

module.exports = {
    cadastrar,
    listar,
    listarPorPromocao,
    listarPorCategoria,
    buscarCategoriasPorPromocao,
    buscarPromocoesPorCategoria,
    listarPromocoesAtivasPorCategoria,
    excluir,
    excluirPorPromocao,
    excluirPorCategoria
};
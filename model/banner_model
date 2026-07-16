const conexao = require("../conexao/conexao.js");

// =========================
// Cadastrar Banner
// =========================

function cadastrar(banner, callback) {

    const sql = `
        INSERT INTO Banner
        (
            imagem,
            data_inicio,
            data_final,
            statutos_visibilidade,
            Loja_id_loja
        )
        VALUES (?, ?, ?, ?, ?)
    `;

    conexao.query(
        sql,
        [
            banner.imagem,
            banner.data_inicio,
            banner.data_final,
            banner.statutos_visibilidade,
            banner.Loja_id_loja
        ],
        callback
    );

}

// =========================
// Listar Banners
// =========================

function listar(callback) {

    const sql = `
        SELECT *
        FROM Banner
    `;

    conexao.query(sql, callback);

}

// =========================
// Buscar Banner por ID
// =========================

function buscarPorId(id, callback) {

    const sql = `
        SELECT *
        FROM Banner
        WHERE id_banner = ?
    `;

    conexao.query(sql, [id], callback);

}

// =========================
// Listar Banners Visíveis
// =========================

function listarVisiveis(callback) {

    const sql = `
        SELECT *
        FROM Banner
        WHERE statutos_visibilidade = TRUE
    `;

    conexao.query(sql, callback);

}

// =========================
// Atualizar Banner
// =========================

function atualizar(id, banner, callback) {

    const sql = `
        UPDATE Banner
        SET
            imagem = ?,
            data_inicio = ?,
            data_final = ?,
            statutos_visibilidade = ?,
            Loja_id_loja = ?
        WHERE id_banner = ?
    `;

    conexao.query(
        sql,
        [
            banner.imagem,
            banner.data_inicio,
            banner.data_final,
            banner.statutos_visibilidade,
            banner.Loja_id_loja,
            id
        ],
        callback
    );

}

// =========================
// Excluir Banner
// =========================

function excluir(id, callback) {

    const sql = `
        DELETE FROM Banner
        WHERE id_banner = ?
    `;

    conexao.query(sql, [id], callback);

}

module.exports = {
    cadastrar,
    listar,
    buscarPorId,
    listarVisiveis,
    atualizar,
    excluir
};
const conexao = require("../conexao/conexao.js");


//==========================================
// CADASTRAR BANNER
//==========================================

function cadastrar(banner, callback) {

    const sql = `
        INSERT INTO Banner
        (
            imagem,
            data_inicio,
            data_final,
            status_visibilidade,
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
            banner.status_visibilidade,
            banner.Loja_id_loja
        ],
        callback
    );
}


//==========================================
// LISTAR BANNERS
//==========================================

function listar(callback) {

    const sql = `
        SELECT *
        FROM Banner
    `;

    conexao.query(sql, callback);
}


//==========================================
// BUSCAR BANNER POR ID
//==========================================

function buscarPorId(id, callback) {

    const sql = `
        SELECT *
        FROM Banner
        WHERE id_banner = ?
    `;

    conexao.query(sql, [id], callback);
}


//==========================================
// LISTAR BANNERS VISÍVEIS
//==========================================

function listarVisiveis(callback) {

    const sql = `
        SELECT *
        FROM Banner
        WHERE status_visibilidade = TRUE
    `;

    conexao.query(sql, callback);
}


//==========================================
// ATUALIZAR BANNER
//==========================================

function atualizar(id, banner, callback) {

    const sql = `
        UPDATE Banner
        SET
            imagem = ?,
            data_inicio = ?,
            data_final = ?,
            status_visibilidade = ?,
            Loja_id_loja = ?
        WHERE id_banner = ?
    `;

    conexao.query(
        sql,
        [
            banner.imagem,
            banner.data_inicio,
            banner.data_final,
            banner.status_visibilidade,
            banner.Loja_id_loja,
            id
        ],
        callback
    );
}


//==========================================
// EXCLUIR BANNER
//==========================================

function excluir(id, callback) {

    const sql = `
        DELETE FROM Banner
        WHERE id_banner = ?
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
    listarVisiveis,
    atualizar,
    excluir
};
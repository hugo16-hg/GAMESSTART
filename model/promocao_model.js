const conexao = require("../conexao/conexao.js");

// =========================
// Cadastrar Promoção
// =========================

function cadastrar(promocao, callback) {

    const sql = `
        INSERT INTO Promocao
        (
            data_inicio,
            data_final,
            valor_promocional,
            nome,
            Banner_id_banner
        )
        VALUES (?, ?, ?, ?, ?)
    `;

    conexao.query(
        sql,
        [
            promocao.data_inicio,
            promocao.data_final,
            promocao.valor_promocional,
            promocao.nome,
            promocao.Banner_id_banner
        ],
        callback
    );

}

// =========================
// Listar Promoções
// =========================

function listar(callback) {

    const sql = `
        SELECT *
        FROM Promocao
    `;

    conexao.query(sql, callback);

}

// =========================
// Buscar Promoção por ID
// =========================

function buscarPorId(id, callback) {

    const sql = `
        SELECT *
        FROM Promocao
        WHERE id_promocao = ?
    `;

    conexao.query(sql, [id], callback);

}

// =========================
// Buscar Promoção por Nome
// =========================

function buscarPorNome(nome, callback) {

    const sql = `
        SELECT *
        FROM Promocao
        WHERE nome = ?
    `;

    conexao.query(sql, [nome], callback);

}

// =========================
// Listar Promoções por Banner
// =========================

function listarPorBanner(idBanner, callback) {

    const sql = `
        SELECT *
        FROM Promocao
        WHERE Banner_id_banner = ?
    `;

    conexao.query(sql, [idBanner], callback);

}

// =========================
// Listar Promoções Ativas
// =========================

function listarAtivas(callback) {

    const sql = `
        SELECT *
        FROM Promocao
        WHERE CURDATE() BETWEEN data_inicio
        AND IFNULL(data_final, CURDATE())
    `;

    conexao.query(sql, callback);

}

// =========================
// Atualizar Promoção
// =========================

function atualizar(id, promocao, callback) {

    const sql = `
        UPDATE Promocao
        SET
            data_inicio = ?,
            data_final = ?,
            valor_promocional = ?,
            nome = ?,
            Banner_id_banner = ?
        WHERE id_promocao = ?
    `;

    conexao.query(
        sql,
        [
            promocao.data_inicio,
            promocao.data_final,
            promocao.valor_promocional,
            promocao.nome,
            promocao.Banner_id_banner,
            id
        ],
        callback
    );

}

// =========================
// Excluir Promoção
// =========================

function excluir(id, callback) {

    const sql = `
        DELETE FROM Promocao
        WHERE id_promocao = ?
    `;

    conexao.query(sql, [id], callback);

}

module.exports = {
    cadastrar,
    listar,
    buscarPorId,
    buscarPorNome,
    listarPorBanner,
    listarAtivas,
    atualizar,
    excluir
};
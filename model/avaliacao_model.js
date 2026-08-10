const conexao = require("../conexao/conexao.js");


// ==========================================
// CADASTRAR AVALIAÇÃO
// ==========================================

function cadastrar(avaliacao, callback) {

    const sql = `
        INSERT INTO Avaliacao
        (
            data_publicacao,
            nota,
            descricao,
            Produto_id_produto
        )
        VALUES (?, ?, ?, ?)
    `;

    conexao.query(
        sql,
        [
            avaliacao.data_publicacao,
            avaliacao.nota,
            avaliacao.descricao,
            avaliacao.Produto_id_produto
        ],
        callback
    );
}


// ==========================================
// LISTAR AVALIAÇÕES
// ==========================================

function listar(callback) {

    const sql = `
        SELECT *
        FROM Avaliacao
    `;

    conexao.query(sql, callback);
}


// ==========================================
// BUSCAR AVALIAÇÃO POR ID
// ==========================================

function buscarPorId(id, callback) {

    const sql = `
        SELECT *
        FROM Avaliacao
        WHERE id_avaliacao = ?
    `;

    conexao.query(sql, [id], callback);
}


// ==========================================
// ATUALIZAR AVALIAÇÃO
// ==========================================

function atualizar(id, avaliacao, callback) {

    const sql = `
        UPDATE Avaliacao
        SET
            data_publicacao = ?,
            nota = ?,
            descricao = ?,
            Produto_id_produto = ?
        WHERE id_avaliacao = ?
    `;

    conexao.query(
        sql,
        [
            avaliacao.data_publicacao,
            avaliacao.nota,
            avaliacao.descricao,
            avaliacao.Produto_id_produto,
            id
        ],
        callback
    );
}


// ==========================================
// EXCLUIR AVALIAÇÃO
// ==========================================

function excluir(id, callback) {

    const sql = `
        DELETE FROM Avaliacao
        WHERE id_avaliacao = ?
    `;

    conexao.query(sql, [id], callback);
}


// ==========================================
// EXPORTAÇÃO
// ==========================================

module.exports = {
    cadastrar,
    listar,
    buscarPorId,
    atualizar,
    excluir
};
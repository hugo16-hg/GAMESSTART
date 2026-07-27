const conexao = require("../conexao/conexao.js");

// =========================
// Cadastrar Relacionamento
// =========================

function cadastrar(relacionamento, callback) {

    const sql = `
        INSERT INTO Cupom_has_Categorias
        (Cupom_id_Cupom, Categorias_id_categorias)
        VALUES (?, ?)
    `;

    conexao.query(
        sql,
        [
            relacionamento.Cupom_id_Cupom,
            relacionamento.Categorias_id_categorias
        ],
        callback
    );

}

// =========================
// Listar Relacionamentos
// =========================

function listar(callback) {

    const sql = `
        SELECT *
        FROM Cupom_has_Categorias
    `;

    conexao.query(sql, callback);

}

// =========================
// Buscar Relacionamento
// =========================

function buscarPorId(cupom, categoria, callback) {

    const sql = `
        SELECT *
        FROM Cupom_has_Categorias
        WHERE Cupom_id_Cupom = ?
        AND Categorias_id_categorias = ?
    `;

    conexao.query(sql, [cupom, categoria], callback);

}

// =========================
// Atualizar Relacionamento
// =========================

function atualizar(cupom, categoria, relacionamento, callback) {

    const sql = `
        UPDATE Cupom_has_Categorias
        SET
            Cupom_id_Cupom = ?,
            Categorias_id_categorias = ?
        WHERE Cupom_id_Cupom = ?
        AND Categorias_id_categorias = ?
    `;

    conexao.query(
        sql,
        [
            relacionamento.Cupom_id_Cupom,
            relacionamento.Categorias_id_categorias,
            cupom,
            categoria
        ],
        callback
    );

}

// =========================
// Excluir Relacionamento
// =========================

function excluir(cupom, categoria, callback) {

    const sql = `
        DELETE FROM Cupom_has_Categorias
        WHERE Cupom_id_Cupom = ?
        AND Categorias_id_categorias = ?
    `;

    conexao.query(sql, [cupom, categoria], callback);

}

module.exports = {

    cadastrar,
    listar,
    buscarPorId,
    atualizar,
    excluir

};
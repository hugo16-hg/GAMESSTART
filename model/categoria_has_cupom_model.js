const conexao = require("../conexao/conexao.js");

// =========================
// Cadastrar Relacionamento
// =========================

function cadastrar(relacionamento, callback) {

    const sql = `
        INSERT INTO Categoria_has_Cupom
        (Categorias_id_categorias, Cupom_id_Cupom)
        VALUES (?, ?)
    `;

    conexao.query(
        sql,
        [
            relacionamento.Categorias_id_categorias,
            relacionamento.Cupom_id_Cupom
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
        FROM Categoria_has_Cupom
    `;

    conexao.query(sql, callback);

}

// =========================
// Buscar Relacionamento
// =========================

function buscarPorId(categoria, cupom, callback) {

    const sql = `
        SELECT *
        FROM Categoria_has_Cupom
        WHERE Categorias_id_categorias = ?
        AND Cupom_id_Cupom = ?
    `;

    conexao.query(sql, [categoria, cupom], callback);

}

// =========================
// Atualizar Relacionamento
// =========================

function atualizar(categoria, cupom, relacionamento, callback) {

    const sql = `
        UPDATE Categoria_has_Cupom
        SET
            Categorias_id_categorias = ?,
            Cupom_id_Cupom = ?
        WHERE Categorias_id_categorias = ?
        AND Cupom_id_Cupom = ?
    `;

    conexao.query(
        sql,
        [
            relacionamento.Categorias_id_categorias,
            relacionamento.Cupom_id_Cupom,
            categoria,
            cupom
        ],
        callback
    );

}

// =========================
// Excluir Relacionamento
// =========================

function excluir(categoria, cupom, callback) {

    const sql = `
        DELETE FROM Categoria_has_Cupom
        WHERE Categorias_id_categorias = ?
        AND Cupom_id_Cupom = ?
    `;

    conexao.query(sql, [categoria, cupom], callback);

}

module.exports = {
    cadastrar,
    listar,
    buscarPorId,
    atualizar,
    excluir
};
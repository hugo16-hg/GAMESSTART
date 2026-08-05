const conexao = require("../conexao/conexao.js");

// =========================
// Cadastrar Categoria
// =========================
function cadastrar(categoria, callback) {
    const sql = `
        INSERT INTO Categorias
        (nome, icone)
        VALUES (?, ?)
    `;

    conexao.query(
        sql,
        [
            categoria.nome,
            categoria.icone
        ],
        callback
    );
}

// =========================
// Listar Categorias
// =========================
function listar(callback) {
    const sql = `
        SELECT *
        FROM Categorias
    `;

    conexao.query(sql, callback);
}

// =========================
// Buscar por ID
// =========================
function buscarPorId(id, callback) {
    const sql = `
        SELECT *
        FROM Categorias
        WHERE id_Categorias = ?
    `;

    conexao.query(sql, [id], callback);
}

// =========================
// Atualizar Categoria
// =========================
function atualizar(id, categoria, callback) {
    const sql = `
        UPDATE Categorias
        SET
            nome = ?,
            icone = ?
        WHERE id_Categorias = ?
    `;

    conexao.query(
        sql,
        [
            categoria.nome,
            categoria.icone,
            id
        ],
        callback
    );
}

// =========================
// Excluir Categoria
// =========================
function excluir(id, callback) {
    const sql = `
        DELETE FROM Categorias
        WHERE id_Categorias = ?
    `;

    conexao.query(sql, [id], callback);
}

module.exports = {
    cadastrar,
    listar,
    buscarPorId,
    atualizar,
    excluir
};
const conexao = require("../conexao/conexao.js");

// =========================
// Cadastrar categorias
// =========================

function cadastrar(Categorias, callback) {

    const sql = `INSERT INTO Categorias
        ( nome, icone )
        VALUES (?, ?)`;

    conexao.query(
        sql,
        [
            Categorias.nome,
            Categorias.icone
        ],
        callback
    );

}

// =========================
// Listar Categorias
// =========================

function listar(callback) {

    const sql = `
        SELECT * FROM Categorias
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
// Buscar por Email
// =========================

function buscarPorEmail(email, callback) {

    const sql = `
        SELECT * FROM Categorias
        WHERE email = ?
    `;

    conexao.query(sql, [email], callback);

}

// =========================
// Atualizar Categorias
// =========================

function atualizar(id, Categorias, callback) {

    const sql = `
        UPDATE Categorias
        SET

            nome = ?,
            icone = ?,
            
        WHERE id_Categorias = ?
    `;

    conexao.query(
        sql,
        [
            Categorias.nome,
            Categorias.icone,
            
            id
        ],
        callback
    );

}

// =========================
// Excluir Categorais
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
    buscarPorEmail,
    atualizar,
    excluir

};
const conexao = require("../conexao/conexao.js");

// =========================
// Cadastrar Loja
// =========================

function cadastrar(loja, callback) {

    const sql = `
        INSERT INTO Loja
        (
            nome,
            whatsapp,
            instagram,
            facebook,
            linkidin,
            telefone,
            email,
            Lojista_id_lojista,
            Endereco_id_endereco
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    conexao.query(
        sql,
        [
            loja.nome,
            loja.whatsapp,
            loja.instagram,
            loja.facebook,
            loja.linkidin,
            loja.telefone,
            loja.email,
            loja.Lojista_id_lojista,
            loja.Endereco_id_endereco
        ],
        callback
    );

}

// =========================
// Listar Lojas
// =========================

function listar(callback) {

    const sql = `
        SELECT *
        FROM Loja
    `;

    conexao.query(sql, callback);

}

// =========================
// Buscar Loja por ID
// =========================

function buscarPorId(id, callback) {

    const sql = `
        SELECT *
        FROM Loja
        WHERE id_loja = ?
    `;

    conexao.query(sql, [id], callback);

}

// =========================
// Buscar Loja por Nome
// =========================

function buscarPorNome(nome, callback) {

    const sql = `
        SELECT *
        FROM Loja
        WHERE nome = ?
    `;

    conexao.query(sql, [nome], callback);

}

// =========================
// Buscar Loja por Email
// =========================

function buscarPorEmail(email, callback) {

    const sql = `
        SELECT *
        FROM Loja
        WHERE email = ?
    `;

    conexao.query(sql, [email], callback);

}

// =========================
// Atualizar Loja
// =========================

function atualizar(id, loja, callback) {

    const sql = `
        UPDATE Loja
        SET
            nome = ?,
            whatsapp = ?,
            instagram = ?,
            facebook = ?,
            linkidin = ?,
            telefone = ?,
            email = ?,
            Lojista_id_lojista = ?,
            Endereco_id_endereco = ?
        WHERE id_loja = ?
    `;

    conexao.query(
        sql,
        [
            loja.nome,
            loja.whatsapp,
            loja.instagram,
            loja.facebook,
            loja.linkidin,
            loja.telefone,
            loja.email,
            loja.Lojista_id_lojista,
            loja.Endereco_id_endereco,
            id
        ],
        callback
    );

}

// =========================
// Excluir Loja
// =========================

function excluir(id, callback) {

    const sql = `
        DELETE FROM Loja
        WHERE id_loja = ?
    `;

    conexao.query(sql, [id], callback);

}

module.exports = {
    cadastrar,
    listar,
    buscarPorId,
    buscarPorNome,
    buscarPorEmail,
    atualizar,
    excluir
};
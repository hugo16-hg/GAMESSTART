const conexao = require("../conexao/conexao.js");


//==========================================
// CADASTRAR LOJA
//==========================================

function cadastrar(loja, callback) {

    const sql = `
        INSERT INTO Loja
        (
            nome,
            whatsapp,
            instagram,
            facebook,
            linkedin,
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
            loja.linkedin,
            loja.telefone,
            loja.email,
            loja.Lojista_id_lojista,
            loja.Endereco_id_endereco
        ],
        callback
    );
}


//==========================================
// LISTAR LOJAS
//==========================================

function listar(callback) {

    const sql = `
        SELECT *
        FROM Loja
    `;

    conexao.query(sql, callback);
}


//==========================================
// BUSCAR LOJA POR ID
//==========================================

function buscarPorId(id, callback) {

    const sql = `
        SELECT *
        FROM Loja
        WHERE id_loja = ?
    `;

    conexao.query(sql, [id], callback);
}


//==========================================
// BUSCAR LOJA POR NOME
//==========================================

function buscarPorNome(nome, callback) {

    const sql = `
        SELECT *
        FROM Loja
        WHERE nome = ?
    `;

    conexao.query(sql, [nome], callback);
}


//==========================================
// BUSCAR LOJA POR EMAIL
//==========================================

function buscarPorEmail(email, callback) {

    const sql = `
        SELECT *
        FROM Loja
        WHERE email = ?
    `;

    conexao.query(sql, [email], callback);
}


//==========================================
// ATUALIZAR LOJA
//==========================================

function atualizar(id, loja, callback) {

    const sql = `
        UPDATE Loja
        SET
            nome = ?,
            whatsapp = ?,
            instagram = ?,
            facebook = ?,
            linkedin = ?,
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
            loja.linkedin,
            loja.telefone,
            loja.email,
            loja.Lojista_id_lojista,
            loja.Endereco_id_endereco,
            id
        ],
        callback
    );
}


//==========================================
// EXCLUIR LOJA
//==========================================

function excluir(id, callback) {

    const sql = `
        DELETE FROM Loja
        WHERE id_loja = ?
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
    buscarPorNome,
    buscarPorEmail,
    atualizar,
    excluir
};
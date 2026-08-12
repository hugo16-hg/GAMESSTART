//==========================================
// IMPORTA A CONEXÃO
//==========================================

const conexao = require("../conexao/conexao.js");


//==========================================
// CADASTRAR CATEGORIA
//==========================================

function cadastrar(categoria, callback) {

    const sql = `
        INSERT INTO Categorias
        (
            nome,
            imagem
        )
        VALUES (?, ?)
    `;

    conexao.query(
        sql,
        [
            categoria.nome,
            categoria.imagem
        ],
        callback
    );
}


//==========================================
// LISTAR CATEGORIAS
//==========================================

function listar(callback) {

    const sql = `
        SELECT *
        FROM Categorias
        ORDER BY nome
    `;

    conexao.query(sql, callback);
}


//==========================================
// BUSCAR CATEGORIA POR ID
//==========================================

function buscarPorId(id, callback) {

    const sql = `
        SELECT *
        FROM Categorias
        WHERE id_categorias = ?
    `;

    conexao.query(
        sql,
        [id],
        callback
    );
}


//==========================================
// BUSCAR CATEGORIA POR NOME
//==========================================

function buscarPorNome(nome, callback) {

    const sql = `
        SELECT *
        FROM Categorias
        WHERE nome = ?
    `;

    conexao.query(
        sql,
        [nome],
        callback
    );
}


//==========================================
// ATUALIZAR CATEGORIA
//==========================================

function atualizar(id, categoria, callback) {

    const sql = `
        UPDATE Categorias
        SET
            nome = ?,
            imagem = ?
        WHERE id_categorias = ?
    `;

    conexao.query(
        sql,
        [
            categoria.nome,
            categoria.imagem,
            id
        ],
        callback
    );
}


//==========================================
// EXCLUIR CATEGORIA
//==========================================

function excluir(id, callback) {

    const sql = `
        DELETE FROM Categorias
        WHERE id_categorias = ?
    `;

    conexao.query(
        sql,
        [id],
        callback
    );
}


//==========================================
// EXPORTAÇÃO
//==========================================

module.exports = {
    cadastrar,
    listar,
    buscarPorId,
    buscarPorNome,
    atualizar,
    excluir
};
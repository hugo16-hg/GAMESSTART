const conexao = require("../conexao/conexao.js");


//==========================================
// CADASTRAR RELACIONAMENTO
//==========================================

function cadastrar(relacionamento, callback) {

    const sql = `
        INSERT INTO Cupom_has_Categorias
        (
            Cupom_id_cupom,
            Categorias_id_categorias
        )
        VALUES (?, ?)
    `;

    conexao.query(
        sql,
        [
            relacionamento.Cupom_id_cupom,
            relacionamento.Categorias_id_categorias
        ],
        callback
    );
}


//==========================================
// LISTAR RELACIONAMENTOS
//==========================================

function listar(callback) {

    const sql = `
        SELECT *
        FROM Cupom_has_Categorias
    `;

    conexao.query(sql, callback);
}


//==========================================
// BUSCAR RELACIONAMENTO
//==========================================

function buscarPorId(idCupom, idCategoria, callback) {

    const sql = `
        SELECT *
        FROM Cupom_has_Categorias
        WHERE Cupom_id_cupom = ?
        AND Categorias_id_categorias = ?
    `;

    conexao.query(
        sql,
        [
            idCupom,
            idCategoria
        ],
        callback
    );
}


//==========================================
// LISTAR CATEGORIAS DO CUPOM
//==========================================

function listarPorCupom(idCupom, callback) {

    const sql = `
        SELECT
            Categorias.*
        FROM Categorias
        INNER JOIN Cupom_has_Categorias
            ON Categorias.id_categorias =
               Cupom_has_Categorias.Categorias_id_categorias
        WHERE Cupom_has_Categorias.Cupom_id_cupom = ?
    `;

    conexao.query(
        sql,
        [idCupom],
        callback
    );
}


//==========================================
// EXCLUIR RELACIONAMENTO
//==========================================

function excluir(idCupom, idCategoria, callback) {

    const sql = `
        DELETE FROM Cupom_has_Categorias
        WHERE Cupom_id_cupom = ?
        AND Categorias_id_categorias = ?
    `;

    conexao.query(
        sql,
        [
            idCupom,
            idCategoria
        ],
        callback
    );
}


//==========================================
// EXCLUIR CATEGORIAS DO CUPOM
//==========================================

function excluirPorCupom(idCupom, callback) {

    const sql = `
        DELETE FROM Cupom_has_Categorias
        WHERE Cupom_id_cupom = ?
    `;

    conexao.query(
        sql,
        [idCupom],
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
    listarPorCupom,
    excluir,
    excluirPorCupom
};
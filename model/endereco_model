const conexao = require("../conexao/conexao.js");

// =========================
// Cadastrar Endereço
// =========================

function cadastrar(endereco, callback) {

    const sql = `
        INSERT INTO Endereco
        (
            rua,
            cep,
            bairro,
            numero,
            complemento,
            tipo
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    conexao.query(
        sql,
        [
            endereco.rua,
            endereco.cep,
            endereco.bairro,
            endereco.numero,
            endereco.complemento,
            endereco.tipo
        ],
        callback
    );

}

// =========================
// Listar Endereços
// =========================

function listar(callback) {

    const sql = `
        SELECT *
        FROM Endereco
    `;

    conexao.query(sql, callback);

}

// =========================
// Buscar Endereço por ID
// =========================

function buscarPorId(id, callback) {

    const sql = `
        SELECT *
        FROM Endereco
        WHERE id_endereco = ?
    `;

    conexao.query(sql, [id], callback);

}

// =========================
// Buscar Endereço por CEP
// =========================

function buscarPorCEP(cep, callback) {

    const sql = `
        SELECT *
        FROM Endereco
        WHERE cep = ?
    `;

    conexao.query(sql, [cep], callback);

}

// =========================
// Atualizar Endereço
// =========================

function atualizar(id, endereco, callback) {

    const sql = `
        UPDATE Endereco
        SET
            rua = ?,
            cep = ?,
            bairro = ?,
            numero = ?,
            complemento = ?,
            tipo = ?
        WHERE id_endereco = ?
    `;

    conexao.query(
        sql,
        [
            endereco.rua,
            endereco.cep,
            endereco.bairro,
            endereco.numero,
            endereco.complemento,
            endereco.tipo,
            id
        ],
        callback
    );

}

// =========================
// Excluir Endereço
// =========================

function excluir(id, callback) {

    const sql = `
        DELETE FROM Endereco
        WHERE id_endereco = ?
    `;

    conexao.query(sql, [id], callback);

}

module.exports = {
    cadastrar,
    listar,
    buscarPorId,
    buscarPorCEP,
    atualizar,
    excluir
};
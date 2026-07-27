const conexao = require("../conexao/conexao.js");

// =========================
// Cadastrar Lojista
// =========================

function cadastrar(lojista, callback) {

    const sql = `
        INSERT INTO Lojista
        (
            nome,
            cpf,
            cnpj,
            email,
            senha,
            telefone
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    conexao.query(
        sql,
        [
            lojista.nome,
            lojista.cpf,
            lojista.cnpj,
            lojista.email,
            lojista.senha,
            lojista.telefone
        ],
        callback
    );

}

// =========================
// Listar Lojistas
// =========================

function listar(callback) {

    const sql = `
        SELECT *
        FROM Lojista
    `;

    conexao.query(sql, callback);

}

// =========================
// Buscar Lojista por ID
// =========================

function buscarPorId(id, callback) {

    const sql = `
        SELECT *
        FROM Lojista
        WHERE id_lojista = ?
    `;

    conexao.query(sql, [id], callback);

}

// =========================
// Buscar Lojista por Email
// =========================

function buscarPorEmail(email, callback) {

    const sql = `
        SELECT *
        FROM Lojista
        WHERE email = ?
    `;

    conexao.query(sql, [email], callback);

}

// =========================
// Buscar Lojista por CPF
// =========================

function buscarPorCPF(cpf, callback) {

    const sql = `
        SELECT *
        FROM Lojista
        WHERE cpf = ?
    `;

    conexao.query(sql, [cpf], callback);

}

// =========================
// Buscar Lojista por CNPJ
// =========================

function buscarPorCNPJ(cnpj, callback) {

    const sql = `
        SELECT *
        FROM Lojista
        WHERE cnpj = ?
    `;

    conexao.query(sql, [cnpj], callback);

}

// =========================
// Atualizar Lojista
// =========================

function atualizar(id, lojista, callback) {

    const sql = `
        UPDATE Lojista
        SET
            nome = ?,
            cpf = ?,
            cnpj = ?,
            email = ?,
            senha = ?,
            telefone = ?
        WHERE id_lojista = ?
    `;

    conexao.query(
        sql,
        [
            lojista.nome,
            lojista.cpf,
            lojista.cnpj,
            lojista.email,
            lojista.senha,
            lojista.telefone,
            id
        ],
        callback
    );

}

// =========================
// Excluir Lojista
// =========================

function excluir(id, callback) {

    const sql = `
        DELETE FROM Lojista
        WHERE id_lojista = ?
    `;

    conexao.query(sql, [id], callback);

}

module.exports = {
    cadastrar,
    listar,
    buscarPorId,
    buscarPorEmail,
    buscarPorCPF,
    buscarPorCNPJ,
    atualizar,
    excluir
};
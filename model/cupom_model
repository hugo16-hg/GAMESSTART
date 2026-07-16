const conexao = require("../conexao/conexao.js");

// =========================
// Cadastrar Cupom
// =========================

function cadastrar(cupom, callback) {

    const sql = `
        INSERT INTO Cupom
        (
            nome,
            data_validade,
            quantidade,
            desconto,
            Loja_id_loja
        )
        VALUES (?, ?, ?, ?, ?)
    `;

    conexao.query(
        sql,
        [
            cupom.nome,
            cupom.data_validade,
            cupom.quantidade,
            cupom.desconto,
            cupom.Loja_id_loja
        ],
        callback
    );

}

// =========================
// Listar Cupons
// =========================

function listar(callback) {

    const sql = `
        SELECT *
        FROM Cupom
    `;

    conexao.query(sql, callback);

}

// =========================
// Buscar Cupom por ID
// =========================

function buscarPorId(id, callback) {

    const sql = `
        SELECT *
        FROM Cupom
        WHERE id_cupom = ?
    `;

    conexao.query(sql, [id], callback);

}

// =========================
// Buscar Cupom por Nome
// =========================

function buscarPorNome(nome, callback) {

    const sql = `
        SELECT *
        FROM Cupom
        WHERE nome = ?
    `;

    conexao.query(sql, [nome], callback);

}

// =========================
// Listar Cupons por Loja
// =========================

function listarPorLoja(idLoja, callback) {

    const sql = `
        SELECT *
        FROM Cupom
        WHERE Loja_id_loja = ?
    `;

    conexao.query(sql, [idLoja], callback);

}

// =========================
// Listar Cupons Válidos
// =========================

function listarValidos(callback) {

    const sql = `
        SELECT *
        FROM Cupom
        WHERE data_validade >= CURDATE()
        AND quantidade > 0
    `;

    conexao.query(sql, callback);

}

// =========================
// Atualizar Cupom
// =========================

function atualizar(id, cupom, callback) {

    const sql = `
        UPDATE Cupom
        SET
            nome = ?,
            data_validade = ?,
            quantidade = ?,
            desconto = ?,
            Loja_id_loja = ?
        WHERE id_cupom = ?
    `;

    conexao.query(
        sql,
        [
            cupom.nome,
            cupom.data_validade,
            cupom.quantidade,
            cupom.desconto,
            cupom.Loja_id_loja,
            id
        ],
        callback
    );

}

// =========================
// Excluir Cupom
// =========================

function excluir(id, callback) {

    const sql = `
        DELETE FROM Cupom
        WHERE id_cupom = ?
    `;

    conexao.query(sql, [id], callback);

}

module.exports = {
    cadastrar,
    listar,
    buscarPorId,
    buscarPorNome,
    listarPorLoja,
    listarValidos,
    atualizar,
    excluir
};
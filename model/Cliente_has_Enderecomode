const conexao = require("../conexao/conexao.js");

// =========================
// Vincular Cliente ao Endereço
// =========================

function cadastrar(clienteEndereco, callback) {

    const sql = `
        INSERT INTO Cliente_has_Endereco
        (
            Cliente_id_cliente,
            Endereco_id_endereco
        )
        VALUES (?, ?)
    `;

    conexao.query(
        sql,
        [
            clienteEndereco.Cliente_id_cliente,
            clienteEndereco.Endereco_id_endereco
        ],
        callback
    );

}

// =========================
// Listar Todos os Vínculos
// =========================

function listar(callback) {

    const sql = `
        SELECT *
        FROM Cliente_has_Endereco
    `;

    conexao.query(sql, callback);

}

// =========================
// Listar Endereços do Cliente
// =========================

function listarPorCliente(idCliente, callback) {

    const sql = `
        SELECT *
        FROM Cliente_has_Endereco
        WHERE Cliente_id_cliente = ?
    `;

    conexao.query(sql, [idCliente], callback);

}

// =========================
// Listar Clientes do Endereço
// =========================

function listarPorEndereco(idEndereco, callback) {

    const sql = `
        SELECT *
        FROM Cliente_has_Endereco
        WHERE Endereco_id_endereco = ?
    `;

    conexao.query(sql, [idEndereco], callback);

}

// =========================
// Excluir Vínculo
// =========================

function excluir(idCliente, idEndereco, callback) {

    const sql = `
        DELETE FROM Cliente_has_Endereco
        WHERE Cliente_id_cliente = ?
        AND Endereco_id_endereco = ?
    `;

    conexao.query(
        sql,
        [
            idCliente,
            idEndereco
        ],
        callback
    );

}

// =========================
// Excluir Todos os Endereços de um Cliente
// =========================

function excluirPorCliente(idCliente, callback) {

    const sql = `
        DELETE FROM Cliente_has_Endereco
        WHERE Cliente_id_cliente = ?
    `;

    conexao.query(sql, [idCliente], callback);

}

// =========================
// Excluir Todos os Clientes de um Endereço
// =========================

function excluirPorEndereco(idEndereco, callback) {

    const sql = `
        DELETE FROM Cliente_has_Endereco
        WHERE Endereco_id_endereco = ?
    `;

    conexao.query(sql, [idEndereco], callback);

}

module.exports = {
    cadastrar,
    listar,
    listarPorCliente,
    listarPorEndereco,
    excluir,
    excluirPorCliente,
    excluirPorEndereco
};
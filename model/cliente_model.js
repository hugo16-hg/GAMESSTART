//==========================================
// IMPORTA A CONEXÃO
//==========================================

const conexao = require("../conexao/conexao.js");


//==========================================
// CADASTRAR CLIENTE
//==========================================

function cadastrar(cliente, callback) {

    const sql = `
        INSERT INTO Cliente
        (
            nome,
            cpf,
            telefone,
            email,
            senha,
            data_nascimento,
            Loja_id_loja
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    conexao.query(
        sql,
        [
            cliente.nome,
            cliente.cpf,
            cliente.telefone,
            cliente.email,
            cliente.senha,
            cliente.data_nascimento,
            cliente.Loja_id_loja
        ],
        callback
    );
}


//==========================================
// LISTAR CLIENTES
//==========================================

function listar(callback) {

    const sql = `
        SELECT *
        FROM Cliente
    `;

    conexao.query(sql, callback);
}


//==========================================
// BUSCAR POR ID
//==========================================

function buscarPorId(id, callback) {

    const sql = `
        SELECT *
        FROM Cliente
        WHERE id_cliente = ?
    `;

    conexao.query(
        sql,
        [id],
        callback
    );
}


//==========================================
// BUSCAR POR EMAIL
//==========================================

function buscarPorEmail(email, callback) {

    const sql = `
        SELECT *
        FROM Cliente
        WHERE email = ?
    `;

    conexao.query(
        sql,
        [email],
        callback
    );
}


//==========================================
// BUSCAR POR CPF
//==========================================

function buscarPorCpf(cpf, callback) {

    const sql = `
        SELECT *
        FROM Cliente
        WHERE cpf = ?
    `;

    conexao.query(
        sql,
        [cpf],
        callback
    );
}


//==========================================
// ATUALIZAR CLIENTE
//==========================================

function atualizar(id, cliente, callback) {

    const sql = `
        UPDATE Cliente
        SET
            nome = ?,
            cpf = ?,
            telefone = ?,
            email = ?,
            senha = ?,
            data_nascimento = ?,
            Loja_id_loja = ?
        WHERE id_cliente = ?
    `;

    conexao.query(
        sql,
        [
            cliente.nome,
            cliente.cpf,
            cliente.telefone,
            cliente.email,
            cliente.senha,
            cliente.data_nascimento,
            cliente.Loja_id_loja,
            id
        ],
        callback
    );
}


//==========================================
// EXCLUIR CLIENTE
//==========================================

function excluir(id, callback) {

    const sql = `
        DELETE FROM Cliente
        WHERE id_cliente = ?
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
    buscarPorEmail,
    buscarPorCpf,
    atualizar,
    excluir

};
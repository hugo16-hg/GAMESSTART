const enderecoModel = require("../model/endereco_model.js");

function cadastrar(req, res) {

    const endereco = req.body;

    if (!endereco.rua || !endereco.cep || !endereco.bairro) {
        return res.status(400).json({
            sucesso: false,
            mensagem: "Preencha rua, CEP e bairro."
        });
    }

    endereco.numero = endereco.numero === undefined || endereco.numero === "" ? null : endereco.numero;
    endereco.complemento = endereco.complemento || null;
    endereco.tipo = endereco.tipo || null;

    enderecoModel.cadastrar(endereco, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao cadastrar endereço." });
        return res.status(201).json({
            sucesso: true,
            mensagem: "Endereço cadastrado com sucesso!",
            idEndereco: resultado.insertId
        });
    });
}

function listar(req, res) {
    enderecoModel.listar((erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao listar endereços.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function buscarPorId(req, res) {
    enderecoModel.buscarPorId(req.params.id, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao buscar endereço.", erro: erro.message });
        if (resultado.length === 0) return res.status(404).json({ sucesso: false, mensagem: "Endereço não encontrado." });
        return res.status(200).json(resultado[0]);
    });
}

function buscarPorCEP(req, res) {
    enderecoModel.buscarPorCEP(req.params.cep, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao buscar CEP.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function atualizar(req, res) {

    const endereco = req.body;

    if (!endereco.rua || !endereco.cep || !endereco.bairro) {
        return res.status(400).json({
            sucesso: false,
            mensagem: "Preencha rua, CEP e bairro."
        });
    }

    endereco.numero = endereco.numero === undefined || endereco.numero === "" ? null : endereco.numero;
    endereco.complemento = endereco.complemento || null;
    endereco.tipo = endereco.tipo || null;

    enderecoModel.atualizar(req.params.id, endereco, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao atualizar endereço." });
        if (resultado.affectedRows === 0) return res.status(404).json({ sucesso: false, mensagem: "Endereço não encontrado." });
        return res.status(200).json({ sucesso: true, mensagem: "Endereço atualizado com sucesso." });
    });
}

function excluir(req, res) {
    enderecoModel.excluir(req.params.id, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao excluir endereço." });
        if (resultado.affectedRows === 0) return res.status(404).json({ sucesso: false, mensagem: "Endereço não encontrado." });
        return res.status(200).json({ sucesso: true, mensagem: "Endereço excluído com sucesso." });
    });
}

module.exports = {
    cadastrar,
    listar,
    buscarPorId,
    buscarPorCEP,
    atualizar,
    excluir
};

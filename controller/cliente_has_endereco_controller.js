const ClienteHasEnderecoModel = require("../model/cliente_has_Endereco_model.js");

function cadastrar(req, res) {
    const dados = req.body;
    if (!dados.Cliente_id_cliente || !dados.Endereco_id_endereco) {
        return res.status(400).json({ sucesso: false, mensagem: "Informe cliente e endereço." });
    }
    ClienteHasEnderecoModel.cadastrar(dados, (erro) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao vincular cliente ao endereço." });
        return res.status(201).json({ sucesso: true, mensagem: "Endereço vinculado ao cliente com sucesso." });
    });
}

function listar(req, res) {
    ClienteHasEnderecoModel.listar((erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao listar vínculos.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function listarPorCliente(req, res) {
    ClienteHasEnderecoModel.listarPorCliente(req.params.idCliente, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao listar endereços do cliente.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function listarPorEndereco(req, res) {
    ClienteHasEnderecoModel.listarPorEndereco(req.params.idEndereco, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao listar clientes do endereço.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function excluir(req, res) {
    ClienteHasEnderecoModel.excluir(req.params.idCliente, req.params.idEndereco, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao excluir vínculo." });
        if (resultado.affectedRows === 0) return res.status(404).json({ sucesso: false, mensagem: "Vínculo não encontrado." });
        return res.status(200).json({ sucesso: true, mensagem: "Vínculo excluído com sucesso." });
    });
}

function excluirPorCliente(req, res) {
    ClienteHasEnderecoModel.excluirPorCliente(req.params.idCliente, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao excluir vínculos." });
        return res.status(200).json({ sucesso: true, removidos: resultado.affectedRows });
    });
}

function excluirPorEndereco(req, res) {
    ClienteHasEnderecoModel.excluirPorEndereco(req.params.idEndereco, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao excluir vínculos." });
        return res.status(200).json({ sucesso: true, removidos: resultado.affectedRows });
    });
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

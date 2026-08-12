const categoriasModel = require("../model/categorias_model.js");

function cadastrar(req, res) {

    const categoria = req.body;

    if (!categoria.nome) {
        return res.status(400).json({
            sucesso: false,
            mensagem: "Informe o nome da categoria."
        });
    }

    categoria.imagem = categoria.imagem || null;

    categoriasModel.cadastrar(categoria, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao cadastrar categoria." });
        return res.status(201).json({
            sucesso: true,
            mensagem: "Categoria cadastrada com sucesso!",
            idCategoria: resultado.insertId
        });
    });
}

function listar(req, res) {
    categoriasModel.listar((erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao listar categorias.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function buscarPorId(req, res) {
    categoriasModel.buscarPorId(req.params.id, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao buscar categoria.", erro: erro.message });
        if (resultado.length === 0) return res.status(404).json({ sucesso: false, mensagem: "Categoria não encontrada." });
        return res.status(200).json(resultado[0]);
    });
}

function buscarPorNome(req, res) {
    categoriasModel.buscarPorNome(req.params.nome, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao buscar categoria.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function atualizar(req, res) {

    const categoria = req.body;

    if (!categoria.nome) {
        return res.status(400).json({
            sucesso: false,
            mensagem: "Informe o nome da categoria."
        });
    }

    categoria.imagem = categoria.imagem || null;

    categoriasModel.atualizar(req.params.id, categoria, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao atualizar categoria." });
        if (resultado.affectedRows === 0) return res.status(404).json({ sucesso: false, mensagem: "Categoria não encontrada." });
        return res.status(200).json({ sucesso: true, mensagem: "Categoria atualizada com sucesso." });
    });
}

function excluir(req, res) {
    categoriasModel.excluir(req.params.id, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao excluir categoria." });
        if (resultado.affectedRows === 0) return res.status(404).json({ sucesso: false, mensagem: "Categoria não encontrada." });
        return res.status(200).json({ sucesso: true, mensagem: "Categoria excluída com sucesso." });
    });
}

module.exports = {
    cadastrar,
    listar,
    buscarPorId,
    buscarPorNome,
    atualizar,
    excluir
};

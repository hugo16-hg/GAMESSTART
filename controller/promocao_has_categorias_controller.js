const PromocaoHasCategoriasModel = require("../model/promocao_has_categorias_model.js");

function cadastrar(req, res) {
    const dados = req.body;
    if (!dados.Promocao_id_promocao || !dados.Categorias_id_categorias) {
        return res.status(400).json({ sucesso: false, mensagem: "Informe promoção e categoria." });
    }
    PromocaoHasCategoriasModel.cadastrar(dados, (erro) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao vincular categoria à promoção." });
        return res.status(201).json({ sucesso: true, mensagem: "Categoria vinculada à promoção com sucesso." });
    });
}

function listar(req, res) {
    PromocaoHasCategoriasModel.listar((erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao listar vínculos.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function listarPorPromocao(req, res) {
    PromocaoHasCategoriasModel.listarPorPromocao(req.params.idPromocao, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao listar categorias.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function buscarCategoriasPorPromocao(req, res) {
    PromocaoHasCategoriasModel.buscarCategoriasPorPromocao(req.params.idPromocao, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao buscar categorias.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function buscarPromocoesPorCategoria(req, res) {
    PromocaoHasCategoriasModel.buscarPromocoesPorCategoria(req.params.idCategoria, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao buscar promoções.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function listarPromocoesAtivasPorCategoria(req, res) {
    PromocaoHasCategoriasModel.listarPromocoesAtivasPorCategoria(req.params.idCategoria, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao listar promoções ativas.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function excluir(req, res) {
    PromocaoHasCategoriasModel.excluir(req.params.idPromocao, req.params.idCategoria, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao excluir vínculo." });
        return res.status(200).json({ sucesso: true, removidos: resultado.affectedRows });
    });
}

module.exports = {
    cadastrar,
    listar,
    listarPorPromocao,
    buscarCategoriasPorPromocao,
    buscarPromocoesPorCategoria,
    listarPromocoesAtivasPorCategoria,
    excluir
};

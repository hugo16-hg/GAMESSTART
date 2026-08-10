// ==========================================
// IMPORTA O MODEL
// ==========================================

const avaliacaoModel = require("../model/avaliacao_model.js");


// ==========================================
// CADASTRAR AVALIAÇÃO
// ==========================================

function cadastrar(req, res) {

    const avaliacao = req.body;

    // Validação dos campos obrigatórios
    if (
        !avaliacao.data_publicacao ||
        avaliacao.nota === undefined ||
        avaliacao.nota === null ||
        !avaliacao.Produto_id_produto
    ) {
        return res.status(400).json({
            sucesso: false,
            mensagem: "Preencha todos os campos."
        });
    }

    avaliacaoModel.cadastrar(avaliacao, (erro, resultado) => {

        if (erro) {
            console.error("Erro ao cadastrar avaliação:", erro);

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao cadastrar avaliação.",
                erro: erro.message
            });
        }

        return res.status(201).json({
            sucesso: true,
            mensagem: "Avaliação cadastrada com sucesso!",
            idAvaliacao: resultado.insertId
        });
    });
}


// ==========================================
// LISTAR AVALIAÇÕES
// ==========================================

function listar(req, res) {

    avaliacaoModel.listar((erro, resultado) => {

        if (erro) {
            console.error("Erro ao listar avaliações:", erro);

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao listar avaliações.",
                erro: erro.message
            });
        }

        return res.json(resultado);
    });
}


// ==========================================
// BUSCAR AVALIAÇÃO POR ID
// ==========================================

function buscarPorId(req, res) {

    const id = req.params.id;

    avaliacaoModel.buscarPorId(id, (erro, resultado) => {

        if (erro) {
            console.error("Erro ao buscar avaliação:", erro);

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao buscar avaliação.",
                erro: erro.message
            });
        }

        if (resultado.length === 0) {
            return res.status(404).json({
                sucesso: false,
                mensagem: "Avaliação não encontrada."
            });
        }

        return res.json(resultado[0]);
    });
}


// ==========================================
// ATUALIZAR AVALIAÇÃO
// ==========================================

function atualizar(req, res) {

    const id = req.params.id;
    const avaliacao = req.body;

    avaliacaoModel.atualizar(id, avaliacao, (erro, resultado) => {

        if (erro) {
            console.error("Erro ao atualizar avaliação:", erro);

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao atualizar avaliação.",
                erro: erro.message
            });
        }

        return res.json({
            sucesso: true,
            mensagem: "Avaliação atualizada com sucesso."
        });
    });
}


// ==========================================
// EXCLUIR AVALIAÇÃO
// ==========================================

function excluir(req, res) {

    const id = req.params.id;

    avaliacaoModel.excluir(id, (erro, resultado) => {

        if (erro) {
            console.error("Erro ao excluir avaliação:", erro);

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao excluir avaliação.",
                erro: erro.message
            });
        }

        return res.json({
            sucesso: true,
            mensagem: "Avaliação excluída com sucesso."
        });
    });
}


// ==========================================
// EXPORTAÇÃO
// ==========================================

module.exports = {
    cadastrar,
    listar,
    buscarPorId,
    atualizar,
    excluir
};
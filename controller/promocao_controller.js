//==========================================
// IMPORTA O MODEL
// passe aqui o caminho correto do seu arquivo model
//==========================================

const promocaoModel = require("../model/promocao_model.js");


//==========================================
// CADASTRAR PROMOÇÃO
//==========================================

function cadastrar(req, res) {

    const promocao = req.body;

    // Validação dos campos obrigatórios

    if (
        !promocao.data_inicio ||
        !promocao.valor_promocional ||
        !promocao.nome ||
        !promocao.Banner_id_banner
    ) {

        return res.status(400).json({
            sucesso: false,
            mensagem: "Preencha todos os campos."
        });

    }

    // Cadastra a promoção

    promocaoModel.cadastrar(promocao, (erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao cadastrar promoção."
            });

        }

        return res.status(201).json({

            sucesso: true,
            mensagem: "Promoção cadastrada com sucesso!",
            idPromocao: resultado.insertId

        });

    });

}


//==========================================
// LISTAR PROMOÇÕES
//==========================================

function listar(req, res) {

    promocaoModel.listar((erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao listar promoções."
            });

        }

        // Retorna a lista de promoções em formato JSON

        res.json(resultado);

    });

}


//==========================================
// BUSCAR PROMOÇÃO POR ID
//==========================================

function buscarPorId(req, res) {

    const id = req.params.id;

    promocaoModel.buscarPorId(id, (erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao buscar promoção."
            });

        }

        if (resultado.length === 0) {

            return res.status(404).json({
                sucesso: false,
                mensagem: "Promoção não encontrada."
            });

        }

        // Retorna a promoção encontrada em formato JSON

        res.json(resultado[0]);

    });

}


//==========================================
// ATUALIZAR PROMOÇÃO
//==========================================

function atualizar(req, res) {

    // Obtém o ID da promoção a ser atualizada a partir dos parâmetros da URL

    const id = req.params.id;

    // Obtém os dados atualizados da promoção a partir do corpo da requisição

    const promocao = req.body;

    promocaoModel.atualizar(id, promocao, (erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao atualizar promoção."
            });

        }

        res.json({
            sucesso: true,
            mensagem: "Promoção atualizada com sucesso."
        });

    });

}


//==========================================
// EXCLUIR PROMOÇÃO
//==========================================

function excluir(req, res) {

    // Obtém o ID da promoção a ser excluída a partir dos parâmetros da URL

    const id = req.params.id;

    promocaoModel.excluir(id, (erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao excluir promoção."
            });

        }

        res.json({
            sucesso: true,
            mensagem: "Promoção excluída com sucesso."
        });

    });

}


//==========================================
// EXPORTAÇÃO
//==========================================

module.exports = {

    cadastrar,
    listar,
    buscarPorId,
    atualizar,
    excluir

};
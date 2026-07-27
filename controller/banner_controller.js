//==========================================
// IMPORTA O MODEL
// passe aqui o caminho correto do seu arquivo model
//==========================================

const bannerModel = require("../model/banner_model.js");


//==========================================
// CADASTRAR BANNER
//==========================================

function cadastrar(req, res) {

    const banner = req.body;

    // Validação dos campos obrigatórios

    if (
        !banner.imagem ||
        !banner.data_inicio ||
        banner.statutos_visibilidade === undefined ||
        !banner.Loja_id_loja
    ) {

        return res.status(400).json({
            sucesso: false,
            mensagem: "Preencha todos os campos."
        });

    }

    // Cadastra o banner

    bannerModel.cadastrar(banner, (erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao cadastrar banner."
            });

        }

        return res.status(201).json({

            sucesso: true,
            mensagem: "Banner cadastrado com sucesso!",
            idBanner: resultado.insertId

        });

    });

}


//==========================================
// LISTAR BANNERS
//==========================================

function listar(req, res) {

    bannerModel.listar((erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao listar banners."
            });

        }

        // Retorna a lista de banners em formato JSON

        res.json(resultado);

    });

}


//==========================================
// BUSCAR BANNER POR ID
//==========================================

function buscarPorId(req, res) {

    const id = req.params.id;

    bannerModel.buscarPorId(id, (erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao buscar banner."
            });

        }

        if (resultado.length === 0) {

            return res.status(404).json({
                sucesso: false,
                mensagem: "Banner não encontrado."
            });

        }

        // Retorna o banner encontrado em formato JSON

        res.json(resultado[0]);

    });

}


//==========================================
// ATUALIZAR BANNER
//==========================================

function atualizar(req, res) {

    // Obtém o ID do banner a ser atualizado a partir dos parâmetros da URL

    const id = req.params.id;

    // Obtém os dados atualizados do banner a partir do corpo da requisição

    const banner = req.body;

    bannerModel.atualizar(id, banner, (erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao atualizar banner."
            });

        }

        res.json({
            sucesso: true,
            mensagem: "Banner atualizado com sucesso."
        });

    });

}


//==========================================
// EXCLUIR BANNER
//==========================================

function excluir(req, res) {

    // Obtém o ID do banner a ser excluído a partir dos parâmetros da URL

    const id = req.params.id;

    bannerModel.excluir(id, (erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao excluir banner."
            });

        }

        res.json({
            sucesso: true,
            mensagem: "Banner excluído com sucesso."
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
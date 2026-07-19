//==========================================
// IMPORTA O MODEL
// passe aqui o caminho correto do seu arquivo model
//==========================================

const cupomModel = require("../model/cupom_model");


//==========================================
// CADASTRAR CUPOM
//==========================================

function cadastrar(req, res) {

    const cupom = req.body;

    // Validação dos campos obrigatórios

    if (
        !cupom.nome ||
        !cupom.data_validade ||
        !cupom.quantidade ||
        !cupom.desconto ||
        !cupom.Loja_id_loja
    ) {

        return res.status(400).json({
            sucesso: false,
            mensagem: "Preencha todos os campos."
        });

    }

    // Cadastra o cupom

    cupomModel.cadastrar(cupom, (erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao cadastrar cupom."
            });

        }

        return res.status(201).json({

            sucesso: true,
            mensagem: "Cupom cadastrado com sucesso!",
            idCupom: resultado.insertId

        });

    });

}


//==========================================
// LISTAR CUPONS
//==========================================

function listar(req, res) {

    cupomModel.listar((erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao listar cupons."
            });

        }

        // Retorna a lista de cupons em formato JSON

        res.json(resultado);

    });

}


//==========================================
// BUSCAR CUPOM POR ID
//==========================================

function buscarPorId(req, res) {

    const id = req.params.id;

    cupomModel.buscarPorId(id, (erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao buscar cupom."
            });

        }

        if (resultado.length === 0) {

            return res.status(404).json({
                sucesso: false,
                mensagem: "Cupom não encontrado."
            });

        }

        // Retorna o cupom encontrado em formato JSON

        res.json(resultado[0]);

    });

}


//==========================================
// ATUALIZAR CUPOM
//==========================================

function atualizar(req, res) {

    // Obtém o ID do cupom a ser atualizado a partir dos parâmetros da URL

    const id = req.params.id;

    // Obtém os dados atualizados do cupom a partir do corpo da requisição

    const cupom = req.body;

    cupomModel.atualizar(id, cupom, (erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao atualizar cupom."
            });

        }

        res.json({
            sucesso: true,
            mensagem: "Cupom atualizado com sucesso."
        });

    });

}


//==========================================
// EXCLUIR CUPOM
//==========================================

function excluir(req, res) {

    // Obtém o ID do cupom a ser excluído a partir dos parâmetros da URL

    const id = req.params.id;

    cupomModel.excluir(id, (erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao excluir cupom."
            });

        }

        res.json({
            sucesso: true,
            mensagem: "Cupom excluído com sucesso."
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
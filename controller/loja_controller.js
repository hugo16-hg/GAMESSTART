//==========================================
// IMPORTA O MODEL
// passe aqui o caminho correto do seu arquivo model
//==========================================

const lojaModel = require("../model/loja_model");


//==========================================
// CADASTRAR LOJA
//==========================================

function cadastrar(req, res) {

    const loja = req.body;

    // Validação dos campos obrigatórios

    if (
        !loja.nome ||
        !loja.whatsapp ||
        !loja.telefone ||
        !loja.email ||
        !loja.Lojista_id_lojista ||
        !loja.Endereco_id_endereco
    ) {

        return res.status(400).json({
            sucesso: false,
            mensagem: "Preencha todos os campos."
        });

    }

    // Verifica se já existe uma loja com o mesmo e-mail

    lojaModel.buscarPorEmail(loja.email, (erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao consultar o banco de dados."
            });

        }

        if (resultado.length > 0) {

            return res.status(409).json({
                sucesso: false,
                mensagem: "E-mail já cadastrado."
            });

        }

        // Cadastra a loja

        lojaModel.cadastrar(loja, (erro, resultado) => {

            if (erro) {

                return res.status(500).json({
                    sucesso: false,
                    mensagem: "Erro ao cadastrar loja."
                });

            }

            return res.status(201).json({

                sucesso: true,
                mensagem: "Loja cadastrada com sucesso!",
                idLoja: resultado.insertId

            });

        });

    });

}


//==========================================
// LISTAR LOJAS
//==========================================

function listar(req, res) {

    lojaModel.listar((erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao listar lojas."
            });

        }

        // Retorna a lista de lojas em formato JSON

        res.json(resultado);

    });

}


//==========================================
// BUSCAR LOJA POR ID
//==========================================

function buscarPorId(req, res) {

    const id = req.params.id;

    lojaModel.buscarPorId(id, (erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao buscar loja."
            });

        }

        if (resultado.length === 0) {

            return res.status(404).json({
                sucesso: false,
                mensagem: "Loja não encontrada."
            });

        }

        // Retorna a loja encontrada em formato JSON

        res.json(resultado[0]);

    });

}


//==========================================
// ATUALIZAR LOJA
//==========================================

function atualizar(req, res) {

    // Obtém o ID da loja a ser atualizada a partir dos parâmetros da URL

    const id = req.params.id;

    // Obtém os dados atualizados da loja a partir do corpo da requisição

    const loja = req.body;

    lojaModel.atualizar(id, loja, (erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao atualizar loja."
            });

        }

        res.json({
            sucesso: true,
            mensagem: "Loja atualizada com sucesso."
        });

    });

}


//==========================================
// EXCLUIR LOJA
//==========================================

function excluir(req, res) {

    // Obtém o ID da loja a ser excluída a partir dos parâmetros da URL

    const id = req.params.id;

    lojaModel.excluir(id, (erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao excluir loja."
            });

        }

        res.json({
            sucesso: true,
            mensagem: "Loja excluída com sucesso."
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
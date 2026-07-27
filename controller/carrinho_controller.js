//==========================================
// IMPORTA O MODEL
// passe aqui o caminho correto do seu arquivo model
//==========================================

const carrinhoModel = require("../model/carrinho_model.js");


//==========================================
// CADASTRAR CARRINHO
//==========================================

function cadastrar(req, res) {

    const carrinho = req.body;

    // Validação dos campos obrigatórios
    // Nesta tabela não existem campos NOT NULL além da chave primária
    // que é AUTO_INCREMENT, portanto não há validação obrigatória.

    // Cadastra o carrinho

    carrinhoModel.cadastrar(carrinho, (erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao cadastrar carrinho."
            });

        }

        return res.status(201).json({

            sucesso: true,
            mensagem: "Carrinho cadastrado com sucesso!",
            idCarrinho: resultado.insertId

        });

    });

}


//==========================================
// LISTAR CARRINHOS
//==========================================

function listar(req, res) {

    carrinhoModel.listar((erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao listar carrinhos."
            });

        }

        // Retorna a lista de carrinhos em formato JSON

        res.json(resultado);

    });

}


//==========================================
// BUSCAR CARRINHO POR ID
//==========================================

function buscarPorId(req, res) {

    const id = req.params.id;

    carrinhoModel.buscarPorId(id, (erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao buscar carrinho."
            });

        }

        if (resultado.length === 0) {

            return res.status(404).json({
                sucesso: false,
                mensagem: "Carrinho não encontrado."
            });

        }

        // Retorna o carrinho encontrado em formato JSON

        res.json(resultado[0]);

    });

}


//==========================================
// ATUALIZAR CARRINHO
//==========================================

function atualizar(req, res) {

    // Obtém o ID do carrinho a ser atualizado a partir dos parâmetros da URL

    const id = req.params.id;

    // Obtém os dados atualizados do carrinho a partir do corpo da requisição

    const carrinho = req.body;

    carrinhoModel.atualizar(id, carrinho, (erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao atualizar carrinho."
            });

        }

        res.json({
            sucesso: true,
            mensagem: "Carrinho atualizado com sucesso."
        });

    });

}


//==========================================
// EXCLUIR CARRINHO
//==========================================

function excluir(req, res) {

    // Obtém o ID do carrinho a ser excluído a partir dos parâmetros da URL

    const id = req.params.id;

    carrinhoModel.excluir(id, (erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao excluir carrinho."
            });

        }

        res.json({
            sucesso: true,
            mensagem: "Carrinho excluído com sucesso."
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
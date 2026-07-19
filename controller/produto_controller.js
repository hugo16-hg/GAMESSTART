//==========================================
// IMPORTA O MODEL
// passe aqui o caminho correto do seu arquivo model
//==========================================

const produtoModel = require("../model/produto_model");


//==========================================
// CADASTRAR PRODUTO
//==========================================

function cadastrar(req, res) {

    const produto = req.body;

    // Validação dos campos obrigatórios

    if (
        !produto.nome ||
        !produto.descricao ||
        !produto.codigo ||
        !produto.preco_antigo ||
        !produto.quantidade_estoque ||
        !produto.Loja_id_loja ||
        !produto.Lojista_id_Lojista
    ) {

        return res.status(400).json({
            sucesso: false,
            mensagem: "Preencha todos os campos."
        });

    }

    // Cadastra o produto

    produtoModel.cadastrar(produto, (erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao cadastrar produto."
            });

        }

        return res.status(201).json({

            sucesso: true,
            mensagem: "Produto cadastrado com sucesso!",
            idProduto: resultado.insertId

        });

    });

}


//==========================================
// LISTAR PRODUTOS
//==========================================

function listar(req, res) {

    produtoModel.listar((erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao listar produtos."
            });

        }

        // Retorna a lista de produtos em formato JSON

        res.json(resultado);

    });

}


//==========================================
// BUSCAR PRODUTO POR ID
//==========================================

function buscarPorId(req, res) {

    const id = req.params.id;

    produtoModel.buscarPorId(id, (erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao buscar produto."
            });

        }

        if (resultado.length === 0) {

            return res.status(404).json({
                sucesso: false,
                mensagem: "Produto não encontrado."
            });

        }

        // Retorna o produto encontrado em formato JSON

        res.json(resultado[0]);

    });

}


//==========================================
// ATUALIZAR PRODUTO
//==========================================

function atualizar(req, res) {

    // Obtém o ID do produto a ser atualizado a partir dos parâmetros da URL

    const id = req.params.id;

    // Obtém os dados atualizados do produto a partir do corpo da requisição

    const produto = req.body;

    produtoModel.atualizar(id, produto, (erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao atualizar produto."
            });

        }

        res.json({
            sucesso: true,
            mensagem: "Produto atualizado com sucesso."
        });

    });

}


//==========================================
// EXCLUIR PRODUTO
//==========================================

function excluir(req, res) {

    // Obtém o ID do produto a ser excluído a partir dos parâmetros da URL

    const id = req.params.id;

    produtoModel.excluir(id, (erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao excluir produto."
            });

        }

        res.json({
            sucesso: true,
            mensagem: "Produto excluído com sucesso."
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
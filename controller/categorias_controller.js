//==========================================
// IMPORTA O MODEL
// passe aqui o caminho correto do seu arquivo model
//==========================================

const categoriasModel = require("../model/categorias_model");


//==========================================
// CADASTRAR CATEGORIA
//==========================================

function cadastrar(req, res) {

    const categoria = req.body;

    // Validação dos campos obrigatórios

    if (
        !categoria.nome
    ) {

        return res.status(400).json({
            sucesso: false,
            mensagem: "Preencha todos os campos."
        });

    }

    // Cadastra a categoria

    categoriasModel.cadastrar(categoria, (erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao cadastrar categoria."
            });

        }

        return res.status(201).json({

            sucesso: true,
            mensagem: "Categoria cadastrada com sucesso!",
            idCategoria: resultado.insertId

        });

    });

}


//==========================================
// LISTAR CATEGORIAS
//==========================================

function listar(req, res) {

    categoriasModel.listar((erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao listar categorias."
            });

        }

        // Retorna a lista de categorias em formato JSON

        res.json(resultado);

    });

}


//==========================================
// BUSCAR CATEGORIA POR ID
//==========================================

function buscarPorId(req, res) {

    const id = req.params.id;

    categoriasModel.buscarPorId(id, (erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao buscar categoria."
            });

        }

        if (resultado.length === 0) {

            return res.status(404).json({
                sucesso: false,
                mensagem: "Categoria não encontrada."
            });

        }

        // Retorna a categoria encontrada em formato JSON

        res.json(resultado[0]);

    });

}


//==========================================
// ATUALIZAR CATEGORIA
//==========================================

function atualizar(req, res) {

    // Obtém o ID da categoria a ser atualizada a partir dos parâmetros da URL

    const id = req.params.id;

    // Obtém os dados atualizados da categoria a partir do corpo da requisição

    const categoria = req.body;

    categoriasModel.atualizar(id, categoria, (erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao atualizar categoria."
            });

        }

        res.json({
            sucesso: true,
            mensagem: "Categoria atualizada com sucesso."
        });

    });

}


//==========================================
// EXCLUIR CATEGORIA
//==========================================

function excluir(req, res) {

    // Obtém o ID da categoria a ser excluída a partir dos parâmetros da URL

    const id = req.params.id;

    categoriasModel.excluir(id, (erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao excluir categoria."
            });

        }

        res.json({
            sucesso: true,
            mensagem: "Categoria excluída com sucesso."
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
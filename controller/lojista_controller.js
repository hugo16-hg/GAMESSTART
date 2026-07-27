//==========================================
// IMPORTA O MODEL
// passe aqui o caminho correto do seu arquivo model
//==========================================

const lojistaModel = require("../model/lojista_model.js");

//==========================================
// CADASTRAR LOJISTA
//==========================================

function cadastrar(req, res) {

    const lojista = req.body;

    // Validação dos campos obrigatórios

    if (
        !lojista.nome ||
        !lojista.cpf ||
        !lojista.email ||
        !lojista.senha
    ) {

        return res.status(400).json({
            sucesso: false,
            mensagem: "Preencha todos os campos obrigatórios."
        });

    }

    // Verifica se já existe um usuário com o mesmo e-mail

    lojistaModel.buscarPorEmail(lojista.email, (erro, resultado) => {

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

        // Cadastra o lojista

        lojistaModel.cadastrar(lojista, (erro, resultado) => {

            if (erro) {

                return res.status(500).json({
                    sucesso: false,
                    mensagem: "Erro ao cadastrar lojista."
                });

            }

            return res.status(201).json({

                sucesso: true,
                mensagem: "Lojista cadastrado com sucesso!",
                idLojista: resultado.insertId

            });

        });

    });

}

//==========================================
// LISTAR LOJISTAS
//==========================================

function listar(req, res) {

    lojistaModel.listar((erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao listar lojistas."
            });

        }

        res.json(resultado);

    });

}

//==========================================
// BUSCAR LOJISTA POR ID
//==========================================

function buscarPorId(req, res) {

    const id = req.params.id;

    lojistaModel.buscarPorId(id, (erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao buscar lojista."
            });

        }

        if (resultado.length === 0) {

            return res.status(404).json({
                sucesso: false,
                mensagem: "Lojista não encontrado."
            });

        }

        res.json(resultado[0]);

    });

}

//==========================================
// ATUALIZAR LOJISTA
//==========================================

function atualizar(req, res) {

    const id = req.params.id;
    const lojista = req.body;

    lojistaModel.atualizar(id, lojista, (erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao atualizar lojista."
            });

        }

        res.json({
            sucesso: true,
            mensagem: "Lojista atualizado com sucesso."
        });

    });

}

//==========================================
// EXCLUIR LOJISTA
//==========================================

function excluir(req, res) {

    const id = req.params.id;

    lojistaModel.excluir(id, (erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao excluir lojista."
            });

        }

        res.json({
            sucesso: true,
            mensagem: "Lojista excluído com sucesso."
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
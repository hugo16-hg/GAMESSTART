const lojistaModel = require("../model/lojista_model.js");

function cadastrar(req, res) {

    const lojista = req.body;

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

    lojista.cnpj = lojista.cnpj || null;
    lojista.telefone = lojista.telefone || null;

    lojistaModel.buscarPorEmail(lojista.email, (erro, resultado) => {

        if (erro) {
            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao consultar o banco.",
                erro: erro.message
            });
        }

        if (resultado.length > 0) {
            return res.status(409).json({
                sucesso: false,
                mensagem: "E-mail já cadastrado."
            });
        }

        lojistaModel.buscarPorCPF(lojista.cpf, (erroCpf, resultadoCpf) => {

            if (erroCpf) {
                return res.status(500).json({
                    sucesso: false,
                    mensagem: "Erro ao consultar CPF.",
                    erro: erroCpf.message
                });
            }

            if (resultadoCpf.length > 0) {
                return res.status(409).json({
                    sucesso: false,
                    mensagem: "CPF já cadastrado."
                });
            }

            lojistaModel.cadastrar(lojista, (erroCadastro, resultadoCadastro) => {
                if (erroCadastro) return res.status(500).json({ sucesso: false, mensagem: erroCadastro.sqlMessage || "Erro ao cadastrar lojista." });
                return res.status(201).json({
                    sucesso: true,
                    mensagem: "Lojista cadastrado com sucesso!",
                    idLojista: resultadoCadastro.insertId
                });
            });
        });
    });
}

function listar(req, res) {
    lojistaModel.listar((erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao listar lojistas.", erro: erro.message });
        return res.status(200).json(resultado);
    });
}

function buscarPorId(req, res) {
    lojistaModel.buscarPorId(req.params.id, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: "Erro ao buscar lojista.", erro: erro.message });
        if (resultado.length === 0) return res.status(404).json({ sucesso: false, mensagem: "Lojista não encontrado." });
        return res.status(200).json(resultado[0]);
    });
}

function atualizar(req, res) {

    const lojista = req.body;

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

    lojista.cnpj = lojista.cnpj || null;
    lojista.telefone = lojista.telefone || null;

    lojistaModel.atualizar(req.params.id, lojista, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao atualizar lojista." });
        if (resultado.affectedRows === 0) return res.status(404).json({ sucesso: false, mensagem: "Lojista não encontrado." });
        return res.status(200).json({ sucesso: true, mensagem: "Lojista atualizado com sucesso." });
    });
}

function excluir(req, res) {
    lojistaModel.excluir(req.params.id, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao excluir lojista." });
        if (resultado.affectedRows === 0) return res.status(404).json({ sucesso: false, mensagem: "Lojista não encontrado." });
        return res.status(200).json({ sucesso: true, mensagem: "Lojista excluído com sucesso." });
    });
}

//=====================================================
// LOGIN LOJISTA
//=====================================================

function login(req, res) {

    const {
        email,
        senha
    } = req.body;


    if (
        !email ||
        !senha
    ) {

        return res.status(400).json({

            sucesso: false,

            mensagem:
                "Informe e-mail e senha."

        });

    }


    lojistaModel.buscarPorEmail(
        email,
        (erro, resultado) => {


            if (erro) {

                return res.status(500).json({

                    sucesso: false,

                    mensagem:
                        "Erro ao consultar o banco."

                });

            }


            if (
                resultado.length === 0
            ) {

                return res.status(401).json({

                    sucesso: false,

                    mensagem:
                        "E-mail ou senha incorretos."

                });

            }


            const lojista =
                resultado[0];


            if (
                lojista.senha !== senha
            ) {

                return res.status(401).json({

                    sucesso: false,

                    mensagem:
                        "E-mail ou senha incorretos."

                });

            }


            return res.status(200).json({

                sucesso: true,

                mensagem:
                    "Login realizado com sucesso!",

                lojista: {

                    id_lojista:
                        lojista.id_lojista,

                    nome:
                        lojista.nome,

                    cpf:
                        lojista.cpf,

                    cnpj:
                        lojista.cnpj,

                    email:
                        lojista.email,

                    telefone:
                        lojista.telefone

                }

            });

        }
    );

}

module.exports = {
    cadastrar,
    listar,
    buscarPorId,
    atualizar,
    excluir,
    login
};

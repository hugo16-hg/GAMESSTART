//==========================================
// IMPORTA O MODEL
//==========================================

const clienteModel = require("../model/cliente_model.js");

//==========================================
// CADASTRAR CLIENTE
//==========================================

function cadastrar(req, res) {

    const cliente = req.body;

    if (!cliente.Loja_id_loja) {
        cliente.Loja_id_loja = 1;
    }

    if (
        !cliente.nome ||
        !cliente.cpf ||
        !cliente.telefone ||
        !cliente.email ||
        !cliente.senha ||
        !cliente.data_nascimento
    ) {
        return res.status(400).json({
            sucesso: false,
            mensagem: "Preencha todos os campos."
        });
    }

    clienteModel.buscarPorEmail(cliente.email, (erroEmail, resultadoEmail) => {

        if (erroEmail) {
            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao consultar o e-mail.",
                erro: erroEmail.message
            });
        }

        if (resultadoEmail.length > 0) {
            return res.status(409).json({
                sucesso: false,
                mensagem: "Este e-mail já está cadastrado."
            });
        }

        clienteModel.buscarPorCpf(cliente.cpf, (erroCpf, resultadoCpf) => {

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
                    mensagem: "Este CPF já está cadastrado."
                });
            }

            clienteModel.cadastrar(cliente, (erroCadastro, resultadoCadastro) => {

                if (erroCadastro) {
                    return res.status(500).json({
                        sucesso: false,
                        mensagem: erroCadastro.sqlMessage || "Erro ao cadastrar cliente."
                    });
                }

                return res.status(201).json({
                    sucesso: true,
                    mensagem: "Cliente cadastrado com sucesso!",
                    id_cliente: resultadoCadastro.insertId
                });
            });
        });
    });
}

//==========================================
// LOGIN
//==========================================

function login(req, res) {

    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({
            sucesso: false,
            mensagem: "Informe e-mail e senha."
        });
    }

    clienteModel.buscarPorEmail(email, (erro, resultado) => {

        if (erro) {
            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao consultar o banco.",
                erro: erro.message
            });
        }

        if (resultado.length === 0) {
            return res.status(401).json({
                sucesso: false,
                mensagem: "E-mail ou senha incorretos."
            });
        }

        const cliente = resultado[0];

        if (cliente.senha !== senha) {
            return res.status(401).json({
                sucesso: false,
                mensagem: "E-mail ou senha incorretos."
            });
        }

        return res.status(200).json({
            sucesso: true,
            mensagem: "Login realizado com sucesso!",
            cliente: {
                id_cliente: cliente.id_cliente,
                nome: cliente.nome,
                cpf: cliente.cpf,
                telefone: cliente.telefone,
                email: cliente.email,
                data_nascimento: cliente.data_nascimento,
                Loja_id_loja: cliente.Loja_id_loja
            }
        });
    });
}

//==========================================
// LISTAR CLIENTES
//==========================================

function listar(req, res) {

    clienteModel.listar((erro, resultado) => {

        if (erro) {
            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao listar clientes.",
                erro: erro.message
            });
        }

        return res.status(200).json(resultado);
    });
}

//==========================================
// BUSCAR CLIENTE POR ID
//==========================================

function buscarPorId(req, res) {

    const id = req.params.id;

    clienteModel.buscarPorId(id, (erro, resultado) => {

        if (erro) {
            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao buscar cliente.",
                erro: erro.message
            });
        }

        if (resultado.length === 0) {
            return res.status(404).json({
                sucesso: false,
                mensagem: "Cliente não encontrado."
            });
        }

        return res.status(200).json(resultado[0]);
    });
}

//==========================================
// ATUALIZAR CLIENTE
//==========================================

function atualizar(req, res) {

    const id = req.params.id;
    const cliente = req.body;

    if (
        !cliente.nome ||
        !cliente.cpf ||
        !cliente.telefone ||
        !cliente.email ||
        !cliente.senha ||
        !cliente.data_nascimento ||
        !cliente.Loja_id_loja
    ) {
        return res.status(400).json({
            sucesso: false,
            mensagem: "Preencha todos os campos."
        });
    }

    clienteModel.atualizar(id, cliente, (erro, resultado) => {

        if (erro) {
            return res.status(500).json({
                sucesso: false,
                mensagem: erro.sqlMessage || "Erro ao atualizar cliente."
            });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                sucesso: false,
                mensagem: "Cliente não encontrado."
            });
        }

        return res.status(200).json({
            sucesso: true,
            mensagem: "Cliente atualizado com sucesso."
        });
    });
}

//==========================================
// EXCLUIR CLIENTE
//==========================================

function excluir(req, res) {

    const id = req.params.id;

    clienteModel.excluir(id, (erro, resultado) => {

        if (erro) {
            return res.status(500).json({
                sucesso: false,
                mensagem: erro.sqlMessage || "Erro ao excluir cliente."
            });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                sucesso: false,
                mensagem: "Cliente não encontrado."
            });
        }

        return res.status(200).json({
            sucesso: true,
            mensagem: "Cliente excluído com sucesso."
        });
    });
}

//==========================================
// EXPORTAÇÃO
//==========================================

module.exports = {
    cadastrar,
    login,
    listar,
    buscarPorId,
    atualizar,
    excluir
};

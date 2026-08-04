//==========================================
// IMPORTA O MODEL
//==========================================

const clienteModel = require("../model/cliente_model.js");

//==========================================
// CADASTRAR CLIENTE
//==========================================

function cadastrar(req, res) {

    const cliente = req.body;

    // Caso não seja enviado o código da loja
    if (!cliente.Loja_idloja) {
        cliente.Loja_idloja = 1;
    }

    // Validação dos campos obrigatórios
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

    // Verifica se já existe um cliente com o mesmo e-mail
    clienteModel.buscarPorEmail(cliente.email, (erro, resultado) => {

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

        // Cadastra o cliente
        clienteModel.cadastrar(cliente, (erro, resultado) => {

            if (erro) {
                return res.status(500).json({
                    sucesso: false,
                    mensagem: "Erro ao cadastrar cliente."
                });
            }

            return res.status(201).json({
                sucesso: true,
                mensagem: "Cliente cadastrado com sucesso!",
                id_cliente: resultado.insertId
            });

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
                mensagem: "Erro ao listar clientes."
            });
        }

        res.status(200).json(resultado);

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
                mensagem: "Erro ao buscar cliente."
            });
        }

        if (resultado.length === 0) {
            return res.status(404).json({
                sucesso: false,
                mensagem: "Cliente não encontrado."
            });
        }

        res.status(200).json(resultado[0]);

    });

}

//==========================================
// ATUALIZAR CLIENTE
//==========================================

function atualizar(req, res) {

    const id = req.params.id;
    const cliente = req.body;

    clienteModel.atualizar(id, cliente, (erro, resultado) => {

        if (erro) {
            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao atualizar cliente."
            });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                sucesso: false,
                mensagem: "Cliente não encontrado."
            });
        }

        res.status(200).json({
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
                mensagem: "Erro ao excluir cliente."
            });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                sucesso: false,
                mensagem: "Cliente não encontrado."
            });
        }

        res.status(200).json({
            sucesso: true,
            mensagem: "Cliente excluído com sucesso."
        });

    });

}

function login(req, res) {

    const { email, senha } = req.body;

    clienteModel.buscarPorEmail(email, (erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro interno."
            });

        }

        if (resultado.length === 0) {

            return res.json({
                sucesso: false,
                mensagem: "E-mail ou senha inválidos."
            });

        }

        const cliente = resultado[0];

        if (cliente.senha !== senha) {

            return res.json({
                sucesso: false,
                mensagem: "E-mail ou senha inválidos."
            });

        }

        res.json({

            sucesso: true,

            cliente: {

                id: cliente.idCliente,
                nome: cliente.nome,
                email: cliente.email,
                telefone: cliente.telefone,
                cpf: cliente.cpf

            }

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
    excluir,
    login
};
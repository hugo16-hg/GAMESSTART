//==========================================
// IMPORTA O MODEL
// passe aqui o caminho correto do seu arquivo model
//==========================================

const clienteModel = require("../model/cliente_model");

//==========================================
// CADASTRAR CLIENTE
//==========================================

function cadastrar(req, res) {

    const cliente = req.body;

    // Validação dos campos obrigatórios

    if (
        !cliente.nome ||
        !cliente.cpf ||
        !cliente.telefone ||
        !cliente.email ||
        !cliente.senha ||
        !cliente.data_nascimento ||
        !cliente.Loja_idLoja
    ) {

        return res.status(400).json({
            sucesso: false,
            mensagem: "Preencha todos os campos."
        });

    }

    // Caso não seja enviado o código da loja
    if (!cliente.Loja_idLoja) {

        cliente.Loja_idLoja = 1;

    }

    // Verifica se já existe um usuário com o mesmo e-mail

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
                idCliente: resultado.insertId

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
        // Retorna a lista de clientes em formato JSON
        res.json(resultado);

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
        // Retorna o cliente encontrado em formato JSON
        res.json(resultado[0]);

    });

}

//==========================================
// ATUALIZAR CLIENTE
//==========================================

function atualizar(req, res) {
    // Obtém o ID do cliente a ser atualizado a partir dos parâmetros da URL
    const id = req.params.id;
    // Obtém os dados atualizados do cliente a partir do corpo da requisição
    const cliente = req.body;

    clienteModel.atualizar(id, cliente, (erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao atualizar cliente."
            });

        }

        res.json({
            sucesso: true,
            mensagem: "Cliente atualizado com sucesso."
        });

    });

}

//==========================================
// EXCLUIR CLIENTE
//==========================================

function excluir(req, res) {
    // Obtém o ID do cliente a ser excluído a partir dos parâmetros da URL
    const id = req.params.id;

    clienteModel.excluir(id, (erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro ao excluir cliente."
            });

        }

        res.json({
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
    listar,
    buscarPorId,
    atualizar,
    excluir

};
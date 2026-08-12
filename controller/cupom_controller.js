const cupomModel = require("../model/cupom_model.js");

function cadastrar(req, res) {
    const cupom = req.body;
    if (!cupom.nome || !cupom.data_validade || cupom.quantidade === undefined || cupom.desconto === undefined || !cupom.Loja_id_loja) {
        return res.status(400).json({ sucesso: false, mensagem: "Preencha todos os campos obrigatórios." });
    }
    cupomModel.cadastrar(cupom, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao cadastrar cupom." });
        return res.status(201).json({ sucesso: true, mensagem: "Cupom cadastrado com sucesso!", idCupom: resultado.insertId });
    });
}
function listar(req, res) { cupomModel.listar((e,r)=> e ? res.status(500).json({sucesso:false,mensagem:"Erro ao listar cupons.",erro:e.message}) : res.status(200).json(r)); }
function buscarPorId(req, res) { cupomModel.buscarPorId(req.params.id,(e,r)=> e ? res.status(500).json({sucesso:false,mensagem:"Erro ao buscar cupom.",erro:e.message}) : r.length===0 ? res.status(404).json({sucesso:false,mensagem:"Cupom não encontrado."}) : res.status(200).json(r[0])); }
function listarValidos(req, res) { cupomModel.listarValidos((e,r)=> e ? res.status(500).json({sucesso:false,mensagem:"Erro ao listar cupons válidos.",erro:e.message}) : res.status(200).json(r)); }
function atualizar(req,res) {
    const cupom=req.body;
    if (!cupom.nome || !cupom.data_validade || cupom.quantidade === undefined || cupom.desconto === undefined || !cupom.Loja_id_loja) return res.status(400).json({sucesso:false,mensagem:"Preencha todos os campos obrigatórios."});
    cupomModel.atualizar(req.params.id,cupom,(e,r)=> e ? res.status(500).json({sucesso:false,mensagem:e.sqlMessage||"Erro ao atualizar cupom."}) : r.affectedRows===0 ? res.status(404).json({sucesso:false,mensagem:"Cupom não encontrado."}) : res.status(200).json({sucesso:true,mensagem:"Cupom atualizado com sucesso."}));
}
function excluir(req,res) { cupomModel.excluir(req.params.id,(e,r)=> e ? res.status(500).json({sucesso:false,mensagem:e.sqlMessage||"Erro ao excluir cupom."}) : r.affectedRows===0 ? res.status(404).json({sucesso:false,mensagem:"Cupom não encontrado."}) : res.status(200).json({sucesso:true,mensagem:"Cupom excluído com sucesso."})); }

module.exports={cadastrar,listar,buscarPorId,listarValidos,atualizar,excluir};

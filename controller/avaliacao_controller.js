const avaliacaoModel = require("../model/avaliacao_model.js");

function cadastrar(req, res) {
    const avaliacao = req.body;
    if (!avaliacao.data_publicacao || avaliacao.nota === undefined || !avaliacao.Produto_id_produto) {
        return res.status(400).json({ sucesso: false, mensagem: "Preencha os campos obrigatórios." });
    }
    avaliacao.descricao = avaliacao.descricao || null;
    avaliacaoModel.cadastrar(avaliacao,(e,r)=>e?res.status(500).json({sucesso:false,mensagem:e.sqlMessage||"Erro ao cadastrar avaliação."}):res.status(201).json({sucesso:true,mensagem:"Avaliação cadastrada com sucesso!",idAvaliacao:r.insertId}));
}
function listar(req,res){avaliacaoModel.listar((e,r)=>e?res.status(500).json({sucesso:false,mensagem:"Erro ao listar avaliações.",erro:e.message}):res.status(200).json(r));}
function buscarPorId(req,res){avaliacaoModel.buscarPorId(req.params.id,(e,r)=>e?res.status(500).json({sucesso:false,mensagem:"Erro ao buscar avaliação.",erro:e.message}):r.length===0?res.status(404).json({sucesso:false,mensagem:"Avaliação não encontrada."}):res.status(200).json(r[0]));}
function atualizar(req,res){
    const a=req.body;a.descricao=a.descricao||null;
    avaliacaoModel.atualizar(req.params.id,a,(e,r)=>e?res.status(500).json({sucesso:false,mensagem:e.sqlMessage||"Erro ao atualizar avaliação."}):r.affectedRows===0?res.status(404).json({sucesso:false,mensagem:"Avaliação não encontrada."}):res.status(200).json({sucesso:true,mensagem:"Avaliação atualizada com sucesso."}));
}
function excluir(req,res){avaliacaoModel.excluir(req.params.id,(e,r)=>e?res.status(500).json({sucesso:false,mensagem:e.sqlMessage||"Erro ao excluir avaliação."}):res.status(200).json({sucesso:true,removidos:r.affectedRows}));}
module.exports={cadastrar,listar,buscarPorId,atualizar,excluir};

const imagemProdutoModel = require("../model/imagem_produto_model.js");

function cadastrar(req, res) {
    const imagemProduto = req.body;
    if (!imagemProduto.arquivo || !imagemProduto.Produto_id_produto) {
        return res.status(400).json({ sucesso: false, mensagem: "Informe o arquivo e o produto." });
    }
    imagemProdutoModel.cadastrar(imagemProduto, (erro, resultado) => {
        if (erro) return res.status(500).json({ sucesso: false, mensagem: erro.sqlMessage || "Erro ao cadastrar imagem." });
        return res.status(201).json({ sucesso: true, mensagem: "Imagem cadastrada com sucesso!", idImagemProduto: resultado.insertId });
    });
}
function listar(req,res){imagemProdutoModel.listar((e,r)=>e?res.status(500).json({sucesso:false,mensagem:"Erro ao listar imagens.",erro:e.message}):res.status(200).json(r));}
function buscarPorId(req,res){imagemProdutoModel.buscarPorId(req.params.id,(e,r)=>e?res.status(500).json({sucesso:false,mensagem:"Erro ao buscar imagem.",erro:e.message}):r.length===0?res.status(404).json({sucesso:false,mensagem:"Imagem não encontrada."}):res.status(200).json(r[0]));}
function listarPorProduto(req,res){imagemProdutoModel.listarPorProduto(req.params.idProduto,(e,r)=>e?res.status(500).json({sucesso:false,mensagem:"Erro ao listar imagens do produto.",erro:e.message}):res.status(200).json(r));}
function atualizar(req,res){
    const d=req.body;
    if(!d.arquivo||!d.Produto_id_produto)return res.status(400).json({sucesso:false,mensagem:"Informe o arquivo e o produto."});
    imagemProdutoModel.atualizar(req.params.id,d,(e,r)=>e?res.status(500).json({sucesso:false,mensagem:e.sqlMessage||"Erro ao atualizar imagem."}):r.affectedRows===0?res.status(404).json({sucesso:false,mensagem:"Imagem não encontrada."}):res.status(200).json({sucesso:true,mensagem:"Imagem atualizada com sucesso."}));
}
function excluir(req,res){imagemProdutoModel.excluir(req.params.id,(e,r)=>e?res.status(500).json({sucesso:false,mensagem:e.sqlMessage||"Erro ao excluir imagem."}):res.status(200).json({sucesso:true,removidos:r.affectedRows}));}
function excluirPorProduto(req,res){imagemProdutoModel.excluirPorProduto(req.params.idProduto,(e,r)=>e?res.status(500).json({sucesso:false,mensagem:e.sqlMessage||"Erro ao excluir imagens."}):res.status(200).json({sucesso:true,removidos:r.affectedRows}));}

module.exports={cadastrar,listar,buscarPorId,listarPorProduto,atualizar,excluir,excluirPorProduto};

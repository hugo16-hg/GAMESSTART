// CRIANDO VÁRIAVEIS
/* nome das váriaveis não pode ter:
-acentos
-espaço
-simbolos
-não pode começar com números
-não deve ser escrito com a primeira letra em maiusculo
 */

// variaveis que alteram de valor
let preco_promocional = 2465.00;
let preco_antigo = 2900.00;
let desconto = "-15%";
let quantidade = 10;
//variaveis que são constantes/ não alteram de valor
const nomeProduto = "XBOX Series S";
const avaliacoes = 4.5;
const img_miniaturas =
    [
        "/assets/Xboxz.jpg",
        "/assets/XboxSeries S.jpg",
        "/assets/controle.jpg",
        "/assets/Xboxprincipal.jpg",
    ];
const img_principal = "/assets/Xboxprincipal.jpg";
const descricao = "XBOX S é um ótimo console para quem deseja jogar com uma boa qualidade e desempenho sem gastar muito. Ele oferece um exelente desempenho em jogos da nova geração.";
let frete;
// botoes e arquivos
let btn_add_carrinho;
let btn_comprar;
let btn_add_quantidade;
let btn_remover_quantidade;
let btn_calcular_frete;


// CÓDIGO PARA PREENCHER AS IMAGENS NO HTML

//CRIANDO UMA VÁRIAVEL PARA RECONHER O ID DA IMAGEM LATERAL
const lateral = document.getElementById("img-lateral");

//LENDO A QUANTIDADE DE IMAGENS CADASTRADAS E CRIANDO AS TAGS IMG

/* ForEach: percorre uma lista de itens até o final
- ele percorre o primeiro, se ver que tem outro, ele lê o outro
- quando chega no ultimo ele para de ler e finaliza a execução
- img_miniatura é chamado pq é ele que contém a lista de imagens
- depois o ForEach é chamado para ler a lista
- e dentro do ForEach passamos o tipo de documento lido (imagem)
 */
img_miniaturas.forEach(imagem => {
    // CRIANDO UMA VÁRIAVEL QUE CRIE A TAG IMG NA DIV DO HTML
    const img = document.createElement("img");

    // criando o código que mostra as imagens no site
    img.src = imagem;//ele joga o caminho da imagem na tag img
    img.classList.add("img-lateral");//jogar a tag criada na div

    /*criando o código que substitui a imagem 
     principal pela miniatura clicada*/
    img.addEventListener("click", () => {
        document.getElementById("imagem-maior").src =
            imagem;
    });//ver se a pessoa clicou na imagem
    lateral.appendChild(img);//mostra a imagem adicionada

});//fechar o ForEach

// preencher a imagem principal
document.getElementById("imagem-maior").src = img_principal;


// -------------------PREENCHER DADOS DO PRODUTO-----------------

document.getElementById("nome-produto").textContent = nomeProduto;
document.getElementById("valor-avaliacao").textContent = avaliacoes;
document.getElementById("preco-antigo").textContent = preco_antigo;
document.getElementById("preco-promocional").textContent = preco_promocional;
document.getElementById("desconto").textContent = desconto;
// -------CORES DO PRODUTO-----------------------------
// ELE VAI LER QUANTAS CORES O PRODUTO E
// VAI CRIAR BOTÕES PARA AS CORES
/*
const listaCores = document.getElementById("cores");
cores.forEach(cores => { // percorrer as cores cadastradas
    const botao = document.createElement("button");
    //criar um botão para cada cor que ele encontrar
    botao.textContent = cores;
    listaCores.appendChild(botao);
});

// -------TAMANHOS DO PRODUTO-----------------------------
// ELE VAI LER QUANTAS TAMANHOS O PRODUTO E
// VAI CRIAR BOTÕES PARA OS TAMANHOS
const listaTamanhos = document.getElementById("tamanhos");
tamanho.forEach(tamanho => { // percorrer as cores cadastradas
    const botao = document.createElement("button");
    //criar um botão para cada cor que ele encontrar
    botao.textContent = tamanho;
    listaTamanhos.appendChild(botao);
});
*/
//------------QUANTIDADE DE PRODUTO -----------------------------
/* o limite de quantidade vai ser igual a quantidade de preodutos que o lojista cadastrou no estoque.
Quando o cliente clicar no botão + a quantidade comprada aumenta de 1 em 1.
Quando ele clicar bo botão de - a quantidade comprada diminui de 1 em 1
Iniciamente o valor da quantidade aparece como 1. */

let quantidade_inicial = 1; // a quantidade inicial.
btn_add_quantidade = document.getElementById("aumentar");
btn_remover_quantidade = document.getElementById("diminuir");
const numero = document.getElementById("numero-quantidade");

//passando valor inicial para a tag html
numero.textContent = quantidade_inicial;


//criando o código de aumentar a quantidade de 1 em 1
btn_add_quantidade.addEventListener("click", () => {
    //se quantidade for menor que o estoque
    if (quantidade_inicial < quantidade) {
        quantidade_inicial++;//aumentar de 1 em 1
        numero.textContent = quantidade_inicial;
    } else {
        alert(" você atingiu o limite do estoque")
    }
})
//criando o código para diminuir a quantidade de 1 em 1
btn_remover_quantidade.addEventListener("click", () => {
   if (quantidade_inicial > 1) {
   quantidade_inicial--;//diminuir de 1 em 1
    numero.textContent = quantidade_inicial;
   }
})
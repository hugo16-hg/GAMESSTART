document.addEventListener("DOMContentLoaded", () => {

    console.log("Home carregada.");

});

const bestProducts = [

{
    nome:"Controle Sem Fio DualSense PlayStation 5",
    preco:"R$ 449,90",
    imagem:"./img/produtos/dualsense.png",
    tag:""
},

{
    nome:"Processador AMD Ryzen 7 7800X3D",
    preco:"R$ 2.899,00",
    imagem:"./img/produtos/ryzen7.png",
    tag:""
},

{
    nome:"Headset HyperX Cloud III",
    preco:"R$ 699,00",
    imagem:"./img/produtos/headset.png",
    tag:""
},

{
    nome:"Elden Ring Shadow of the Erdtree",
    preco:"R$ 314,10",
    imagem:"./img/produtos/eldenring.png",
    tag:"PROMOÇÃO"
}

];

const newProducts=[

{

nome:"Monitor Gamer OLED 240Hz",

preco:"R$ 6.199,00",

imagem:"./img/produtos/monitor.png",

tag:"NOVO"

},

{

nome:"Headset Astro A50",

preco:"R$ 1.999,00",

imagem:"./img/produtos/astro.png",

tag:"NOVO"

},

{

nome:"Final Fantasy VII Rebirth",

preco:"R$ 349,00",

imagem:"./img/produtos/finalfantasy.png",

tag:"NOVO"

},

{

nome:"Intel Core i9 14900K",

preco:"R$ 4.299,00",

imagem:"./img/produtos/i9.png",

tag:"NOVO"

}

];

function criarCards(lista,id){

    const container=document.getElementById(id);

    container.innerHTML="";

    lista.forEach(produto=>{

        container.innerHTML+=`

        <div class="product-card">

            <div class="product-image">

                ${
                    produto.tag!=""
                    ? `<span class="product-tag">${produto.tag}</span>`
                    : ""
                }

                <img src="${produto.imagem}">

            </div>

            <div class="product-info">

                <div class="product-name">

                    ${produto.nome}

                </div>

                <div class="product-price">

                    ${produto.preco}

                </div>

                <button class="product-btn">

                    <i class="fa-solid fa-cart-shopping"></i>

                    Adicionar

                </button>

            </div>

        </div>

        `;

    });

}

criarCards(bestProducts,"bestProducts");

criarCards(newProducts,"newProducts");

/*==============================
CONTADOR
==============================*/

let tempo=24*60*60+15*60+42;

setInterval(()=>{

    let h=Math.floor(tempo/3600);

    let m=Math.floor((tempo%3600)/60);

    let s=tempo%60;

    document.getElementById("countdown").innerHTML=

    `${h}h : ${m}m : ${s}s`;

    tempo--;

},1000);
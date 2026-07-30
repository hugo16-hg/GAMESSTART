/*=========================================
        MENU ATIVO
=========================================*/

const menuLinks = document.querySelectorAll("nav li");

menuLinks.forEach(item => {

    item.addEventListener("click", () => {

        menuLinks.forEach(link => {

            link.classList.remove("active");

        });

        item.classList.add("active");

    });

});


/*=========================================
        CONTADOR DA PROMOÇÃO
=========================================*/

let totalSeconds = (24 * 60 * 60) + (15 * 60) + 42;

const hour = document.getElementById("hours");
const minute = document.getElementById("minutes");
const second = document.getElementById("seconds");

function updateCountdown() {

    if(totalSeconds <= 0){

        totalSeconds = (24 * 60 * 60);

    }

    const h = Math.floor(totalSeconds / 3600);

    const m = Math.floor((totalSeconds % 3600) / 60);

    const s = totalSeconds % 60;

    if(hour)
        hour.textContent = String(h).padStart(2,'0');

    if(minute)
        minute.textContent = String(m).padStart(2,'0');

    if(second)
        second.textContent = String(s).padStart(2,'0');

    totalSeconds--;

}

updateCountdown();

setInterval(updateCountdown,1000);


/*=========================================
        BOTÕES ADICIONAR
=========================================*/

const buttons = document.querySelectorAll(".product-info button");

let cartItems = 2;

buttons.forEach(btn=>{

    btn.addEventListener("click",()=>{

        cartItems++;

        document.querySelector(".cart span").innerHTML = cartItems;

        btn.innerHTML = `
            <i class="fa-solid fa-check"></i>
            Adicionado
        `;

        btn.style.background="#22C55E";

        setTimeout(()=>{

            btn.innerHTML=`
                <i class="fa-solid fa-cart-shopping"></i>
                Adicionar
            `;

            btn.style.background="#2563EB";

        },1500);

    });

});


/*=========================================
        SEARCH
=========================================*/

const search = document.querySelector(".search-box input");

search.addEventListener("keyup",(e)=>{

    console.log("Pesquisando:",e.target.value);

});


/*=========================================
        HEADER SHADOW
=========================================*/

window.addEventListener("scroll",()=>{

    const header = document.querySelector("header");

    if(window.scrollY>40){

        header.style.boxShadow="0 10px 25px rgba(0,0,0,.08)";

    }else{

        header.style.boxShadow="none";

    }

});


/*=========================================
        SCROLL SUAVE
=========================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        const target=document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});


/*=========================================
        ANIMAÇÃO DOS CARDS
=========================================*/

const cards = document.querySelectorAll(".product-card,.category-card,.benefit");

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.opacity="1";

            entry.target.style.transform="translateY(0)";

        }

    });

},{
    threshold:.2
});

cards.forEach(card=>{

    card.style.opacity="0";

    card.style.transform="translateY(40px)";

    card.style.transition=".6s ease";

    observer.observe(card);

});
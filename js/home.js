/* ===========================
   GAMESSTART
   JavaScript
=========================== */

/* ---------------------------
   MENU MOBILE
--------------------------- */

const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {
    menu.classList.toggle("active");
});

/* ---------------------------
   CONTADOR DO CARRINHO
--------------------------- */

const cartCount = document.getElementById("cart-count");

// Recupera quantidade salva
let cartItems = parseInt(localStorage.getItem("gamesstart-cart")) || 0;

// Atualiza contador
cartCount.textContent = cartItems;

/* ---------------------------
   TOAST
--------------------------- */

const toast = document.getElementById("toast");

function showToast(message){

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    },2500);

}

/* ---------------------------
   BOTÕES ADICIONAR
--------------------------- */

const addButtons = document.querySelectorAll(".add-cart");

addButtons.forEach(button => {

    button.addEventListener("click",()=>{

        cartItems++;

        cartCount.textContent = cartItems;

        localStorage.setItem("gamesstart-cart",cartItems);

        showToast("Produto adicionado ao carrinho!");

    });

});

/* ---------------------------
   CONTADOR REGRESSIVO
--------------------------- */

// 24 horas a partir de agora
const targetDate = new Date().getTime() + (24 * 60 * 60 * 1000);

const countdown = document.getElementById("countdown");

function updateCountdown(){

    const now = new Date().getTime();

    const distance = targetDate - now;

    if(distance <= 0){

        countdown.innerHTML = "PROMOÇÃO ENCERRADA";

        clearInterval(timer);

        return;

    }

    const hours = Math.floor(distance / (1000 * 60 * 60));

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60))
        /
        (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60))
        /
        1000
    );

    countdown.innerHTML =
        String(hours).padStart(2,"0") +
        "h : " +
        String(minutes).padStart(2,"0") +
        "m : " +
        String(seconds).padStart(2,"0") +
        "s";

}

updateCountdown();

const timer = setInterval(updateCountdown,1000);

/* ---------------------------
   FECHAR MENU MOBILE
--------------------------- */

document.querySelectorAll("#menu a").forEach(link=>{

    link.addEventListener("click",()=>{

        if(window.innerWidth < 768){

            menu.classList.remove("active");

        }

    });

});

/* ---------------------------
   EFEITO DE SCROLL SUAVE
--------------------------- */

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        const target = document.querySelector(this.getAttribute("href"));

        if(target){

            e.preventDefault();

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});

/* ---------------------------
   ANIMAÇÃO DOS CARDS
--------------------------- */

const cards = document.querySelectorAll(".category, .product");

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

        }

    });

},{
    threshold:0.2
});

cards.forEach(card=>{

    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
    card.style.transition = ".5s";

    observer.observe(card);

});

/* ---------------------------
   NEWSLETTER
--------------------------- */

const newsletterButton = document.querySelector("footer button");
const newsletterInput = document.querySelector('footer input[type="email"]');

newsletterButton.addEventListener("click",()=>{

    const email = newsletterInput.value.trim();

    if(email === ""){

        showToast("Digite um e-mail válido.");

        return;

    }

    showToast("Inscrição realizada com sucesso!");

    newsletterInput.value = "";

});

/* ---------------------------
   PESQUISA
--------------------------- */

const searchInput = document.querySelector(".search input");

searchInput.addEventListener("keyup",(e)=>{

    if(e.key === "Enter"){

        showToast("Pesquisa: " + searchInput.value);

    }

});

/* ---------------------------
   FIM
--------------------------- */
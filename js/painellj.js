/* ==========================================
   GAMESSTART - PAINEL DO LOJISTA
   painellj.js
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /*=========================================
        MENU LATERAL
    =========================================*/

    const menuLinks = document.querySelectorAll(".menu a");

    menuLinks.forEach(link => {

        link.addEventListener("click", function(e){

            e.preventDefault();

            menuLinks.forEach(item => item.classList.remove("active"));

            this.classList.add("active");

        });

    });

    /*=========================================
        MENU MOBILE
    =========================================*/

    const menuToggle = document.querySelector(".menu-toggle");
    const sidebar = document.querySelector(".sidebar");

    if(menuToggle){

        menuToggle.addEventListener("click", () => {

            sidebar.classList.toggle("open");

        });

    }

    /*=========================================
        PESQUISA
    =========================================*/

    const searchInput = document.querySelector(".search-box input");
    const tableRows = document.querySelectorAll("tbody tr");

    if(searchInput){

        searchInput.addEventListener("keyup", function(){

            const value = this.value.toLowerCase();

            tableRows.forEach(row=>{

                row.style.display = row.innerText.toLowerCase().includes(value)
                    ? ""
                    : "none";

            });

        });

    }

    /*=========================================
        MODAL
    =========================================*/

    const modal = document.getElementById("orderModal");
    const closeButtons = document.querySelectorAll(".close-modal");
    const tableButtons = document.querySelectorAll(".table-btn");

    tableButtons.forEach(button=>{

        button.addEventListener("click",(e)=>{

            e.stopPropagation();

            const row = button.closest("tr");

            document.getElementById("modalOrder").textContent =
                row.cells[0].textContent;

            document.getElementById("modalClient").textContent =
                row.cells[1].innerText;

            document.getElementById("modalProduct").textContent =
                row.cells[2].textContent;

            document.getElementById("modalValue").textContent =
                row.cells[3].textContent;

            document.getElementById("modalStatus").textContent =
                row.cells[4].innerText;

            modal.classList.add("show");

        });

    });

    closeButtons.forEach(btn=>{

        btn.addEventListener("click",()=>{

            modal.classList.remove("show");

        });

    });

    window.addEventListener("click",(e)=>{

        if(e.target === modal){

            modal.classList.remove("show");

        }

    });

    /*=========================================
        BOTÃO CAMPANHA
    =========================================*/

    const campaignButton = document.querySelector(".campaign-card button");

    if(campaignButton){

        campaignButton.addEventListener("click",()=>{

            campaignButton.innerHTML =
                '<i class="bi bi-check-circle-fill"></i> Campanha Ativada';

            campaignButton.disabled = true;

        });

    }

    /*=========================================
        GRÁFICO
    =========================================*/

    const chartCanvas = document.getElementById("salesChart");

    if(chartCanvas){

        const ctx = chartCanvas.getContext("2d");

        new Chart(ctx,{

            type:"line",

            data:{

                labels:[
                    "Seg",
                    "Ter",
                    "Qua",
                    "Qui",
                    "Sex",
                    "Sáb",
                    "Dom"
                ],

                datasets:[{

                    label:"Vendas",

                    data:[
                        1200,
                        2300,
                        1800,
                        4200,
                        3900,
                        6100,
                        5200
                    ],

                    borderColor:"#2081CB",

                    backgroundColor:"rgba(32,129,203,.10)",

                    fill:true,

                    borderWidth:3,

                    pointRadius:4,

                    pointHoverRadius:6,

                    tension:.35

                }]

            },

            options:{

                responsive:true,

                maintainAspectRatio:false,

                animation:{
                    duration:700
                },

                plugins:{

                    legend:{
                        display:false
                    }

                },

                interaction:{
                    intersect:false,
                    mode:"index"
                },

                scales:{

                    x:{

                        grid:{
                            display:false
                        }

                    },

                    y:{

                        beginAtZero:true,

                        grid:{
                            color:"#EEF2F7"
                        },

                        ticks:{

                            callback:(value)=>{

                                return "R$ " + value;

                            }

                        }

                    }

                }

            }

        });

    }

});/*=========================================
    PERFIL (DROPDOWN)
=========================================*/

const profile = document.querySelector(".profile");

if(profile){

    profile.addEventListener("click",()=>{

        profile.classList.toggle("active");

    });

}

document.addEventListener("click",(e)=>{

    if(profile && !profile.contains(e.target)){

        profile.classList.remove("active");

    }

});


/*=========================================
    BOTÃO VOLTAR AO TOPO
=========================================*/

const scrollButton = document.getElementById("scrollTop");

window.addEventListener("scroll",()=>{

    if(window.scrollY > 300){

        scrollButton.classList.add("show");

    }else{

        scrollButton.classList.remove("show");

    }

});

scrollButton.addEventListener("click",()=>{

    window.scrollTo({

        top:0,
        behavior:"smooth"

    });

});


/*=========================================
    LOADER
=========================================*/

const loader = document.getElementById("loader");

window.addEventListener("load",()=>{

    setTimeout(()=>{

        loader.classList.add("hide");

    },300);

});


/*=========================================
    BOTÕES DA TABELA (HOVER)
=========================================*/

document.querySelectorAll(".table-btn").forEach(button=>{

    button.addEventListener("mouseenter",()=>{

        button.classList.add("hover");

    });

    button.addEventListener("mouseleave",()=>{

        button.classList.remove("hover");

    });

});


/*=========================================
    BOTÃO NOVO PRODUTO
=========================================*/

const newProduct = document.querySelector(".primary-btn");

if(newProduct){

    newProduct.addEventListener("click",()=>{

        console.log("Novo produto.");

        // Futuramente:
        // window.location.href = "novo-produto.html";

    });

}


/*=========================================
    EXPORTAR
=========================================*/

const exportButton = document.querySelector(".chart-actions button");

if(exportButton){

    exportButton.addEventListener("click",()=>{

        window.print();

    });

}


/*=========================================
    TROCA DE PERÍODO DO GRÁFICO
=========================================*/

const periodButton = document.querySelector(".chart-actions .active");

if(periodButton){

    periodButton.addEventListener("click",()=>{

        console.log("Período semanal.");

        // Futuramente:
        // carregar dados Mensal / Anual

    });

}


/*=========================================
    NOTIFICAÇÕES
=========================================*/

const notificationButton = document.querySelector(".bi-bell");

if(notificationButton){

    notificationButton.addEventListener("click",()=>{

        console.log("Abrindo notificações...");

    });

}


/*=========================================
    MENSAGENS
=========================================*/

const messageButton = document.querySelector(".bi-envelope");

if(messageButton){

    messageButton.addEventListener("click",()=>{

        console.log("Abrindo mensagens...");

    });

}


/*=========================================
    ANIMAÇÃO SUAVE DAS SEÇÕES
=========================================*/

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("visible");

        }

    });

},{
    threshold:.15
});

document.querySelectorAll(

    ".card, .sales-chart, .quick-actions, .campaign-card, .orders"

).forEach(item=>{

    observer.observe(item);

});


/*=========================================
    RESPONSIVIDADE
=========================================*/

window.addEventListener("resize",()=>{

    if(window.innerWidth > 992){

        sidebar.classList.remove("open");

    }

});


/*=========================================
    FIM
=========================================*/

console.log("%cGamesStart Dashboard carregado com sucesso!",
"color:#2081CB;font-size:15px;font-weight:bold;");

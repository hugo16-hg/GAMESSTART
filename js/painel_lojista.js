document.addEventListener("DOMContentLoaded", () => {
    
    // Funcionalidade do Menu Mobile (Abrir e Fechar)
    const sidebar = document.getElementById("sidebar");
    const openMenuBtn = document.getElementById("openMenu");
    const closeMenuBtn = document.getElementById("closeMenu");

    if (openMenuBtn && closeMenuBtn && sidebar) {
        openMenuBtn.addEventListener("click", () => {
            sidebar.classList.add("open");
        });

        closeMenuBtn.addEventListener("click", () => {
            sidebar.classList.remove("open");
        });
    }

    // Funcionalidade dos botões do Gráfico
    const btnExportPdf = document.getElementById("btnExportPdf");
    if (btnExportPdf) {
        btnExportPdf.addEventListener("click", () => {
            alert("Exportando relatório de vendas em PDF...");
        });
    }

    const btnTogglePeriod = document.getElementById("btnTogglePeriod");
    if (btnTogglePeriod) {
        btnTogglePeriod.addEventListener("click", () => {
            const periods = ["Semanal", "Mensal", "Anual"];
            let currentText = btnTogglePeriod.innerText;
            let nextIndex = (periods.indexOf(currentText) + 1) % periods.length;
            btnTogglePeriod.innerText = periods[nextIndex];
        });
    }

    // Funcionalidade do botão da Campanha Gamer
    const btnAtivarCampanha = document.getElementById("btnAtivarCampanha");
    if (btnAtivarCampanha) {
        btnAtivarCampanha.addEventListener("click", () => {
            alert("Campanha Gamer ativada com sucesso para a Black Friday!");
            btnAtivarCampanha.innerText = "ATIVADO";
            btnAtivarCampanha.style.backgroundColor = "#e6f9f0";
            btnAtivarCampanha.style.color = "#10b981";
        });
    }

    // Botão de Configurações na sidebar
    const btnGoConfig = document.getElementById("btnGoConfig");
    if (btnGoConfig) {
        btnGoConfig.addEventListener("click", () => {
            alert("Abrindo configurações da loja...");
        });
    }

    // Link "Ver todos os pedidos"
    const linkViewAllOrders = document.getElementById("linkViewAllOrders");
    if (linkViewAllOrders) {
        linkViewAllOrders.addEventListener("click", (e) => {
            e.preventDefault();
            alert("Redirecionando para a listagem completa de pedidos...");
        });
    }

    // Ações dos botões de ID dos pedidos e menu de contexto na tabela
    const orderLinks = document.querySelectorAll(".order-id-link");
    orderLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            alert(`Visualizando detalhes do pedido: ${link.innerText}`);
        });
    });

    const actionButtons = document.querySelectorAll(".btn-action");
    actionButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            alert("Abrindo menu de ações do pedido...");
        });
    });

});
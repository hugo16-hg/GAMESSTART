//Perfeito. Salve como `js/detalhe-produto.js`. Ele preenche todo o esqueleto vazio do HTML; ajuste somente os caminhos das imagens para os nomes reais da sua pasta.


document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("#header");
    const breadcrumb = document.querySelector("#breadcrumb");
    const productThumbnails = document.querySelector("#productThumbnails");
    const mainProductImage = document.querySelector("#mainProductImage");
    const productSummary = document.querySelector("#productSummary");
    const specificationsTitle = document.querySelector("#specificationsTitle");
    const specificationsGrid = document.querySelector("#specificationsGrid");
    const recommendationsTitle = document.querySelector("#recommendationsTitle");
    const recommendationControls = document.querySelector("#recommendationControls");
    const recommendationsGrid = document.querySelector("#recommendationsGrid");

    let cartItems = 3;
    let selectedImage = 0;

    const product = {
        id: 1,
        category: "Hardware Premium",
        categoryLink: "Notebooks",
        name: "Notebook Gamer RTX RGB Ultra - i9 13th Gen, 32GB RAM, 1TB SSD",
        rating: 4.5,
        reviews: 128,
        inStock: true,
        oldPrice: 14899.00,
        price: 11499.00,
        installments: 12,
        installmentPrice: 958.25,
        discount: "-23% OFF",
        badges: [
            {
                label: "Mais vendido",
                className: "badge-best-seller"
            },
            {
                label: "Frete grátis",
                className: "badge-free-shipping"
            }
        ],
        images: [
            {
                src: "../img/produtos/notebook-gamer-1.jpg",
                alt: "Notebook gamer aberto com iluminação RGB"
            },
            {
                src: "../img/produtos/notebook-gamer-2.jpg",
                alt: "Teclado RGB do notebook gamer"
            },
            {
                src: "../img/produtos/notebook-gamer-3.jpg",
                alt: "Parte traseira do notebook gamer"
            },
            {
                src: "../img/produtos/notebook-gamer-4.jpg",
                alt: "Tela do notebook gamer"
            }
        ],
        benefits: [
            {
                icon: "fa-truck-fast",
                title: "Entrega Rápida",
                description: "Receba em até 2 dias"
            },
            {
                icon: "fa-shield-halved",
                title: "Garantia Gamer",
                description: "12 meses de proteção"
            }
        ],
        specifications: [
            ["Processador", "Intel Core i9-13900HX"],
            ["Tela", '17.3" QHD+ IPS 240Hz 100% DCI-P3'],
            ["Placa de Vídeo", "NVIDIA GeForce RTX 4080 (12GB GDDR6X)"],
            ["Teclado", "Mecânico Per-Key RGB Aura Sync"],
            ["Memória RAM", "32GB DDR5 5200MHz"],
            ["Conectividade", "Wi-Fi 6E + Bluetooth 5.3 + Thunderbolt 4"],
            ["Armazenamento", "1TB SSD NVMe Gen 4"],
            ["Sistema Operacional", "Windows 11 Home"]
        ]
    };

    const recommendations = [
        {
            id: 2,
            category: "Headsets",
            name: "Headset Gamer Pro Wireless 7.1 Surround",
            rating: 5,
            price: 899.00,
            image: "../img/produtos/headset-gamer.png",
            alt: "Headset Gamer Pro Wireless"
        },
        {
            id: 3,
            category: "Teclados",
            name: "Teclado Mecânico RGB Stealth Silent Switch",
            rating: 4,
            price: 649.00,
            image: "../img/produtos/teclado-gamer.png",
            alt: "Teclado Mecânico RGB"
        },
        {
            id: 4,
            category: "Mouses",
            name: "Mouse Gamer Ultra-Light 26K DPI",
            rating: 5,
            price: 429.00,
            image: "../img/produtos/mouse-gamer.png",
            alt: "Mouse Gamer Ultra-Light"
        },
        {
            id: 5,
            category: "Monitores",
            name: 'Monitor Curvo 34" Ultrawide 165Hz',
            rating: 5,
            price: 3899.00,
            image: "../img/produtos/monitor-curvo.png",
            alt: "Monitor Curvo Ultrawide"
        }
    ];

    function formatPrice(price) {
        return price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

    function createStars(rating) {
        let stars = "";

        for (let star = 1; star <= 5; star++) {
            if (star <= Math.floor(rating)) {
                stars += '<i class="fa-solid fa-star"></i>';
            } else if (star - rating < 1) {
                stars += '<i class="fa-solid fa-star-half-stroke"></i>';
            } else {
                stars += '<i class="fa-regular fa-star"></i>';
            }
        }

        return stars;
    }

    function renderHeader() {
        header.innerHTML = `
            <a href="../index.html" class="logo" aria-label="Ir para a página inicial">
                <i class="fa-solid fa-gamepad"></i>
                <span>GamesStart</span>
            </a>

            <nav class="header-menu" aria-label="Menu principal">
                <a href="../index.html" class="active">Início</a>
                <a href="./produtos.html">Promoções</a>
            </nav>

            <div class="header-actions">
                <button
                    type="button"
                    class="cart-button"
                    id="cartButton"
                    aria-label="Carrinho de compras"
                >
                    <i class="fa-solid fa-cart-shopping"></i>
                    <span class="cart-count" id="cartCount">${cartItems}</span>
                </button>

                <button
                    type="button"
                    class="profile-button"
                    aria-label="Perfil"
                >
                    <i class="fa-solid fa-user"></i>
                </button>
            </div>
        `;
    }

    function renderBreadcrumb() {
        breadcrumb.innerHTML = `
            <a href="../index.html">Início</a>
            <i class="fa-solid fa-chevron-right"></i>

            <a href="./produtos.html">${product.categoryLink}</a>
            <i class="fa-solid fa-chevron-right"></i>

            <span>${product.name}</span>
        `;
    }

    function renderGallery() {
        productThumbnails.innerHTML = product.images.map((image, index) => `
            <button
                type="button"
                class="thumbnail-button ${index === selectedImage ? "active" : ""}"
                data-image-index="${index}"
                aria-label="Ver imagem ${index + 1} do produto"
            >
                <img src="${image.src}" alt="${image.alt}">
            </button>
        `).join("");

        updateMainImage();
    }

    function updateMainImage() {
        const image = product.images[selectedImage];

        mainProductImage.innerHTML = `
            <div class="product-badges">
                ${product.badges.map((badge) => `
                    <span class="badge ${badge.className}">
                        ${badge.label}
                    </span>
                `).join("")}
            </div>

            <img
                src="${image.src}"
                alt="${image.alt}"
                id="productMainImage"
            >
        `;
    }

    function renderProductSummary() {
        productSummary.innerHTML = `
            <p class="product-category">${product.category}</p>

            <h1>${product.name}</h1>

            <div class="product-review">
                <div class="stars" aria-label="Avaliação de ${product.rating} estrelas">
                    ${createStars(product.rating)}
                </div>

                <span>(${product.reviews} avaliações)</span>

                <span class="stock-status">
                    <i class="fa-solid fa-circle"></i>
                    ${product.inStock ? "Em estoque" : "Indisponível"}
                </span>
            </div>

            <div class="price-card">
                <span class="old-price">${formatPrice(product.oldPrice)}</span>

                <div class="current-price-container">
                    <strong class="current-price">${formatPrice(product.price)}</strong>
                    <span class="discount-badge">${product.discount}</span>
                </div>

                <p class="installments">
                    ou em até
                    <strong>
                        ${product.installments}x de
                        ${formatPrice(product.installmentPrice)}
                    </strong>
                    sem juros
                </p>

                <button
                    type="button"
                    class="buy-now-button"
                    data-action="buy-now"
                >
                    <i class="fa-solid fa-bolt"></i>
                    Comprar Agora
                </button>

                <button
                    type="button"
                    class="add-to-cart-button"
                    data-action="add-to-cart"
                >
                    <i class="fa-solid fa-cart-plus"></i>
                    Adicionar ao Carrinho
                </button>
            </div>

            <div class="product-benefits">
                ${product.benefits.map((benefit) => `
                    <article class="product-benefit">
                        <span class="benefit-icon">
                            <i class="fa-solid ${benefit.icon}"></i>
                        </span>

                        <div>
                            <h2>${benefit.title}</h2>
                            <p>${benefit.description}</p>
                        </div>
                    </article>
                `).join("")}
            </div>
        `;
    }

    function renderSpecifications() {
        specificationsTitle.innerHTML = `
            <i class="fa-solid fa-grip-lines-vertical"></i>
            Especificações Técnicas
        `;

        specificationsGrid.innerHTML = product.specifications.map(([label, value]) => `
            <article class="specification-item">
                <span>${label}</span>
                <strong>${value}</strong>
            </article>
        `).join("");
    }

    function renderRecommendations() {
        recommendationsTitle.textContent = "Complete seu Setup";

        recommendationControls.innerHTML = `
            <button
                type="button"
                id="previousRecommendation"
                aria-label="Produto anterior"
            >
                <i class="fa-solid fa-chevron-left"></i>
            </button>

            <button
                type="button"
                id="nextRecommendation"
                aria-label="Próximo produto"
            >
                <i class="fa-solid fa-chevron-right"></i>
            </button>
        `;

        recommendationsGrid.innerHTML = recommendations.map((item) => `
            <article class="recommendation-card" data-product-id="${item.id}">
                <div class="recommendation-image">
                    <img src="${item.image}" alt="${item.alt}">
                </div>

                <span class="recommendation-category">${item.category}</span>

                <h3>${item.name}</h3>

                <div class="stars" aria-label="Avaliação de ${item.rating} estrelas">
                    ${createStars(item.rating)}
                </div>

                <div class="recommendation-bottom">
                    <strong>${formatPrice(item.price)}</strong>

                    <button
                        type="button"
                        class="recommendation-cart"
                        data-action="add-to-cart"
                        aria-label="Adicionar ${item.name} ao carrinho"
                    >
                        <i class="fa-solid fa-cart-shopping"></i>
                    </button>
                </div>
            </article>
        `).join("");
    }

    function updateCartCount() {
        const cartCount = document.querySelector("#cartCount");

        if (cartCount) {
            cartCount.textContent = cartItems;
        }
    }

    function addProductToCart(button) {
        cartItems += 1;
        updateCartCount();

        const originalContent = button.innerHTML;

        button.innerHTML = `
            <i class="fa-solid fa-check"></i>
            Adicionado
        `;

        button.disabled = true;

        setTimeout(() => {
            button.innerHTML = originalContent;
            button.disabled = false;
        }, 1200);
    }

    function selectGalleryImage(index) {
        selectedImage = index;
        renderGallery();
    }

    function setupEvents() {
        productThumbnails.addEventListener("click", (event) => {
            const button = event.target.closest("[data-image-index]");

            if (!button) {
                return;
            }

            selectGalleryImage(Number(button.dataset.imageIndex));
        });

        productSummary.addEventListener("click", (event) => {
            const button = event.target.closest("[data-action]");

            if (!button) {
                return;
            }

            if (button.dataset.action === "add-to-cart") {
                addProductToCart(button);
            }

            if (button.dataset.action === "buy-now") {
                addProductToCart(button);
            }
        });

        recommendationsGrid.addEventListener("click", (event) => {
            const button = event.target.closest("[data-action='add-to-cart']");

            if (button) {
                addProductToCart(button);
            }
        });

        recommendationControls.addEventListener("click", (event) => {
            const button = event.target.closest("button");

            if (!button) {
                return;
            }

            const direction = button.id === "nextRecommendation" ? 1 : -1;

            recommendationsGrid.scrollBy({
                left: direction * 300,
                behavior: "smooth"
            });
        });
    }

    document.title = `${product.name} | GamesStart`;

    renderHeader();
    renderBreadcrumb();
    renderGallery();
    renderProductSummary();
    renderSpecifications();
    renderRecommendations();
    setupEvents();
});
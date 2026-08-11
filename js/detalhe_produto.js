document.addEventListener("DOMContentLoaded", () => {
    const elements = {
        header: document.querySelector("#header"),
        breadcrumb: document.querySelector("#breadcrumb"),
        productThumbnails: document.querySelector("#productThumbnails"),
        mainProductImage: document.querySelector("#mainProductImage"),
        productSummary: document.querySelector("#productSummary"),
        descriptionTitle: document.querySelector("#descriptionTitle"),
        descriptionContent: document.querySelector("#descriptionContent"),
        commentsTitle: document.querySelector("#commentsTitle"),
        commentsCount: document.querySelector("#commentsCount"),
        commentsSummary: document.querySelector("#commentsSummary"),
        commentForm: document.querySelector("#commentForm"),
        commentsListHeader: document.querySelector("#commentsListHeader"),
        commentsList: document.querySelector("#commentsList"),
        recommendationsTitle: document.querySelector("#recommendationsTitle"),
        recommendationControls: document.querySelector("#recommendationControls"),
        recommendationsGrid: document.querySelector("#recommendationsGrid"),
        footer: document.querySelector("#footer")
    };

    const product = {
        id: 1,
        category: "Notebooks Gamer",
        name: "Notebook Gamer RTX RGB Ultra",
        oldPrice: 7999.90,
        price: 6499.90,
        installments: 12,
        rating: 4.5,
        description: [
            "O Notebook Gamer RTX RGB Ultra foi desenvolvido para quem busca alto desempenho em jogos, estudos e tarefas criativas. Seu processador de última geração, aliado à placa de vídeo dedicada, entrega velocidade, fluidez e qualidade visual para as partidas mais exigentes.",
            "A tela de alta definição oferece imagens nítidas e cores vibrantes, enquanto o teclado com iluminação RGB permite jogar com conforto mesmo em ambientes escuros. O equipamento também conta com armazenamento rápido e conexões modernas para completar seu setup."
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
        ]
    };

    const recommendations = [
        {
            name: "Headset Gamer Pro Wireless",
            category: "Headsets",
            price: 399.90,
            rating: 4.8,
            image: "../img/produtos/headset-gamer.png",
            alt: "Headset Gamer Pro Wireless"
        },
        {
            name: "Teclado Mecânico RGB",
            category: "Teclados",
            price: 299.90,
            rating: 4.7,
            image: "../img/produtos/teclado-gamer.png",
            alt: "Teclado Mecânico RGB"
        },
        {
            name: "Mouse Gamer Ultra-Light",
            category: "Mouses",
            price: 189.90,
            rating: 4.9,
            image: "../img/produtos/mouse-gamer.png",
            alt: "Mouse Gamer Ultra-Light"
        },
        {
            name: "Monitor Curvo Ultrawide",
            category: "Monitores",
            price: 1899.90,
            rating: 4.6,
            image: "../img/produtos/monitor-curvo.png",
            alt: "Monitor Curvo Ultrawide"
        },
        {
            name: "Mousepad Gamer XL",
            category: "Mousepads",
            price: 99.90,
            rating: 4.7,
            image: "../img/produtos/mousepad-gamer.png",
            alt: "Mousepad Gamer XL"
        },
        {
            name: "Webcam Full HD Gamer",
            category: "Webcams",
            price: 249.90,
            rating: 4.5,
            image: "../img/produtos/webcam-gamer.png",
            alt: "Webcam Full HD Gamer"
        },
        {
            name: "Cadeira Gamer Premium",
            category: "Cadeiras",
            price: 1299.90,
            rating: 4.8,
            image: "../img/produtos/cadeira-gamer.png",
            alt: "Cadeira Gamer Premium"
        },
        {
            name: "Suporte para Headset",
            category: "Acessórios",
            price: 79.90,
            rating: 4.4,
            image: "../img/produtos/suporte-headset.png",
            alt: "Suporte para headset"
        }
    ];

    let selectedImageIndex = 0;
    let cartQuantity = 0;
    let recommendationStart = 0;

    let comments = [
        {
            name: "Carlos Henrique",
            date: "12 de maio de 2026",
            rating: 5,
            text: "Notebook excelente. O desempenho nos jogos é muito bom e a tela tem uma qualidade incrível. O teclado RGB também ficou muito bonito."
        },
        {
            name: "Mariana Souza",
            date: "8 de maio de 2026",
            rating: 4,
            text: "Produto muito bonito e rápido. Chegou bem embalado e dentro do prazo. Recomendo para quem procura um notebook gamer de alto desempenho."
        },
        {
            name: "Rafael Oliveira",
            date: "2 de maio de 2026",
            rating: 5,
            text: "Excelente máquina. Estou utilizando para jogar e também para trabalhar com edição de vídeo. Até agora não tive nenhum problema."
        }
    ];

    function formatPrice(value) {
        return value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

    function escapeHtml(text) {
        const characters = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            "\"": "&quot;",
            "'": "&#039;"
        };

        return text.replace(/[&<>"']/g, (character) => characters[character]);
    }

    function getAverageRating() {
        const total = comments.reduce((sum, comment) => sum + comment.rating, 0);
        return total / comments.length;
    }

    function createStars(rating, className = "stars") {
        let icons = "";

        for (let star = 1; star <= 5; star += 1) {
            if (rating >= star) {
                icons += '<i class="fa-solid fa-star" aria-hidden="true"></i>';
            } else if (rating >= star - 0.5) {
                icons += '<i class="fa-solid fa-star-half-stroke" aria-hidden="true"></i>';
            } else {
                icons += '<i class="fa-regular fa-star" aria-hidden="true"></i>';
            }
        }

        return `
            <div class="${className}" aria-label="${rating.toFixed(1).replace(".", ",")} de 5 estrelas">
                ${icons}
            </div>
        `;
    }

    function showToast(message) {
        const currentToast = document.querySelector(".toast");

        if (currentToast) {
            currentToast.remove();
        }

        const toast = document.createElement("div");
        toast.className = "toast";
        toast.setAttribute("role", "status");
        toast.textContent = message;

        document.body.append(toast);

        window.setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    function renderHeader() {
        elements.header.innerHTML = `
            <div class="header-content">
                <a class="logo" href="../index.html" aria-label="Página inicial da GamesStart">
                    <i class="fa-solid fa-gamepad" aria-hidden="true"></i>
                    <span>GamesStart</span>
                </a>

                <nav class="header-menu" aria-label="Menu principal">
                    <a href="../index.html">Início</a>
                    <a href="produtos.html">Produtos</a>
                    <a href="ofertas.html">Ofertas</a>
                </nav>

                <div class="header-actions">
                    <a href="login.html" class="header-account">
                        <i class="fa-regular fa-user" aria-hidden="true"></i>
                        <span>Minha conta</span>
                    </a>

                    <a href="carrinho.html" class="header-cart" aria-label="Carrinho de compras">
                        <i class="fa-solid fa-cart-shopping" aria-hidden="true"></i>
                        <span>Carrinho</span>
                        <span class="cart-count" id="cartCount">${cartQuantity}</span>
                    </a>
                </div>
            </div>
        `;
    }

    function renderBreadcrumb() {
        elements.breadcrumb.innerHTML = `
            <a href="../index.html">Início</a>
            <i class="fa-solid fa-chevron-right" aria-hidden="true"></i>
            <a href="produtos.html">${product.category}</a>
            <i class="fa-solid fa-chevron-right" aria-hidden="true"></i>
            <span>${product.name}</span>
        `;
    }

    function renderGallery() {
        elements.productThumbnails.innerHTML = product.images
            .map((image, index) => `
                <button
                    type="button"
                    class="thumbnail-button ${index === selectedImageIndex ? "active" : ""}"
                    data-image-index="${index}"
                    aria-label="Ver imagem ${index + 1} do produto"
                >
                    <img src="${image.src}" alt="${image.alt}">
                </button>
            `)
            .join("");

        const selectedImage = product.images[selectedImageIndex];

        elements.mainProductImage.innerHTML = `
            <div class="product-badges">
                <span class="badge badge-best-seller">Mais vendido</span>
                <span class="badge badge-free-shipping">Frete grátis</span>
            </div>

            <img src="${selectedImage.src}" alt="${selectedImage.alt}">
        `;
    }

    function renderProductSummary() {
        const discount = Math.round(
            ((product.oldPrice - product.price) / product.oldPrice) * 100
        );

        const installmentValue = product.price / product.installments;

        elements.productSummary.innerHTML = `
            <p class="product-category">${product.category}</p>

            <h1>${product.name}</h1>

            <div class="product-review">
                ${createStars(product.rating)}

                <a href="#productComments">
                    ${product.rating.toFixed(1).replace(".", ",")} (${comments.length} avaliações)
                </a>

                <span class="stock-status">
                    <i class="fa-solid fa-circle" aria-hidden="true"></i>
                    Em estoque
                </span>
            </div>

            <div class="price-card">
                <span class="old-price">${formatPrice(product.oldPrice)}</span>

                <div class="current-price-container">
                    <strong class="current-price">${formatPrice(product.price)}</strong>
                    <span class="discount-badge">${discount}% OFF</span>
                </div>

                <p class="installments">
                    Em até <strong>${product.installments}x de ${formatPrice(installmentValue)} sem juros</strong>
                </p>

                <div class="purchase-quantity">
                    <label for="productQuantity">Quantidade</label>
                    <input
                        type="number"
                        id="productQuantity"
                        value="1"
                        min="1"
                        max="10"
                    >
                </div>

                <button type="button" class="buy-now-button" id="buyNowButton">
                    <i class="fa-solid fa-bolt" aria-hidden="true"></i>
                    Comprar agora
                </button>

                <button type="button" class="add-to-cart-button" id="addToCartButton">
                    <i class="fa-solid fa-cart-plus" aria-hidden="true"></i>
                    Adicionar ao carrinho
                </button>
            </div>

            <div class="product-benefits">
                <article class="product-benefit">
                    <span class="benefit-icon">
                        <i class="fa-solid fa-truck-fast" aria-hidden="true"></i>
                    </span>
                    <div>
                        <h2>Entrega rápida</h2>
                        <p>Envio seguro para todo o Brasil.</p>
                    </div>
                </article>

                <article class="product-benefit">
                    <span class="benefit-icon">
                        <i class="fa-solid fa-shield-halved" aria-hidden="true"></i>
                    </span>
                    <div>
                        <h2>Compra protegida</h2>
                        <p>Pagamento simples e totalmente seguro.</p>
                    </div>
                </article>
            </div>
        `;
    }

    function renderDescription() {
        elements.descriptionTitle.innerHTML = `
            <i class="fa-solid fa-align-left" aria-hidden="true"></i>
            Descrição
        `;

        elements.descriptionContent.innerHTML = product.description
            .map((paragraph) => `<p>${paragraph}</p>`)
            .join("");
    }

    function getRatingDistribution() {
        const distribution = [5, 4, 3, 2, 1].map((rating) => {
            const count = comments.filter((comment) => comment.rating === rating).length;

            return {
                rating,
                count,
                percentage: comments.length ? (count / comments.length) * 100 : 0
            };
        });

        return distribution;
    }

    function renderCommentsSummary() {
        const averageRating = getAverageRating();
        const distribution = getRatingDistribution();

        elements.commentsTitle.innerHTML = `
            <i class="fa-solid fa-comments" aria-hidden="true"></i>
            Avaliações e comentários
        `;

        elements.commentsCount.textContent = comments.length;

        elements.commentsSummary.innerHTML = `
            <div class="rating-overview">
                <strong class="rating-number">
                    ${averageRating.toFixed(1).replace(".", ",")}
                </strong>

                ${createStars(averageRating, "rating-stars")}

                <span class="rating-total">${comments.length} avaliações</span>
            </div>

            <div class="rating-distribution">
                ${distribution
                    .map((item) => `
                        <div class="rating-row">
                            <span class="rating-label">${item.rating} estrela${item.rating > 1 ? "s" : ""}</span>

                            <div class="rating-bar">
                                <span
                                    class="rating-bar-fill"
                                    style="width: ${item.percentage}%"
                                ></span>
                            </div>

                            <span class="rating-count">${item.count}</span>
                        </div>
                    `)
                    .join("")}
            </div>
        `;
    }

    function renderCommentForm() {
        elements.commentForm.innerHTML = `
            <h3 class="comment-form-title">Avalie este produto</h3>

            <div class="comment-fields">
                <label for="commentName">Seu nome</label>
                <input
                    type="text"
                    id="commentName"
                    name="name"
                    placeholder="Como deseja aparecer?"
                    maxlength="50"
                    required
                >

                <label for="commentRating">Sua avaliação</label>
                <select id="commentRating" name="rating" required>
                    <option value="">Escolha uma nota</option>
                    <option value="5">5 estrelas — Excelente</option>
                    <option value="4">4 estrelas — Muito bom</option>
                    <option value="3">3 estrelas — Bom</option>
                    <option value="2">2 estrelas — Regular</option>
                    <option value="1">1 estrela — Ruim</option>
                </select>

                <label for="commentText">Seu comentário</label>
                <textarea
                    id="commentText"
                    name="comment"
                    placeholder="Conte como foi sua experiência com o produto."
                    maxlength="500"
                    required
                ></textarea>
            </div>

            <button type="submit" class="comment-submit">
                <i class="fa-solid fa-paper-plane" aria-hidden="true"></i>
                Publicar avaliação
            </button>
        `;
    }

    function renderCommentsList() {
        const sort = document.querySelector("#commentsSort")?.value || "recent";
        const sortedComments = [...comments];

        if (sort === "highest") {
            sortedComments.sort((first, second) => second.rating - first.rating);
        }

        if (sort === "lowest") {
            sortedComments.sort((first, second) => first.rating - second.rating);
        }

        if (!sortedComments.length) {
            elements.commentsList.innerHTML = `
                <div class="empty-comments">
                    <i class="fa-regular fa-comment-dots" aria-hidden="true"></i>
                    <p>Este produto ainda não possui avaliações.</p>
                </div>
            `;

            return;
        }

        elements.commentsList.innerHTML = sortedComments
            .map((comment) => `
                <article class="comment-item" data-rating="${comment.rating}">
                    <div class="comment-header">
                        <div class="comment-user">
                            <span class="comment-avatar">
                                <i class="fa-solid fa-user" aria-hidden="true"></i>
                            </span>

                            <div>
                                <strong>${escapeHtml(comment.name)}</strong>
                                <span>${escapeHtml(comment.date)}</span>
                            </div>
                        </div>

                        ${createStars(comment.rating, "comment-stars")}
                    </div>

                    <p class="comment-text">${escapeHtml(comment.text)}</p>
                </article>
            `)
            .join("");
    }

    function renderCommentsListHeader() {
        elements.commentsListHeader.innerHTML = `
            <h3>Comentários dos clientes</h3>

            <label class="sr-only" for="commentsSort">Ordenar comentários</label>
            <select class="comments-sort" id="commentsSort">
                <option value="recent">Mais recentes</option>
                <option value="highest">Melhor avaliação</option>
                <option value="lowest">Menor avaliação</option>
            </select>
        `;

        document.querySelector("#commentsSort").addEventListener("change", renderCommentsList);
    }

    function renderRecommendations() {
        const visibleRecommendations = recommendations.slice(
            recommendationStart,
            recommendationStart + 4
        );

        elements.recommendationsTitle.textContent = "Complete seu setup";

        elements.recommendationControls.innerHTML = `
            <button
                type="button"
                id="previousRecommendation"
                aria-label="Ver recomendações anteriores"
                ${recommendationStart === 0 ? "disabled" : ""}
            >
                <i class="fa-solid fa-arrow-left" aria-hidden="true"></i>
            </button>

            <button
                type="button"
                id="nextRecommendation"
                aria-label="Ver próximas recomendações"
                ${recommendationStart + 4 >= recommendations.length ? "disabled" : ""}
            >
                <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </button>
        `;

        elements.recommendationsGrid.innerHTML = visibleRecommendations
            .map((item) => `
                <article class="recommendation-card">
                    <a href="detalhe_produto.html" aria-label="Ver ${item.name}">
                        <div class="recommendation-image">
                            <img src="${item.image}" alt="${item.alt}">
                        </div>

                        <span class="recommendation-category">${item.category}</span>
                        <h3>${item.name}</h3>

                        ${createStars(item.rating)}
                    </a>

                    <div class="recommendation-bottom">
                        <strong>${formatPrice(item.price)}</strong>

                        <button
                            type="button"
                            class="recommendation-cart"
                            data-product-name="${item.name}"
                            aria-label="Adicionar ${item.name} ao carrinho"
                        >
                            <i class="fa-solid fa-cart-plus" aria-hidden="true"></i>
                        </button>
                    </div>
                </article>
            `)
            .join("");

        document
            .querySelector("#previousRecommendation")
            .addEventListener("click", () => {
                recommendationStart = Math.max(0, recommendationStart - 4);
                renderRecommendations();
            });

        document
            .querySelector("#nextRecommendation")
            .addEventListener("click", () => {
                recommendationStart += 4;
                renderRecommendations();
            });
    }

    function renderFooter() {
        elements.footer.innerHTML = `
            <p>© ${new Date().getFullYear()} GamesStart. Todos os direitos reservados.</p>
        `;
    }

    function updateCart(quantity) {
        cartQuantity += quantity;

        const cartCount = document.querySelector("#cartCount");

        if (cartCount) {
            cartCount.textContent = cartQuantity;
        }

        showToast(
            quantity > 1
                ? `${quantity} itens adicionados ao carrinho.`
                : "Produto adicionado ao carrinho."
        );
    }

    function handleGalleryClick(event) {
        const button = event.target.closest(".thumbnail-button");

        if (!button) {
            return;
        }

        selectedImageIndex = Number(button.dataset.imageIndex);
        renderGallery();
    }

    function handleProductSummaryClick(event) {
        const addButton = event.target.closest("#addToCartButton");
        const buyButton = event.target.closest("#buyNowButton");

        if (!addButton && !buyButton) {
            return;
        }

        const quantityInput = document.querySelector("#productQuantity");
        const quantity = Math.max(1, Number(quantityInput.value) || 1);

        updateCart(quantity);

        if (buyButton) {
            showToast("Produto preparado para finalizar a compra.");
        }
    }

    function handleRecommendationClick(event) {
        const button = event.target.closest(".recommendation-cart");

        if (!button) {
            return;
        }

        updateCart(1);
    }

    function handleCommentSubmit(event) {
        event.preventDefault();

        const nameInput = document.querySelector("#commentName");
        const ratingInput = document.querySelector("#commentRating");
        const textInput = document.querySelector("#commentText");

        const name = nameInput.value.trim();
        const rating = Number(ratingInput.value);
        const text = textInput.value.trim();

        if (!name || !rating || !text) {
            showToast("Preencha seu nome, a nota e o comentário.");
            return;
        }

        comments.unshift({
            name,
            rating,
            text,
            date: "Hoje"
        });

        renderCommentsSummary();
        renderCommentsList();
        renderProductSummary();
        renderCommentForm();

        showToast("Sua avaliação foi publicada com sucesso.");
    }

    function bindEvents() {
        elements.productThumbnails.addEventListener("click", handleGalleryClick);
        elements.productSummary.addEventListener("click", handleProductSummaryClick);
        elements.recommendationsGrid.addEventListener("click", handleRecommendationClick);
        elements.commentForm.addEventListener("submit", handleCommentSubmit);
    }

    function renderPage() {
        document.title = `${product.name} | GamesStart`;

        renderHeader();
        renderBreadcrumb();
        renderGallery();
        renderProductSummary();
        renderDescription();
        renderCommentsSummary();
        renderCommentForm();
        renderCommentsListHeader();
        renderCommentsList();
        renderRecommendations();
        renderFooter();
        bindEvents();
    }

    renderPage();
});
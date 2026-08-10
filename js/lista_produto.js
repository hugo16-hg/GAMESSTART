//Salve como `js/produto.js`. Ele renderiza os cards, permite busca, filtros, ordenação, favoritos, paginação e atualiza o contador do carrinho.


document.addEventListener("DOMContentLoaded", () => {
    const productsGrid = document.querySelector("#productsGrid");
    const searchForm = document.querySelector("#searchForm");
    const searchInput = document.querySelector("#searchInput");
    const sortProducts = document.querySelector("#sortProducts");
    const filtersForm = document.querySelector("#filtersForm");
    const ratingStars = document.querySelectorAll(".rating-star");
    const resultsCount = document.querySelector(".results-count");
    const pagination = document.querySelector(".pagination");
    const cartCount = document.querySelector("#cartCount");

    if (!productsGrid) {
        return;
    }

    const products = [
        {
            id: 1,
            name: "Console Nintendo Switch OLED 64GB - White Edition",
            category: "console",
            price: 2499.00,
            oldPrice: 2999.00,
            rating: 5,
            reviews: 124,
            popularity: 98,
            tag: "Novo",
            tagClass: "badge-new",
            image: "../img/produtos/nintendo-switch.png",
            alt: "Console Nintendo Switch OLED"
        },
        {
            id: 2,
            name: "Controle DualSense PS5 - Galactic Purple",
            category: "console",
            price: 424.15,
            oldPrice: 499.00,
            rating: 4,
            reviews: 89,
            popularity: 92,
            tag: "-15% OFF",
            tagClass: "badge-offer",
            image: "../img/produtos/dualsense-purple.png",
            alt: "Controle DualSense PS5 Galactic Purple"
        },
        {
            id: 3,
            name: "The Legend of Zelda: Tears of the Kingdom - Switch",
            category: "jogos",
            price: 329.90,
            oldPrice: 399.00,
            rating: 5,
            reviews: 2400,
            popularity: 99,
            tag: "",
            tagClass: "",
            image: "../img/produtos/zelda.png",
            alt: "Jogo The Legend of Zelda Tears of the Kingdom"
        },
        {
            id: 4,
            name: "Headset Gamer Wireless Logitech G733 K/DA",
            category: "pc-gamer",
            price: 949.00,
            oldPrice: 1199.00,
            rating: 5,
            reviews: 45,
            popularity: 86,
            tag: "Novo",
            tagClass: "badge-new",
            image: "../img/produtos/headset-logitech.png",
            alt: "Headset Gamer Wireless Logitech G733"
        },
        {
            id: 5,
            name: "Console Xbox Series S 512GB SSD - Digital Edition",
            category: "console",
            price: 2299.00,
            oldPrice: 2649.00,
            rating: 5,
            reviews: 512,
            popularity: 96,
            tag: "",
            tagClass: "",
            image: "../img/produtos/xbox-series-s.png",
            alt: "Console Xbox Series S"
        },
        {
            id: 6,
            name: "Hogwarts Legacy Deluxe Edition - PS5",
            category: "jogos",
            price: 279.20,
            oldPrice: 349.00,
            rating: 5,
            reviews: 1200,
            popularity: 94,
            tag: "-20% OFF",
            tagClass: "badge-offer",
            image: "../img/produtos/hogwarts-legacy.png",
            alt: "Jogo Hogwarts Legacy Deluxe Edition"
        },
        {
            id: 7,
            name: "Console PlayStation 5 Slim Digital Edition",
            category: "console",
            price: 3399.00,
            oldPrice: 3799.00,
            rating: 5,
            reviews: 836,
            popularity: 97,
            tag: "",
            tagClass: "",
            image: "../img/produtos/ps5-slim.png",
            alt: "Console PlayStation 5 Slim"
        },
        {
            id: 8,
            name: "Teclado Mecânico Gamer RGB",
            category: "pc-gamer",
            price: 429.90,
            oldPrice: 519.90,
            rating: 4,
            reviews: 311,
            popularity: 83,
            tag: "Novo",
            tagClass: "badge-new",
            image: "../img/produtos/teclado-gamer.png",
            alt: "Teclado mecânico gamer"
        },
        {
            id: 9,
            name: "Marvel's Spider-Man 2 - PS5",
            category: "jogos",
            price: 299.90,
            oldPrice: 349.90,
            rating: 5,
            reviews: 925,
            popularity: 93,
            tag: "",
            tagClass: "",
            image: "../img/produtos/spiderman-2.png",
            alt: "Jogo Marvel's Spider-Man 2"
        },
        {
            id: 10,
            name: "Monitor Gamer UltraWide 29 Polegadas",
            category: "pc-gamer",
            price: 1299.90,
            oldPrice: 1499.90,
            rating: 4,
            reviews: 174,
            popularity: 84,
            tag: "-10% OFF",
            tagClass: "badge-offer",
            image: "../img/produtos/monitor-gamer.png",
            alt: "Monitor Gamer UltraWide"
        },
        {
            id: 11,
            name: "Controle Xbox Wireless Carbon Black",
            category: "console",
            price: 369.90,
            oldPrice: 429.90,
            rating: 4,
            reviews: 267,
            popularity: 88,
            tag: "",
            tagClass: "",
            image: "../img/produtos/controle-xbox.png",
            alt: "Controle Xbox Wireless"
        },
        {
            id: 12,
            name: "Elden Ring Shadow of the Erdtree - PS5",
            category: "jogos",
            price: 259.90,
            oldPrice: 299.90,
            rating: 5,
            reviews: 1560,
            popularity: 95,
            tag: "Novo",
            tagClass: "badge-new",
            image: "../img/produtos/elden-ring.png",
            alt: "Jogo Elden Ring Shadow of the Erdtree"
        }
    ];

    const productsPerPage = 6;

    let currentPage = 1;
    let selectedRating = 0;
    let cartItems = Number(cartCount?.textContent) || 0;
    let favoriteProducts = [2];

    function formatPrice(price) {
        return price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

    function formatReviews(reviews) {
        if (reviews >= 1000) {
            return `${(reviews / 1000).toFixed(1).replace(".", ",")}k`;
        }

        return reviews;
    }

    function createStars(rating) {
        let stars = "";

        for (let index = 1; index <= 5; index++) {
            const icon = index <= rating
                ? "fa-solid fa-star"
                : "fa-regular fa-star";

            stars += `<i class="${icon}"></i>`;
        }

        return stars;
    }

    function normalizeText(text) {
        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    }

    function getFilteredProducts() {
        const checkedCategories = [
            ...document.querySelectorAll('input[name="category"]:checked')
        ].map((input) => input.value);

        const minPrice = Number(document.querySelector("#minPrice")?.value) || 0;
        const maxPrice = Number(document.querySelector("#maxPrice")?.value) || Infinity;
        const searchTerm = normalizeText(searchInput?.value || "");

        const filteredProducts = products.filter((product) => {
            const belongsToCategory =
                checkedCategories.length === 0 ||
                checkedCategories.includes(product.category);

            const belongsToPriceRange =
                product.price >= minPrice &&
                product.price <= maxPrice;

            const belongsToRating =
                product.rating >= selectedRating;

            const matchesSearch =
                normalizeText(product.name).includes(searchTerm) ||
                normalizeText(product.category).includes(searchTerm);

            return (
                belongsToCategory &&
                belongsToPriceRange &&
                belongsToRating &&
                matchesSearch
            );
        });

        return sortProductList(filteredProducts);
    }

    function sortProductList(productList) {
        const sortedProducts = [...productList];

        switch (sortProducts?.value) {
            case "lowest-price":
                return sortedProducts.sort((a, b) => a.price - b.price);

            case "highest-price":
                return sortedProducts.sort((a, b) => b.price - a.price);

            case "best-rated":
                return sortedProducts.sort((a, b) => {
                    if (b.rating === a.rating) {
                        return b.reviews - a.reviews;
                    }

                    return b.rating - a.rating;
                });

            default:
                return sortedProducts.sort((a, b) => b.popularity - a.popularity);
        }
    }

    function createProductCard(product) {
        const isFavorite = favoriteProducts.includes(product.id);

        const badge = product.tag
            ? `<span class="product-badge ${product.tagClass}">${product.tag}</span>`
            : "";

        return `
            <article class="product-card" data-product-id="${product.id}">
                <div class="product-image">
                    ${badge}

                    <button
                        class="favorite-button ${isFavorite ? "active" : ""}"
                        type="button"
                        aria-label="${isFavorite ? "Remover dos favoritos" : "Favoritar produto"}"
                    >
                        <i class="${isFavorite ? "fa-solid" : "fa-regular"} fa-heart"></i>
                    </button>

                    <img
                        src="${product.image}"
                        alt="${product.alt}"
                    >
                </div>

                <div class="product-info">
                    <div class="product-rating">
                        <span class="stars">
                            ${createStars(product.rating)}
                        </span>

                        <span>(${formatReviews(product.reviews)})</span>
                    </div>

                    <h2>${product.name}</h2>

                    <span class="old-price">${formatPrice(product.oldPrice)}</span>

                    <strong class="product-price">
                        ${formatPrice(product.price)}
                        <small>à vista</small>
                    </strong>

                    <button type="button" class="buy-button">
                        <i class="fa-solid fa-cart-shopping"></i>
                        Comprar
                    </button>
                </div>
            </article>
        `;
    }

    function renderProducts() {
        const filteredProducts = getFilteredProducts();
        const totalPages = Math.max(
            1,
            Math.ceil(filteredProducts.length / productsPerPage)
        );

        if (currentPage > totalPages) {
            currentPage = totalPages;
        }

        const firstProduct = (currentPage - 1) * productsPerPage;
        const productsOnPage = filteredProducts.slice(
            firstProduct,
            firstProduct + productsPerPage
        );

        if (productsOnPage.length === 0) {
            productsGrid.innerHTML = `
                <div class="empty-products">
                    <i class="fa-solid fa-box-open"></i>
                    <h2>Nenhum produto encontrado</h2>
                    <p>Tente mudar sua busca ou seus filtros.</p>
                </div>
            `;
        } else {
            productsGrid.innerHTML = productsOnPage
                .map(createProductCard)
                .join("");
        }

        updateResultsCount(filteredProducts.length, productsOnPage.length);
        renderPagination(totalPages);
    }

    function updateResultsCount(total, displayed) {
        if (!resultsCount) {
            return;
        }

        resultsCount.innerHTML = `
            Mostrando <strong>${displayed}</strong>
            de <strong>${total}</strong> produtos
        `;
    }

    function renderPagination(totalPages) {
        if (!pagination) {
            return;
        }

        let pages = [];

        if (totalPages <= 5) {
            pages = Array.from(
                { length: totalPages },
                (_, index) => index + 1
            );
        } else {
            pages = [1, 2, 3, "...", totalPages];
        }

        pagination.innerHTML = `
            <button
                type="button"
                class="pagination-button"
                data-page="${currentPage - 1}"
                aria-label="Página anterior"
                ${currentPage === 1 ? "disabled" : ""}
            >
                <i class="fa-solid fa-chevron-left"></i>
            </button>

            ${pages.map((page) => {
                if (page === "...") {
                    return `<span class="pagination-dots">...</span>`;
                }

                return `
                    <button
                        type="button"
                        class="page-button ${page === currentPage ? "active" : ""}"
                        data-page="${page}"
                        ${page === currentPage ? 'aria-current="page"' : ""}
                    >
                        ${page}
                    </button>
                `;
            }).join("")}

            <button
                type="button"
                class="pagination-button"
                data-page="${currentPage + 1}"
                aria-label="Próxima página"
                ${currentPage === totalPages ? "disabled" : ""}
            >
                <i class="fa-solid fa-chevron-right"></i>
            </button>
        `;
    }

    function updateCartCount() {
        if (cartCount) {
            cartCount.textContent = cartItems;
        }
    }

    function updateRatingButtons() {
        ratingStars.forEach((button, index) => {
            const isActive = index < selectedRating;

            button.classList.toggle("active", isActive);
            button.setAttribute("aria-pressed", isActive);
        });
    }

    searchForm?.addEventListener("submit", (event) => {
        event.preventDefault();
        currentPage = 1;
        renderProducts();
    });

    searchInput?.addEventListener("input", () => {
        currentPage = 1;
        renderProducts();
    });

    sortProducts?.addEventListener("change", () => {
        currentPage = 1;
        renderProducts();
    });

    filtersForm?.addEventListener("input", () => {
        currentPage = 1;
        renderProducts();
    });

    ratingStars.forEach((button, index) => {
        button.addEventListener("click", () => {
            const rating = index + 1;

            selectedRating = selectedRating === rating ? 0 : rating;

            updateRatingButtons();
            currentPage = 1;
            renderProducts();
        });
    });

    productsGrid.addEventListener("click", (event) => {
        const productCard = event.target.closest(".product-card");

        if (!productCard) {
            return;
        }

        const productId = Number(productCard.dataset.productId);

        const favoriteButton = event.target.closest(".favorite-button");

        if (favoriteButton) {
            const isFavorite = favoriteProducts.includes(productId);

            if (isFavorite) {
                favoriteProducts = favoriteProducts.filter(
                    (id) => id !== productId
                );
            } else {
                favoriteProducts.push(productId);
            }

            renderProducts();
            return;
        }

        const buyButton = event.target.closest(".buy-button");

        if (buyButton) {
            cartItems += 1;
            updateCartCount();

            const originalText = buyButton.innerHTML;

            buyButton.innerHTML = `
                <i class="fa-solid fa-check"></i>
                Adicionado
            `;

            setTimeout(() => {
                buyButton.innerHTML = originalText;
            }, 1200);
        }
    });

    pagination?.addEventListener("click", (event) => {
        const pageButton = event.target.closest("button[data-page]");

        if (!pageButton || pageButton.disabled) {
            return;
        }

        currentPage = Number(pageButton.dataset.page);
        renderProducts();

        document.querySelector(".catalog")?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });

    updateRatingButtons();
    updateCartCount();
    renderProducts();
});


 //Ajuste apenas os caminhos `../img/produtos/...` para os nomes reais das imagens na sua pasta `img`.
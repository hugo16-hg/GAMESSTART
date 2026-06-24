/* ==========================
   HEADER
========================== */

const header = document.getElementById("header");

header.innerHTML = `
`;



/* ==========================
   LOGIN
========================== */

const loginContainer = document.getElementById("login-container");

loginContainer.innerHTML = `

<div class="login-card">

    <h1 class="login-title">
        Bem-vindo de volta
    </h1>

    <p class="login-subtitle">
        Por favor, insira seus dados para acessar sua conta
    </p>

    <form id="loginForm">

        <div class="form-group">

            <label class="form-label">
                E-mail
            </label>

            <div class="input-wrapper">

                <span class="input-icon">✉</span>

                <input
                    type="email"
                    class="form-input"
                    id="email"
                    placeholder="exemplo@email.com"
                    required
                >

            </div>

        </div>

        <div class="form-group">

            <div class="password-header">

                <label class="form-label">
                    Senha
                </label>

                <a href="#" class="forgot-password">
                    Esqueceu a senha?
                </a>

            </div>

            <div class="input-wrapper">

                <span class="input-icon">🔒</span>

                <input
                    type="password"
                    class="form-input"
                    id="password"
                    placeholder="••••••••"
                    required
                >

                <span
                    class="toggle-password"
                    id="togglePassword"
                >
                    👁
                </span>

            </div>

        </div>

        <div class="remember-area">

            <input
                type="checkbox"
                id="remember"
            >

            <label for="remember">
                Lembrar de mim
            </label>

        </div>

        <button
            type="submit"
            class="login-btn"
        >
            Entrar
        </button>

    </form>

    <div class="divider">
        OU CONTINUAR COM
    </div>

    <button class="google-btn">

        <span>
            🌐
        </span>

        Entrar com Google

    </button>

    <div class="register-area">

        Não tem uma conta?

        <a href="#">
            Criar conta
        </a>

    </div>

</div>

`;



/* ==========================
   FOOTER
========================== */

const footer = document.getElementById("footer");

footer.innerHTML = `
`;



/* ==========================
   MOSTRAR / OCULTAR SENHA
========================== */

document.addEventListener("click", (event) => {

    if(event.target.id === "togglePassword"){

        const password = document.getElementById("password");

        if(password.type === "password"){

            password.type = "text";
            event.target.textContent = "🙈";

        }else{

            password.type = "password";
            event.target.textContent = "👁";

        }

    }

});



/* ==========================
   LOGIN
========================== */

document.addEventListener("submit", (event) => {

    if(event.target.id === "loginForm"){

        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        console.log({
            email,
            password
        });

        alert("Login enviado!");

    }

});
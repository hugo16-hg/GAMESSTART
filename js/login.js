/* ==========================================================
   LOGO DA APLICAÇÃO
   Define a imagem exibida no topo da página.
========================================================== */
/*
const logo = document.getElementById("logo");

logo.src = "assets/images/logo.png";
logo.alt = "Logo da aplicação"; */


/* ==========================================================
   TÍTULO DA TELA
========================================================== */

document.getElementById("loginTitle").textContent =
"Bem-vindo";


/* ==========================================================
   SUBTÍTULO
========================================================== */

document.getElementById("loginSubtitle").textContent =
"Por favor, faça login para acessar sua conta.";


/* ==========================================================
   CAMPO E-MAIL
========================================================== */

document.getElementById("emailLabel").textContent =
"E-mail";

document.getElementById("email").placeholder =
"Digite seu e-mail";

document.getElementById("emailIcon").textContent =
"✉";


/* ==========================================================
   CAMPO SENHA
========================================================== */

document.getElementById("passwordLabel").textContent =
"Senha";

document.getElementById("password").placeholder =
"Digite sua senha";

document.getElementById("passwordIcon").textContent =
"🔒";


/* ==========================================================
   LINK ESQUECEU SENHA
========================================================== */

const forgotPassword =
document.getElementById("forgotPassword");

forgotPassword.textContent =
"Esqueceu a senha?";

forgotPassword.href = "#";


/* ==========================================================
   CHECKBOX LEMBRAR DE MIM
========================================================== */

document.getElementById("rememberLabel").textContent =
"Lembrar de mim";


/* ==========================================================
   BOTÃO ENTRAR
========================================================== */

document.getElementById("loginButton").textContent =
"Entrar";


/* ==========================================================
   DIVISOR
========================================================== */

document.getElementById("dividerText").textContent =
"OU CONTINUAR COM";


/* ==========================================================
   BOTÃO GOOGLE
========================================================== */

document.getElementById("googleIcon").textContent =
"🌐";

document.getElementById("googleText").textContent =
"Entrar com Google";


/* ==========================================================
   ÁREA DE CADASTRO
========================================================== */

document.getElementById("registerText").textContent =
"Não possui uma conta?";

const registerLink =
document.getElementById("registerLink");

registerLink.textContent =
"Criar conta";

registerLink.href = "#";


/* ==========================================================
   RODAPÉ
========================================================== */

document.getElementById("footerText").textContent =
"© 2026 Todos os direitos reservados.";


/* ==========================================================
   MOSTRAR / OCULTAR SENHA
========================================================== */

const password = document.getElementById("password");
const eyeIcon = document.getElementById("eyeIcon");
const showPassword = document.getElementById("showPassword");

showPassword.addEventListener("click", () => {

    if (password.type === "password") {
        password.type = "text";
        eyeIcon.src = "/assets/visivel.png";
    } else {
        password.type = "password";
        eyeIcon.src = "/assets/esconder.png";
    }

});
``

/* ==========================================================
   ENVIO DO FORMULÁRIO
========================================================== */

const loginForm =
document.getElementById("loginForm");

loginForm.addEventListener("submit",(event)=>{

    /* Impede o recarregamento da página */

    event.preventDefault();


    /* Captura os valores dos campos */

    const email =
    document.getElementById("email").value;

    const password =
    document.getElementById("password").value;

    const remember =
    document.getElementById("remember").checked;


    /* Exibe os dados no console */

    console.clear();

    console.log("========= LOGIN =========");

    console.log("E-mail:", email);

    console.log("Senha:", password);

    console.log("Lembrar:", remember);

    console.log("=========================");


    /* Aqui será chamada futuramente a API */

});


/* ==========================================================
   BOTÃO LOGIN GOOGLE
========================================================== */

const googleButton =
document.getElementById("googleButton");

googleButton.addEventListener("click",()=>{

    console.log("Login Google");

});


/* ==========================================================
   FUTURAS IMPLEMENTAÇÕES

   ✔ Login JWT

   ✔ Login Firebase

   ✔ API REST

   ✔ Recuperação de senha

   ✔ Cadastro

   ✔ Toast

   ✔ Loading

   ✔ LocalStorage

========================================================== */
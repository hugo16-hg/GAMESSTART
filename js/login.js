//=====================================================
// CONFIGURAÇÕES
//=====================================================

const API = "http://localhost:3000";


//=====================================================
// ELEMENTOS DA PÁGINA
//=====================================================

const loginForm =
   document.getElementById("loginForm");

const email =
   document.getElementById("email");

const password =
   document.getElementById("password");

const remember =
   document.getElementById("remember");

const mensagem =
   document.getElementById("mensagem");

const loginButton =
   document.getElementById("loginButton");

const showPassword =
   document.getElementById("showPassword");

const eyeIcon =
   document.getElementById("eyeIcon");

const googleButton =
   document.getElementById("googleButton");

const forgotPassword =
   document.getElementById("forgotPassword");

const registerLink =
   document.getElementById("registerLink");


//=====================================================
// TEXTOS DA PÁGINA
//=====================================================

document.getElementById("loginTitle").textContent =
   "Bem-vindo";


document.getElementById("loginSubtitle").textContent =
   "Por favor, faça login para acessar sua conta.";


document.getElementById("emailLabel").textContent =
   "E-mail";


email.placeholder =
   "Digite seu e-mail";


document.getElementById("emailIcon").textContent =
   "✉";


document.getElementById("passwordLabel").textContent =
   "Senha";


password.placeholder =
   "Digite sua senha";


forgotPassword.textContent =
   "Esqueceu a senha?";


document.getElementById("rememberLabel").textContent =
   "Lembrar de mim";


loginButton.textContent =
   "Entrar";


document.getElementById("dividerText").textContent =
   "OU CONTINUAR COM";


document.getElementById("googleText").textContent =
   "Entrar com Google";


document.getElementById("registerText").textContent =
   "Não possui uma conta?";


registerLink.textContent =
   "Criar conta";


document.getElementById("footerText").textContent =
   "© 2026 Todos os direitos reservados.";


//=====================================================
// MOSTRAR / OCULTAR SENHA
//=====================================================

showPassword.addEventListener("click", () => {


   if (password.type === "password") {


      password.type = "text";


      eyeIcon.src =
         "/assets/visivel.png";


      eyeIcon.alt =
         "Ocultar senha";


   } else {


      password.type = "password";


      eyeIcon.src =
         "/assets/esconder.png";


      eyeIcon.alt =
         "Mostrar senha";


   }


});


//=====================================================
// LOGIN
//=====================================================

loginForm.addEventListener("submit", async (event) => {


   // Impede o formulário de recarregar a página
   event.preventDefault();


   // Limpa mensagem anterior
   mensagem.innerHTML = "";


   // Obtém os dados
   const emailDigitado =
      email.value.trim();


   const senhaDigitada =
      password.value;


   //=================================================
   // VALIDAR CAMPOS
   //=================================================

   if (
      emailDigitado === "" ||
      senhaDigitada === ""
   ) {


      mensagem.style.color = "red";

      mensagem.innerHTML =
         "Preencha todos os campos.";


      return;


   }


   //=================================================
   // VALIDAR SENHA
   //=================================================

   if (senhaDigitada.length < 6) {


      mensagem.style.color = "red";

      mensagem.innerHTML =
         "A senha deve possuir no mínimo 6 caracteres.";


      return;


   }


   //=================================================
   // DESABILITAR BOTÃO
   //=================================================

   loginButton.disabled = true;

   loginButton.textContent =
      "Entrando...";


   try {


      //=================================================
      // CHAMAR API
      //=================================================

      const resposta = await fetch(
         `${API}/clientes/login`,
         {

            method: "POST",

            headers: {

               "Content-Type":
                  "application/json"

            },

            body: JSON.stringify({

               email: emailDigitado,

               senha: senhaDigitada

            })

         }
      );


      //=================================================
      // TRANSFORMAR RESPOSTA EM JSON
      //=================================================

      const dados =
         await resposta.json();


      //=================================================
      // LOGIN CORRETO
      //=================================================

      if (
         resposta.ok &&
         dados.sucesso
      ) {


         //=================================================
         // SALVAR CLIENTE
         //=================================================

         localStorage.setItem(
            "cliente",
            JSON.stringify(dados.cliente)
         );


         //=================================================
         // LEMBRAR LOGIN
         //=================================================

         if (remember.checked) {


            localStorage.setItem(
               "lembrarLogin",
               emailDigitado
            );


         } else {


            localStorage.removeItem(
               "lembrarLogin"
            );


         }


         //=================================================
         // MENSAGEM
         //=================================================

         mensagem.style.color =
            "green";


         mensagem.innerHTML =
            "Login realizado com sucesso!";


         //=================================================
         // REDIRECIONAR
         //=================================================

         setTimeout(() => {


            window.location.href =
               "../index.html";


         }, 700);


         return;


      }


      //=================================================
      // LOGIN INCORRETO
      //=================================================

      mensagem.style.color =
         "red";


      mensagem.innerHTML =
         dados.mensagem ||
         "E-mail ou senha incorretos.";


   } catch (erro) {


      //=================================================
      // ERRO DE CONEXÃO
      //=================================================

      console.error(
         "Erro ao realizar login:",
         erro
      );


      mensagem.style.color =
         "red";


      mensagem.innerHTML =
         "Não foi possível conectar com o servidor.";


   } finally {


      //=================================================
      // REATIVAR BOTÃO
      //=================================================

      loginButton.disabled =
         false;


      loginButton.textContent =
         "Entrar";


   }


});


//=====================================================
// RECUPERAR E-MAIL SALVO
//=====================================================

const emailSalvo =
   localStorage.getItem("lembrarLogin");


if (emailSalvo) {


   email.value =
      emailSalvo;


   remember.checked =
      true;


}


//=====================================================
// LINK CRIAR CONTA
//=====================================================

registerLink.addEventListener(
   "click",
   (event) => {


      event.preventDefault();


      window.location.href =
         "./cadastro.html";


   }
);


//=====================================================
// ESQUECEU A SENHA
//=====================================================

forgotPassword.addEventListener(
   "click",
   (event) => {


      event.preventDefault();


      alert(
         "Recuperação de senha ainda não configurada."
      );


   }
);


//=====================================================
// LOGIN GOOGLE
//=====================================================

googleButton.addEventListener(
   "click",
   () => {


      alert(
         "Login com Google ainda não configurado."
      );


   }
);
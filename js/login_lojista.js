//=====================================================
// CONFIGURAÇÕES
//=====================================================

const API = "http://localhost:3000";


//=====================================================
// ELEMENTOS
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

const forgotPassword =
    document.getElementById("forgotPassword");

const registerLink =
    document.getElementById("registerLink");


//=====================================================
// TEXTOS
//=====================================================

document.getElementById("brandName").textContent =
    "GamesStart";


document.getElementById("bannerTitle").textContent =
    "Gerencie sua loja em um só lugar";


document.getElementById("bannerText").textContent =
    "Cadastre produtos, acompanhe pedidos e gerencie sua loja virtual.";


document.getElementById("loginTitle").textContent =
    "Login do Lojista";


document.getElementById("loginSubtitle").textContent =
    "Entre com seus dados para acessar o painel administrativo.";


document.getElementById("emailLabel").textContent =
    "E-mail";


email.placeholder =
    "Digite seu e-mail";


document.getElementById("passwordLabel").textContent =
    "Senha";


password.placeholder =
    "Digite sua senha";


forgotPassword.textContent =
    "Esqueceu a senha?";


document.getElementById("rememberLabel").textContent =
    "Lembrar de mim";


loginButton.textContent =
    "Entrar no painel";


document.getElementById("registerText").textContent =
    "Ainda não possui cadastro?";


registerLink.textContent =
    "Criar conta";


//=====================================================
// MOSTRAR / OCULTAR SENHA
//=====================================================

showPassword.addEventListener("click", () => {


    if (password.type === "password") {


        password.type =
            "text";


        eyeIcon.classList.remove(
            "fa-eye"
        );


        eyeIcon.classList.add(
            "fa-eye-slash"
        );


    } else {


        password.type =
            "password";


        eyeIcon.classList.remove(
            "fa-eye-slash"
        );


        eyeIcon.classList.add(
            "fa-eye"
        );


    }


});


//=====================================================
// LOGIN
//=====================================================

loginForm.addEventListener(
    "submit",
    async event => {


        event.preventDefault();


        mensagem.innerHTML =
            "";


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


            mensagem.style.color =
                "red";


            mensagem.innerHTML =
                "Preencha todos os campos.";


            return;

        }


        //=================================================
        // VALIDAR SENHA
        //=================================================

        if (
            senhaDigitada.length < 6
        ) {


            mensagem.style.color =
                "red";


            mensagem.innerHTML =
                "A senha deve possuir no mínimo 6 caracteres.";


            return;

        }


        //=================================================
        // DESABILITAR BOTÃO
        //=================================================

        loginButton.disabled =
            true;


        loginButton.textContent =
            "Entrando...";


        try {


            //=================================================
            // CHAMAR API
            //=================================================

            const resposta =
                await fetch(
                    `${API}/lojistas/login`,
                    {

                        method:
                            "POST",

                        headers: {

                            "Content-Type":
                                "application/json"

                        },

                        body:
                            JSON.stringify({

                                email:
                                    emailDigitado,

                                senha:
                                    senhaDigitada

                            })

                    }
                );


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
                // SALVAR LOJISTA
                //=================================================

                localStorage.setItem(
                    "lojista",
                    JSON.stringify(
                        dados.lojista
                    )
                );


                //=================================================
                // SALVAR LOJA
                //=================================================

                if (dados.loja) {


                    localStorage.setItem(
                        "loja",
                        JSON.stringify(
                            dados.loja
                        )
                    );


                }


                //=================================================
                // LEMBRAR E-MAIL
                //=================================================

                if (
                    remember.checked
                ) {


                    localStorage.setItem(
                        "emailLojista",
                        emailDigitado
                    );


                } else {


                    localStorage.removeItem(
                        "emailLojista"
                    );


                }


                mensagem.style.color =
                    "green";


                mensagem.innerHTML =
                    "Login realizado com sucesso!";


                //=================================================
                // REDIRECIONAR
                //=================================================

                setTimeout(() => {


                    window.location.href =
                        "../pages/cadastro_produto.html";


                }, 600);


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


            console.error(
                "Erro ao realizar login:",
                erro
            );


            mensagem.style.color =
                "red";


            mensagem.innerHTML =
                "Não foi possível conectar com o servidor.";


        } finally {


            loginButton.disabled =
                false;


            loginButton.textContent =
                "Entrar no painel";


        }


    }
);


//=====================================================
// RECUPERAR E-MAIL
//=====================================================

const emailSalvo =
    localStorage.getItem(
        "emailLojista"
    );


if (emailSalvo) {


    email.value =
        emailSalvo;


    remember.checked =
        true;


}


//=====================================================
// ESQUECEU SENHA
//=====================================================

forgotPassword.addEventListener(
    "click",
    event => {


        event.preventDefault();


        alert(
            "Recuperação de senha ainda não configurada."
        );


    }
);


//=====================================================
// CADASTRO
//=====================================================

registerLink.addEventListener(
    "click",
    event => {


        event.preventDefault();


        window.location.href =
            "../cadastro_lojista.html";


    }
);
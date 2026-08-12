//=====================================================
// CONFIGURAÇÃO DA API
//=====================================================

const API = "http://localhost:3000";


//=====================================================
// TEXTOS DA TELA
//=====================================================

document.getElementById("nomeSistema").innerHTML =
    "GamesStart";

document.getElementById("tituloBoasVindas").innerHTML =
    "Sua próxima aventura começa aqui.";

document.getElementById("descricaoBoasVindas").innerHTML =
    "Crie sua conta e tenha acesso aos melhores jogos, ofertas e novidades.";

document.getElementById("tituloSeguranca").innerHTML =
    "Compra Segura";

document.getElementById("descricaoSeguranca").innerHTML =
    "Seus dados estão protegidos.";

document.getElementById("tituloRapidez").innerHTML =
    "Cadastro Rápido";

document.getElementById("descricaoRapidez").innerHTML =
    "Crie sua conta em poucos minutos.";

document.getElementById("tituloCadastro").innerHTML =
    "Criar Conta";

document.getElementById("subtituloCadastro").innerHTML =
    "Preencha seus dados para começar.";

document.getElementById("labelNome").innerHTML =
    "Nome Completo";

document.getElementById("labelEmail").innerHTML =
    "E-mail";

document.getElementById("labelTelefone").innerHTML =
    "Telefone";

document.getElementById("labelCpf").innerHTML =
    "CPF";

document.getElementById("labelDataNascimento").innerHTML =
    "Data de Nascimento";

document.getElementById("labelSenha").innerHTML =
    "Senha";

document.getElementById("labelConfirmarSenha").innerHTML =
    "Confirmar Senha";

document.getElementById("textoTermos").innerHTML =
    "Li e aceito os termos de uso.";

document.getElementById("btnCadastrar").innerHTML =
    "Criar Conta";

document.getElementById("textoLogin").innerHTML =
    "Já possui uma conta?";

document.getElementById("linkLogin").innerHTML =
    "Entrar";

document.getElementById("textoSeparador").innerHTML =
    "ou continue com";

document.getElementById("textoGoogle").innerHTML =
    "Google";

document.getElementById("textoApple").innerHTML =
    "Apple";


//=====================================================
// PLACEHOLDERS
//=====================================================

document.getElementById("inputNome").placeholder =
    "Digite seu nome completo";

document.getElementById("inputEmail").placeholder =
    "exemplo@email.com";

document.getElementById("inputTelefone").placeholder =
    "(00) 00000-0000";

document.getElementById("inputCpf").placeholder =
    "000.000.000-00";

document.getElementById("inputDataNascimento").placeholder =
    "DD/MM/AAAA";

document.getElementById("inputSenha").placeholder =
    "Digite sua senha";

document.getElementById("inputConfirmarSenha").placeholder =
    "Confirme sua senha";


//=====================================================
// ELEMENTOS
//=====================================================

const inputNome =
    document.getElementById("inputNome");

const inputEmail =
    document.getElementById("inputEmail");

const inputTelefone =
    document.getElementById("inputTelefone");

const inputCpf =
    document.getElementById("inputCpf");

const inputDataNascimento =
    document.getElementById("inputDataNascimento");

const inputSenha =
    document.getElementById("inputSenha");

const inputConfirmarSenha =
    document.getElementById("inputConfirmarSenha");

const checkTermos =
    document.getElementById("checkTermos");

const btnCadastrar =
    document.getElementById("btnCadastrar");

const mensagem =
    document.getElementById("mensagem");


//=====================================================
// MÁSCARA CPF
//=====================================================

inputCpf.addEventListener("input", () => {

    let cpf =
        inputCpf.value.replace(/\D/g, "");

    cpf =
        cpf.substring(0, 11);

    cpf = cpf.replace(
        /(\d{3})(\d)/,
        "$1.$2"
    );

    cpf = cpf.replace(
        /(\d{3})(\d)/,
        "$1.$2"
    );

    cpf = cpf.replace(
        /(\d{3})(\d{1,2})$/,
        "$1-$2"
    );

    inputCpf.value = cpf;

});


//=====================================================
// MÁSCARA TELEFONE
//=====================================================

inputTelefone.addEventListener("input", () => {

    let telefone =
        inputTelefone.value.replace(/\D/g, "");

    telefone =
        telefone.substring(0, 11);


    if (telefone.length > 10) {

        telefone = telefone.replace(
            /^(\d{2})(\d{5})(\d{4})$/,
            "($1) $2-$3"
        );

    } else {

        telefone = telefone.replace(
            /^(\d{2})(\d{4})(\d{0,4})$/,
            "($1) $2-$3"
        );

    }


    inputTelefone.value = telefone;

});


//=====================================================
// MÁSCARA DATA DE NASCIMENTO
//=====================================================

inputDataNascimento.addEventListener(
    "input",
    () => {

        let data =
            inputDataNascimento.value.replace(
                /\D/g,
                ""
            );

        data =
            data.substring(0, 8);


        if (data.length >= 5) {

            data =
                data.substring(0, 2) +
                "/" +
                data.substring(2, 4) +
                "/" +
                data.substring(4);

        }

        else if (data.length >= 3) {

            data =
                data.substring(0, 2) +
                "/" +
                data.substring(2);

        }


        inputDataNascimento.value =
            data;

    }
);


//=====================================================
// VALIDAR EMAIL
//=====================================================

function validarEmail(email) {

    const regex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);

}


//=====================================================
// VALIDAR CPF
//=====================================================

function validarCpf(cpf) {

    cpf =
        cpf.replace(/\D/g, "");


    if (cpf.length !== 11) {

        return false;

    }


    if (/^(\d)\1{10}$/.test(cpf)) {

        return false;

    }


    let soma = 0;

    let resto;


    for (let i = 1; i <= 9; i++) {

        soma =
            soma +
            parseInt(cpf.substring(i - 1, i)) *
            (11 - i);

    }


    resto =
        (soma * 10) % 11;


    if (resto === 10 || resto === 11) {

        resto = 0;

    }


    if (
        resto !==
        parseInt(cpf.substring(9, 10))
    ) {

        return false;

    }


    soma = 0;


    for (let i = 1; i <= 10; i++) {

        soma =
            soma +
            parseInt(cpf.substring(i - 1, i)) *
            (12 - i);

    }


    resto =
        (soma * 10) % 11;


    if (resto === 10 || resto === 11) {

        resto = 0;

    }


    if (
        resto !==
        parseInt(cpf.substring(10, 11))
    ) {

        return false;

    }


    return true;

}


//=====================================================
// CONVERTER DATA
// DD/MM/AAAA -> AAAA-MM-DD
//=====================================================

function converterData(data) {

    const partes =
        data.split("/");


    if (partes.length !== 3) {

        return null;

    }


    const dia =
        partes[0];

    const mes =
        partes[1];

    const ano =
        partes[2];


    if (
        dia.length !== 2 ||
        mes.length !== 2 ||
        ano.length !== 4
    ) {

        return null;

    }


    return `${ano}-${mes}-${dia}`;

}


//=====================================================
// VALIDAR DATA
//=====================================================

function validarData(data) {

    const partes =
        data.split("/");


    if (partes.length !== 3) {

        return false;

    }


    const dia =
        parseInt(partes[0]);

    const mes =
        parseInt(partes[1]);

    const ano =
        parseInt(partes[2]);


    if (
        dia < 1 ||
        dia > 31
    ) {

        return false;

    }


    if (
        mes < 1 ||
        mes > 12
    ) {

        return false;

    }


    if (
        ano < 1900 ||
        ano > new Date().getFullYear()
    ) {

        return false;

    }


    const dataObjeto =
        new Date(
            ano,
            mes - 1,
            dia
        );


    return (
        dataObjeto.getDate() === dia &&
        dataObjeto.getMonth() === mes - 1 &&
        dataObjeto.getFullYear() === ano
    );

}


//=====================================================
// MOSTRAR / ESCONDER SENHA
//=====================================================

function mostrarSenha(idCampo, botao) {

    const campo =
        document.getElementById(idCampo);

    const icone =
        botao.querySelector("i");


    if (campo.type === "password") {

        campo.type = "text";

        icone.classList.remove(
            "fa-eye"
        );

        icone.classList.add(
            "fa-eye-slash"
        );

    }

    else {

        campo.type = "password";

        icone.classList.remove(
            "fa-eye-slash"
        );

        icone.classList.add(
            "fa-eye"
        );

    }

}


//=====================================================
// MENSAGEM
//=====================================================

function mostrarMensagem(
    texto,
    cor
) {

    mensagem.style.color =
        cor;

    mensagem.innerHTML =
        texto;

}


//=====================================================
// CADASTRAR CLIENTE
//=====================================================

btnCadastrar.addEventListener(
    "click",
    async () => {

        //=================================================
        // PEGAR DADOS
        //=================================================

        const nome =
            inputNome.value.trim();

        const email =
            inputEmail.value.trim();

        const telefone =
            inputTelefone.value.trim();

        const cpf =
            inputCpf.value.trim();

        const dataNascimento =
            inputDataNascimento.value.trim();

        const senha =
            inputSenha.value;

        const confirmarSenha =
            inputConfirmarSenha.value;


        //=================================================
        // VALIDAR CAMPOS VAZIOS
        //=================================================

        if (
            nome === "" ||
            email === "" ||
            telefone === "" ||
            cpf === "" ||
            dataNascimento === "" ||
            senha === "" ||
            confirmarSenha === ""
        ) {

            mostrarMensagem(
                "Preencha todos os campos.",
                "red"
            );

            return;

        }


        //=================================================
        // VALIDAR NOME
        //=================================================

        if (nome.length < 3) {

            mostrarMensagem(
                "Digite seu nome completo.",
                "red"
            );

            return;

        }


        //=================================================
        // VALIDAR EMAIL
        //=================================================

        if (!validarEmail(email)) {

            mostrarMensagem(
                "Digite um e-mail válido.",
                "red"
            );

            return;

        }


        //=================================================
        // VALIDAR TELEFONE
        //=================================================

        const telefoneNumeros =
            telefone.replace(/\D/g, "");


        if (
            telefoneNumeros.length < 10 ||
            telefoneNumeros.length > 11
        ) {

            mostrarMensagem(
                "Digite um telefone válido.",
                "red"
            );

            return;

        }


        //=================================================
        // VALIDAR CPF
        //=================================================

        if (!validarCpf(cpf)) {

            mostrarMensagem(
                "Digite um CPF válido.",
                "red"
            );

            return;

        }


        //=================================================
        // VALIDAR DATA
        //=================================================

        if (!validarData(dataNascimento)) {

            mostrarMensagem(
                "Digite uma data de nascimento válida.",
                "red"
            );

            return;

        }


        //=================================================
        // VALIDAR TAMANHO DA SENHA
        //=================================================

        if (
            senha.length < 8 ||
            senha.length > 20
        ) {

            mostrarMensagem(
                "A senha deve ter entre 8 e 20 caracteres.",
                "red"
            );

            return;

        }


        //=================================================
        // VALIDAR LETRA MAIÚSCULA
        //=================================================

        if (!/[A-Z]/.test(senha)) {

            mostrarMensagem(
                "A senha deve possuir pelo menos uma letra maiúscula.",
                "red"
            );

            return;

        }


        //=================================================
        // VALIDAR LETRA MINÚSCULA
        //=================================================

        if (!/[a-z]/.test(senha)) {

            mostrarMensagem(
                "A senha deve possuir pelo menos uma letra minúscula.",
                "red"
            );

            return;

        }


        //=================================================
        // VALIDAR NÚMERO
        //=================================================

        if (!/[0-9]/.test(senha)) {

            mostrarMensagem(
                "A senha deve possuir pelo menos um número.",
                "red"
            );

            return;

        }


        //=================================================
        // VALIDAR CARACTERE ESPECIAL
        //=================================================

        if (
            !/[!@#$%^&*()_\-+=]/.test(senha)
        ) {

            mostrarMensagem(
                "A senha deve possuir pelo menos um caractere especial.",
                "red"
            );

            return;

        }


        //=================================================
        // CONFIRMAR SENHA
        //=================================================

        if (
            senha !==
            confirmarSenha
        ) {

            mostrarMensagem(
                "As senhas não coincidem.",
                "red"
            );

            return;

        }


        //=================================================
        // TERMOS
        //=================================================

        if (!checkTermos.checked) {

            mostrarMensagem(
                "Aceite os termos de uso para continuar.",
                "red"
            );

            return;

        }


        //=================================================
        // CONVERTER DATA
        //=================================================

        const dataConvertida =
            converterData(
                dataNascimento
            );


        if (!dataConvertida) {

            mostrarMensagem(
                "Data de nascimento inválida.",
                "red"
            );

            return;

        }


        //=================================================
        // OBJETO CLIENTE
        //=================================================

        const cliente = {

            nome: nome,

            cpf:
                cpf.replace(/\D/g, ""),

            telefone:
                telefone.replace(/\D/g, ""),

            email: email,

            senha: senha,

            data_nascimento:
                dataConvertida,

            Loja_id_loja: 1

        };


        console.log(
            "Dados enviados:",
            cliente
        );


        //=================================================
        // DESABILITAR BOTÃO
        //=================================================

        btnCadastrar.disabled =
            true;

        btnCadastrar.innerHTML =
            "Cadastrando...";


        mostrarMensagem(
            "Realizando cadastro...",
            "#555"
        );


        //=================================================
        // FETCH
        //=================================================

        try {

            const resposta = await fetch(
                "http://localhost:3000/clientes",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(cliente)
                }
            );


            // Primeiro recebe como texto
            const textoResposta =
                await resposta.text();


            console.log(
                "STATUS:",
                resposta.status
            );

            console.log(
                "RESPOSTA BRUTA:",
                textoResposta
            );


            let dados;


            try {

                dados =
                    JSON.parse(textoResposta);

            }

            catch {

                console.error(
                    "Servidor não retornou JSON:"
                );

                console.error(
                    textoResposta
                );


                mensagem.style.color =
                    "red";

                mensagem.innerHTML =
                    "O servidor respondeu com erro. Veja o Console.";

                return;

            }


            if (!resposta.ok) {

                mensagem.style.color =
                    "red";

                mensagem.innerHTML =
                    dados.mensagem ||
                    "Erro ao cadastrar cliente.";

                return;

            }


            mensagem.style.color =
                "green";

            mensagem.innerHTML =
                "Cadastro realizado com sucesso!";


            setTimeout(() => {

                window.location.href =
                    "login.html";

            }, 1500);

        }

        catch (erro) {

            console.error(
                "ERRO REAL DE CONEXÃO:",
                erro
            );


            mensagem.style.color =
                "red";

            mensagem.innerHTML =
                "Não foi possível acessar a API.";

        }
    }
);


//=====================================================
// BOTÃO GOOGLE
//=====================================================

document
    .getElementById("btnGoogle")
    .addEventListener(
        "click",
        () => {

            mostrarMensagem(
                "Login com Google ainda não configurado.",
                "#555"
            );

        }
    );


//=====================================================
// BOTÃO APPLE
//=====================================================

document
    .getElementById("btnApple")
    .addEventListener(
        "click",
        () => {

            mostrarMensagem(
                "Login com Apple ainda não configurado.",
                "#555"
            );

        }
    );
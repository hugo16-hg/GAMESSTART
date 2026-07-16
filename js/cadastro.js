/* ==========================================================
   DADOS DA PÁGINA
========================================================== */

const cadastro = {

    sistema: "GamesStart",

    tituloBoasVindas: "Bem-vindo à nossa comunidade.",

    descricaoBoasVindas:
        "Crie sua conta em poucos minutos e comece sua jornada dentro da GamesStart.",

    tituloSeguranca: "Segurança",

    descricaoSeguranca:
        "Todos os seus dados são protegidos utilizando criptografia e boas práticas de segurança.",

    tituloRapidez: "Rapidez",

    descricaoRapidez:
        "Seu cadastro leva menos de um minuto para ser concluído.",

    tituloCadastro: "Criar Conta",

    subtituloCadastro:
        "Preencha as informações abaixo para criar sua conta.",

    labelNome: "Nome Completo",

    labelEmail: "E-mail",

    labelTelefone: "Telefone",

    labelCpf: "CPF",

    labelDataNascimento: "Data de Nascimento",

    labelSenha: "Senha",

    labelConfirmarSenha: "Confirmar Senha",

    placeholderNome: "Digite seu nome",

    placeholderEmail: "Digite seu e-mail",

    placeholderTelefone: "(00) 00000-0000",

    placeholderCpf: "000.000.000-00",

    placeholderDataNascimento: "00/00/0000",

    placeholderSenha: "Digite sua senha",

    placeholderConfirmarSenha: "Repita sua senha",

    textoTermos:
        "Li e aceito os Termos de Uso e a Política de Privacidade.",

    textoBotao: "Cadastrar",

    textoLogin: "Já possui uma conta?",

    linkLogin: "Entrar",

    textoSeparador: "OU CADASTRE-SE COM",

    textoGoogle: "Google",

    textoApple: "Apple"

};


/* ==========================================================
   INICIALIZAÇÃO
========================================================== */

document.addEventListener("DOMContentLoaded", iniciarPagina);

function iniciarPagina(){

    preencherTextos();

    preencherPlaceholders();

    adicionarEventos();

}


/* ==========================================================
   PREENCHER TEXTOS
========================================================== */

function preencherTextos(){

    document.getElementById("nomeSistema").textContent = cadastro.sistema;

    document.getElementById("tituloBoasVindas").textContent = cadastro.tituloBoasVindas;

    document.getElementById("descricaoBoasVindas").textContent = cadastro.descricaoBoasVindas;

    document.getElementById("tituloSeguranca").textContent = cadastro.tituloSeguranca;

    document.getElementById("descricaoSeguranca").textContent = cadastro.descricaoSeguranca;

    document.getElementById("tituloRapidez").textContent = cadastro.tituloRapidez;

    document.getElementById("descricaoRapidez").textContent = cadastro.descricaoRapidez;

    document.getElementById("tituloCadastro").textContent = cadastro.tituloCadastro;

    document.getElementById("subtituloCadastro").textContent = cadastro.subtituloCadastro;

    document.getElementById("labelNome").textContent = cadastro.labelNome;

    document.getElementById("labelEmail").textContent = cadastro.labelEmail;

    document.getElementById("labelTelefone").textContent = cadastro.labelTelefone;

    document.getElementById("labelCpf").textContent = cadastro.labelCpf;

    document.getElementById("labelDataNascimento").textContent = cadastro.labelDataNascimento;

    document.getElementById("labelSenha").textContent = cadastro.labelSenha;

    document.getElementById("labelConfirmarSenha").textContent = cadastro.labelConfirmarSenha;

    document.getElementById("textoTermos").textContent = cadastro.textoTermos;

    document.getElementById("btnCadastrar").textContent = cadastro.textoBotao;

    document.getElementById("textoLogin").textContent = cadastro.textoLogin;

    document.getElementById("linkLogin").textContent = cadastro.linkLogin;

    document.getElementById("textoSeparador").textContent = cadastro.textoSeparador;

    document.getElementById("textoGoogle").textContent = cadastro.textoGoogle;

    document.getElementById("textoApple").textContent = cadastro.textoApple;

}


/* ==========================================================
   PLACEHOLDERS
========================================================== */

function preencherPlaceholders(){

    document.getElementById("inputNome").placeholder = cadastro.placeholderNome;

    document.getElementById("inputEmail").placeholder = cadastro.placeholderEmail;

    document.getElementById("inputTelefone").placeholder = cadastro.placeholderTelefone;

    document.getElementById("inputCpf").placeholder = cadastro.placeholderCpf;

    document.getElementById("inputDataNascimento").placeholder = cadastro.placeholderDataNascimento;

    document.getElementById("inputSenha").placeholder = cadastro.placeholderSenha;

    document.getElementById("inputConfirmarSenha").placeholder = cadastro.placeholderConfirmarSenha;

}


/* ==========================================================
   EVENTOS
========================================================== */

function adicionarEventos(){

    document
        .getElementById("formCadastro")
        .addEventListener("submit", enviarFormulario);

    document
        .getElementById("inputTelefone")
        .addEventListener("input", mascaraTelefone);

    document
        .getElementById("inputCpf")
        .addEventListener("input", mascaraCpf);

    document
        .getElementById("inputDataNascimento")
        .addEventListener("input", mascaraData);

}


/* ==========================================================
   MÁSCARAS
========================================================== */

function mascaraTelefone(e){

    let valor = e.target.value.replace(/\D/g,'');

    valor = valor.substring(0,11);

    valor = valor.replace(/^(\d{2})(\d)/,'($1) $2');

    valor = valor.replace(/(\d{5})(\d)/,'$1-$2');

    e.target.value = valor;

}

function mascaraCpf(e){

    let valor = e.target.value.replace(/\D/g,'');

    valor = valor.substring(0,11);

    valor = valor.replace(/(\d{3})(\d)/,'$1.$2');

    valor = valor.replace(/(\d{3})(\d)/,'$1.$2');

    valor = valor.replace(/(\d{3})(\d{1,2})$/,'$1-$2');

    e.target.value = valor;

}

function mascaraData(e){

    let valor = e.target.value.replace(/\D/g,'');

    valor = valor.substring(0,8);

    valor = valor.replace(/(\d{2})(\d)/,'$1/$2');

    valor = valor.replace(/(\d{2})(\d)/,'$1/$2');

    e.target.value = valor;

}


/* ==========================================================
   ENVIO
========================================================== */

function enviarFormulario(event){

    event.preventDefault();

    const usuario = {

        nome: document.getElementById("inputNome").value.trim(),

        email: document.getElementById("inputEmail").value.trim(),

        telefone: document.getElementById("inputTelefone").value.trim(),

        cpf: document.getElementById("inputCpf").value.trim(),

        dataNascimento: document.getElementById("inputDataNascimento").value.trim(),

        senha: document.getElementById("inputSenha").value,

        confirmarSenha: document.getElementById("inputConfirmarSenha").value,

        aceitouTermos: document.getElementById("checkTermos").checked

    };

    if(usuario.dataNascimento.length !== 10){

        alert("Informe uma data de nascimento válida.");

        return;

    }

    console.clear();

    console.log("Dados do usuário:");

    console.table(usuario);

}


/* ==========================================================
   FUTURAMENTE
========================================================== */

/*

Aqui será feita a conexão com o banco.

fetch("http://localhost:3000/usuarios",{

    method:"POST",

    headers:{

        "Content-Type":"application/json"

    },

    body:JSON.stringify(usuario)

});

*/
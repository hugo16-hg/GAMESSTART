/*========================================================
  CRIANDO O BANCO DE DADOS
========================================================*/

CREATE DATABASE GAME_START;

-- COMANDO PARA EXCLUIR O BANCO DE DADOS
-- DROP DATABASE GAMESSTART;

USE GAME_START;


/*========================================================
  TABELAS SEM CHAVE ESTRANGEIRA
========================================================*/




CREATE TABLE Lojista (

    id_lojista INT AUTO_INCREMENT PRIMARY KEY,

    nome VARCHAR(450) NOT NULL,

    cpf VARCHAR(14) UNIQUE NOT NULL,

    cnpj VARCHAR(18) UNIQUE,

    email VARCHAR(450) NOT NULL UNIQUE,

    senha VARCHAR(20) NOT NULL,

    telefone VARCHAR(20)

);



CREATE TABLE Endereco (

    id_endereco INT AUTO_INCREMENT PRIMARY KEY,

    rua VARCHAR(100) NOT NULL,

    cep VARCHAR(10) NOT NULL,

    bairro VARCHAR(100) NOT NULL,

    numero INT,

    complemento VARCHAR(200),

    tipo VARCHAR(45)

);




CREATE TABLE Forma_Pagamento (

    id_forma_pagamento INT AUTO_INCREMENT PRIMARY KEY,

    nome VARCHAR(45) NOT NULL,

    link VARCHAR(200),

    ativo BOOLEAN DEFAULT TRUE

);




CREATE TABLE Categorias (

    id_categorias INT AUTO_INCREMENT PRIMARY KEY,

    nome VARCHAR(100) NOT NULL,

    imagem VARCHAR(500)

);




CREATE TABLE Loja (

    id_loja INT AUTO_INCREMENT PRIMARY KEY,

    nome VARCHAR(450) NOT NULL,

    whatsapp VARCHAR(20) NOT NULL,

    instagram VARCHAR(100),

    facebook VARCHAR(100),

    linkedin VARCHAR(100),

    telefone VARCHAR(20) NOT NULL,

    email VARCHAR(450) NOT NULL,

    Lojista_id_lojista INT NOT NULL,

    Endereco_id_endereco INT NOT NULL,


    FOREIGN KEY (Lojista_id_lojista)
    REFERENCES Lojista(id_lojista),

    FOREIGN KEY (Endereco_id_endereco)
    REFERENCES Endereco(id_endereco)

);




CREATE TABLE Cliente (

    id_cliente INT AUTO_INCREMENT PRIMARY KEY,

    nome VARCHAR(450) NOT NULL,

    cpf VARCHAR(14) NOT NULL UNIQUE,

    telefone VARCHAR(20) NOT NULL,

    email VARCHAR(450) NOT NULL UNIQUE,

    senha VARCHAR(20) NOT NULL,

    data_nascimento DATE NOT NULL,

    Loja_id_loja INT NOT NULL,


    FOREIGN KEY (Loja_id_loja)
    REFERENCES Loja(id_loja)

);



CREATE TABLE Cliente_has_Endereco (

    Cliente_id_cliente INT NOT NULL,

    Endereco_id_endereco INT NOT NULL,


    PRIMARY KEY (
        Cliente_id_cliente,
        Endereco_id_endereco
    ),


    FOREIGN KEY (Cliente_id_cliente)
    REFERENCES Cliente(id_cliente),

    FOREIGN KEY (Endereco_id_endereco)
    REFERENCES Endereco(id_endereco)

);




CREATE TABLE Cartao_Pagamento (

    id_cartao_pagamento INT AUTO_INCREMENT PRIMARY KEY,

    numero VARCHAR(20) NOT NULL,

    data_vencimento VARCHAR(7) NOT NULL,

    cvc VARCHAR(4) NOT NULL,

    cpf VARCHAR(14) NOT NULL,

    nome_proprietario VARCHAR(100) NOT NULL,

    nome_identificacao VARCHAR(100),

    bandeira VARCHAR(45) NOT NULL,

    tipo VARCHAR(45) NOT NULL,

    ativo BOOLEAN DEFAULT TRUE,

    Cliente_id_cliente INT NOT NULL,


    FOREIGN KEY (Cliente_id_cliente)
    REFERENCES Cliente(id_cliente)

);




CREATE TABLE Carrinho (

    id_carrinho INT AUTO_INCREMENT PRIMARY KEY,

    quantidade_produto INT DEFAULT 0,

    preco_total DECIMAL(10,2) DEFAULT 0.00,

    Cliente_id_cliente INT NOT NULL,


    FOREIGN KEY (Cliente_id_cliente)
    REFERENCES Cliente(id_cliente)

);




CREATE TABLE Banner (

    id_banner INT AUTO_INCREMENT PRIMARY KEY,

    imagem LONGBLOB NOT NULL,

    data_inicio DATE NOT NULL,

    data_final DATE,

    status_visibilidade BOOLEAN NOT NULL DEFAULT TRUE,

    Loja_id_loja INT NOT NULL,


    FOREIGN KEY (Loja_id_loja)
    REFERENCES Loja(id_loja)

);




CREATE TABLE Promocao (

    id_promocao INT AUTO_INCREMENT PRIMARY KEY,

    data_inicio DATE NOT NULL,

    data_final DATE,

    valor_promocional DECIMAL(10,2) NOT NULL,

    nome VARCHAR(100) NOT NULL,

    Banner_id_banner INT,


    FOREIGN KEY (Banner_id_banner)
    REFERENCES Banner(id_banner)

);




CREATE TABLE Cupom (

    id_cupom INT AUTO_INCREMENT PRIMARY KEY,

    nome VARCHAR(45) NOT NULL,

    data_validade DATE NOT NULL,

    quantidade INT NOT NULL,

    desconto DECIMAL(10,2) NOT NULL,

    Loja_id_loja INT NOT NULL,


    FOREIGN KEY (Loja_id_loja)
    REFERENCES Loja(id_loja)

);




CREATE TABLE Pedidos (

    id_pedidos INT AUTO_INCREMENT PRIMARY KEY,

    data_pedido DATE NOT NULL,

    data_entrega DATE,

    nota_fiscal LONGBLOB,

    status_entrega VARCHAR(45) NOT NULL,

    status_pagamento VARCHAR(45) NOT NULL,

    codigo VARCHAR(45) NOT NULL UNIQUE,

    Cliente_id_cliente INT NOT NULL,

    Loja_id_loja INT NOT NULL,

    Endereco_id_endereco INT NOT NULL,

    Forma_Pagamento_id_forma_pagamento INT NOT NULL,


    FOREIGN KEY (Cliente_id_cliente)
    REFERENCES Cliente(id_cliente),

    FOREIGN KEY (Loja_id_loja)
    REFERENCES Loja(id_loja),

    FOREIGN KEY (Endereco_id_endereco)
    REFERENCES Endereco(id_endereco),

    FOREIGN KEY (Forma_Pagamento_id_forma_pagamento)
    REFERENCES Forma_Pagamento(id_forma_pagamento)

);




CREATE TABLE Frete (

    id_frete INT AUTO_INCREMENT PRIMARY KEY,

    valor DECIMAL(10,2) NOT NULL,

    tipo VARCHAR(45) NOT NULL,

    bairro VARCHAR(100),

    entrega_full BOOLEAN DEFAULT FALSE,

    codigo_rastreio VARCHAR(100),

    Pedidos_id_pedidos INT NOT NULL,


    FOREIGN KEY (Pedidos_id_pedidos)
    REFERENCES Pedidos(id_pedidos)

);




CREATE TABLE Produto (

    id_produto INT AUTO_INCREMENT PRIMARY KEY,

    nome VARCHAR(100) NOT NULL,

    descricao TEXT NOT NULL,

    sku VARCHAR(45) NOT NULL UNIQUE,

    preco_antigo DECIMAL(10,2) NOT NULL,

    preco_promocional DECIMAL(10,2),

    quantidade_estoque INT NOT NULL,

    ativo BOOLEAN DEFAULT TRUE,

    Loja_id_loja INT NOT NULL,

    Lojista_id_lojista INT NOT NULL,


    FOREIGN KEY (Loja_id_loja)
    REFERENCES Loja(id_loja),

    FOREIGN KEY (Lojista_id_lojista)
    REFERENCES Lojista(id_lojista)

);




CREATE TABLE Avaliacao (

    id_avaliacao INT AUTO_INCREMENT PRIMARY KEY,

    data_publicacao DATE NOT NULL,

    nota DECIMAL(3,2) NOT NULL,

    descricao TEXT,

    Produto_id_produto INT NOT NULL,


    FOREIGN KEY (Produto_id_produto)
    REFERENCES Produto(id_produto)

);




CREATE TABLE Imagem_Produto (

    id_imagem_produto INT AUTO_INCREMENT PRIMARY KEY,

    arquivo LONGBLOB NOT NULL,

    Produto_id_produto INT NOT NULL,


    FOREIGN KEY (Produto_id_produto)
    REFERENCES Produto(id_produto)

);




CREATE TABLE Produto_has_Carrinho (

    Produto_id_produto INT NOT NULL,

    Carrinho_id_carrinho INT NOT NULL,

    quantidade INT NOT NULL DEFAULT 1,


    PRIMARY KEY (
        Produto_id_produto,
        Carrinho_id_carrinho
    ),


    FOREIGN KEY (Produto_id_produto)
    REFERENCES Produto(id_produto),

    FOREIGN KEY (Carrinho_id_carrinho)
    REFERENCES Carrinho(id_carrinho)

);




CREATE TABLE Produto_has_Pedidos (

    Produto_id_produto INT NOT NULL,

    Pedidos_id_pedidos INT NOT NULL,

    quantidade INT NOT NULL DEFAULT 1,

    preco_unitario DECIMAL(10,2),


    PRIMARY KEY (
        Produto_id_produto,
        Pedidos_id_pedidos
    ),


    FOREIGN KEY (Produto_id_produto)
    REFERENCES Produto(id_produto),

    FOREIGN KEY (Pedidos_id_pedidos)
    REFERENCES Pedidos(id_pedidos)

);



CREATE TABLE Produto_has_Categorias (

    Produto_id_produto INT NOT NULL,

    Categorias_id_categorias INT NOT NULL,


    PRIMARY KEY (
        Produto_id_produto,
        Categorias_id_categorias
    ),


    FOREIGN KEY (Produto_id_produto)
    REFERENCES Produto(id_produto),

    FOREIGN KEY (Categorias_id_categorias)
    REFERENCES Categorias(id_categorias)

);




CREATE TABLE Cupom_has_Produto (

    Cupom_id_cupom INT NOT NULL,

    Produto_id_produto INT NOT NULL,


    PRIMARY KEY (
        Cupom_id_cupom,
        Produto_id_produto
    ),


    FOREIGN KEY (Cupom_id_cupom)
    REFERENCES Cupom(id_cupom),

    FOREIGN KEY (Produto_id_produto)
    REFERENCES Produto(id_produto)

);




CREATE TABLE Banner_has_Produto (

    Banner_id_banner INT NOT NULL,

    Produto_id_produto INT NOT NULL,


    PRIMARY KEY (
        Banner_id_banner,
        Produto_id_produto
    ),


    FOREIGN KEY (Banner_id_banner)
    REFERENCES Banner(id_banner),

    FOREIGN KEY (Produto_id_produto)
    REFERENCES Produto(id_produto)

);




CREATE TABLE Promocao_has_Produto (

    Promocao_id_promocao INT NOT NULL,

    Produto_id_produto INT NOT NULL,


    PRIMARY KEY (
        Promocao_id_promocao,
        Produto_id_produto
    ),


    FOREIGN KEY (Promocao_id_promocao)
    REFERENCES Promocao(id_promocao),

    FOREIGN KEY (Produto_id_produto)
    REFERENCES Produto(id_produto)

);




CREATE TABLE Cupom_has_Categorias (

    Cupom_id_cupom INT NOT NULL,

    Categorias_id_categorias INT NOT NULL,


    PRIMARY KEY (
        Cupom_id_cupom,
        Categorias_id_categorias
    ),


    FOREIGN KEY (Cupom_id_cupom)
    REFERENCES Cupom(id_cupom),

    FOREIGN KEY (Categorias_id_categorias)
    REFERENCES Categorias(id_categorias)

);




CREATE TABLE Promocao_has_Categorias (

    Promocao_id_promocao INT NOT NULL,

    Categorias_id_categorias INT NOT NULL,


    PRIMARY KEY (
        Promocao_id_promocao,
        Categorias_id_categorias
    ),


    FOREIGN KEY (Promocao_id_promocao)
    REFERENCES Promocao(id_promocao),

    FOREIGN KEY (Categorias_id_categorias)
    REFERENCES Categorias(id_categorias)

);




INSERT INTO Endereco
(
    rua,
    cep,
    bairro,
    numero,
    complemento,
    tipo
)
VALUES
(
    'Rodoviário',
    '77781-708',
    'Rodoviário',
    1230,
    'Ao lado do Senac',
    'Comercial'
);




INSERT INTO Lojista
(
    nome,
    cpf,
    email,
    senha,
    telefone
)
VALUES
(
    'João',
    '12345678901',
    'joao@gmail.com',
    '123abc',
    '94991861563'
);




INSERT INTO Loja
(
    nome,
    whatsapp,
    telefone,
    email,
    Endereco_id_endereco,
    Lojista_id_lojista
)
VALUES
(
    'GAMESSTART',
    '94991861563',
    '94991861563',
    'startgames@gmail.com',
    1,
    1
);

INSERT INTO Cliente
(
    nome,
    cpf,
    telefone,
    email,
    senha,
    data_nascimento,
    Loja_id_loja
)
VALUES
(
    'Maria Silva',
    '12345678900',
    '94999998888',
    'maria@gmail.com',
    '123abc',
    '2000-05-15',
    1
);
/*========================================================
  LISTAR OS DADOS
========================================================*/

SELECT * FROM Endereco;

SELECT * FROM Lojista;

SELECT * FROM Loja;

SELECT * FROM Cliente;
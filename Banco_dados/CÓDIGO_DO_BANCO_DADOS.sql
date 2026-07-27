-- Criando o Banco de Dados
/*Criando o
            Banco de Dados*/
CREATE DATABASE GAMESSTART;
-- COMANDO PARA EXCLUIR O BANCO DE DADOS
-- DROP DATABASE GAMESSTART;

use GAMESSTART;

CREATE TABLE Lojista(
id_lojista INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(450) NOT NULL,
cpf MEDIUMINT(12) UNIQUE NOT NULL,
cnpj MEDIUMINT(15) UNIQUE,
email VARCHAR(450) NOT NULL,
senha VARCHAR(20) NOT NULL,
telefone MEDIUMINT(14)
);

-- DROP TABLE Lojista;

CREATE TABLE Endereco(
id_endereco INT AUTO_INCREMENT PRIMARY KEY,
rua VARCHAR (45) NOT NULL,
cep MEDIUMINT (11) NOT NULL,
bairro VARCHAR (45) NOT NULL,
numero INT,
complemento VARCHAR (200),
tipo VARCHAR (45)
);

CREATE TABLE Forma_Pagamento(
id_forma_pagamento INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR (45) NOT NULL,
link VARCHAR (200),
ativo BOOLEAN
);

CREATE TABLE Categorias(
id_Categorias INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(100) NOT NULL
);

-- TABELAS COM CHAVE ESTRANGEIRAS

CREATE TABLE Loja(
id_loja INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR (450) NOT NULL,
whatsapp VARCHAR (50) NOT NULL,
instagram VARCHAR (100),
facebook VARCHAR (100),
linkidin VARCHAR (100),
telefone MEDIUMINT (14) NOT NULL,
email VARCHAR (450) NOT NULL,
Lojista_id_lojista INT,
Endereco_id_endereco INT,

foreign key (Endereco_id_endereco)
references Endereco (id_Endereco),

foreign key (Lojista_id_lojista)
references Lojista (id_lojista)
);

CREATE TABLE Cliente(
id_cliente INT AUTO_INCREMENT PRIMARY KEY,
nome varchar (450)not null,
cpf mediumint (12) not null,
telefone mediumint (15) not null,
email varchar(450) not null,
senha varchar (20) not null,
data_nascimento date not null,
Loja_idloja Int,
foreign key (Loja_idloja) references Loja (id_loja)
);

CREATE TABLE Cliente_has_Endereco(
Cliente_id_cliente INT,
Endereco_id_endereco int,
foreign key (Cliente_id_cliente) references Cliente (id_cliente),
foreign key (Endereco_id_endereco) references Endereco (id_endereco)
);

DROP TABLE Cartao_pagamento;
CREATE TABLE Cartao_pagamento(
id_cartao_pagamento INT AUTO_INCREMENT PRIMARY KEY,
numero MEDIUMINT (40) NOT NULL,
data_vencimento VARCHAR(45) NOT NULL,
cvc INT NOT NULL,
cpf MEDIUMINT (12) NOT NULL,
nome_proprietario VARCHAR (45) NOT NULL,
nome_indentificacao VARCHAR (45) NOT NULL,
bandeira VARCHAR (45) NOT NULL,
tipo VARCHAR (45) NOT NULL,
ativo boolean,

Cliente_id_cliente INT,
foreign key (Cliente_id_cliente) references Cliente (id_cliente)

);

CREATE TABLE Carrinho(
id_carrinho INT AUTO_INCREMENT PRIMARY KEY,
quantidade_produto INT,
preco_total FLOAT,

Carrinho_id_carrinho INT,
foreign key (Carrinho_id_carrinho) references Carrinho (id_carrinho)
);

CREATE TABLE Banner(
id_banner INT AUTO_INCREMENT PRIMARY KEY,
imagem LONGBLOB NOT NULL,
data_inicio DATE NOT NULL,
data_final DATE,
statutos_visibilidade BOOLEAN NOT NULL,

Loja_id_loja INT,
foreign key (Loja_id_loja) references Loja (id_loja)
);

CREATE TABLE Promocao(
id_promocao INT AUTO_INCREMENT PRIMARY KEY,
data_inicio DATE NOT NULL,
data_final DATE,
valor_promocional FLOAT NOT NULL UNIQUE,
nome VARCHAR (45) NOT NULL,

Banner_id_banner INT,
foreign key (Banner_id_banner) references Banner (id_banner)
);

CREATE TABLE Cupom(
id_cupom INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR (45) NOT NULL,
data_validade DATE NOT NULL,
quantidade INT NOT NULL,
desconto FLOAT NOT NULL,

Loja_id_loja INT,
foreign key (Loja_id_loja) references Loja (id_loja)
);

CREATE TABLE Pedidos(
id_pedidos INT AUTO_INCREMENT PRIMARY KEY,
data_pedido DATE NOT NULL,
data_entrega DATE,
nota_fiscal LONGBLOB,
statutos_entrega VARCHAR (45) NOT NULL,
statutos_pagamento VARCHAR (45) NOT NULL,
codigo VARCHAR (45) NOT NULL,

Cliente_id_cliente int,
Loja_id_loja int,
Endereco_id_endereco Int,
Forma_pagamento_id_forma_pagamento INT,

foreign key (Cliente_id_cliente) references Cliente (id_cliente),
foreign key (Loja_id_loja) references Loja (id_loja),
foreign key (Endereco_id_endereco) references Endereco (id_endereco),
foreign key (Forma_pagamento_id_forma_pagamento) references Forma_pagamento (id_forma_pagamento)
);

CREATE TABLE Frete(
id_frete INT AUTO_INCREMENT PRIMARY KEY,
valor FLOAT NOT NULL,
tipo VARCHAR(45) NOT NULL,
bairro VARCHAR (45),
entrega_full BOOLEAN ,
codigo_rastreio VARCHAR (100),

Pedidos_id_pedidos int not null,
foreign key (Pedidos_id_pedidos) references Pedidos (id_Pedidos)
);

CREATE TABLE Produto(
id_produto INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR (100) NOT NULL,
descricao TEXT (1000) NOT NULL,
codigo VARCHAR (45) NOT NULL,
preco_antigo FLOAT NOT NULL,
preco_promocional FLOAT,
quantidade_estoque INT NOT NULL,
ativo BOOLEAN,

Loja_id_loja int not null,
Lojista_id_Lojista INT NOT NULL,

foreign key (Loja_id_loja) references Loja (id_loja),
foreign key (Lojista_id_lojista) references Lojista (id_lojista)
);

CREATE TABLE Avaliacao(
id_avaliacao INT AUTO_INCREMENT PRIMARY KEY,
data_publicacao DATE not null,
nota FLOAT not null,
descricao TEXT (1000),

Produto_id_produto int,
foreign key (Produto_id_produto) references Produto (id_produto)
);

CREATE TABLE Imagem_produto(
id_imagem_produto INT AUTO_INCREMENT PRIMARY KEY,
arquivo LONGBLOB not null,

Produto_id_produto int,
foreign key (Produto_id_produto) references Produto (id_produto)
);

CREATE TABLE Produto_has_Carrinho(
Produto_id_produto int,
Carrinho_id_carrinho int,

foreign key (Produto_id_produto) references Produto (id_Produto),
foreign key (Carrinho_id_carrinho) references Carrinho (id_carrinho)
);

CREATE TABLE Produto_has_Pedidos(
Produto_id_produto int,
Pedidos_id_pedidos int,

foreign key (Produto_id_produto) references Produto (id_produto),
foreign key (Pedidos_id_pedidos) references Pedidos (id_pedidos)
);

CREATE TABLE Produto_has_Categorias(
Produto_id_produto INT,
Categorias_id_categorias INT,

foreign key (Produto_id_produto) references Produto (id_produto),
foreign key (Categorias_id_categorias) references Categorias (id_categorias)
);

CREATE TABLE Cupom_has_Produto(
Cupom_id_cupom int,
Produto_id_produto INT,

foreign key (Cupom_id_cupom) references Cupom (id_cupom),
foreign key (Produto_id_produto) references Produto (id_produto)
);

CREATE TABLE Banner_has_Produto(
Banner_id_banner int,
Produto_id_produto int,

foreign key (Banner_id_banner) references Banner (id_banner),
foreign key (Produto_id_produto) references Produto (id_produto)
);

CREATE TABLE Promocao_has_Produto(
Promocao_id_promocao int,
Produto_id_produto int,

foreign key (Promocao_id_promocao) references Promocao (id_promocao),
foreign key (Produto_id_produto) references Produto (id_produto)
);

CREATE TABLE Cupom_has_Categorias(
Cupom_id_Cupom INT,
Categorias_id_categorias INT,

foreign key (Cupom_id_cupom) references Cupom (id_cupom),
foreign key (Categorias_id_categorias) references Categorias (id_categorias)
);

CREATE TABLE Promocao_has_Categorias(
Promocao_id_promocao int,
Categorias_id_categorias INT,

foreign key (Promocao_id_promocao) references Promocao (id_promocao),
foreign key (Categorias_id_categorias) references Categorias (id_categorias)
);

USE GAMESSTART;
-- DML - COMANDO DE MODELAGEM DO BD
-- INSERIR, EDITAR, EXCLUIR, LISTAR

-- LISTAGEM DE TABELAS
SHOW TABLES;


-- INSERT - INSERT DADOS NA TABELA
INSERT INTO Endereco
(rua, cep, bairro, numero, complemento, tipo)
values("Rodoviário",77781708,"Rodoviário",1230,"Ao lado do Senac","Comercial");

INSERT INTO Lojista(nome,cpf,email,senha,telefone)
VALUES ("João", 12345678901,"joao@gmail.com","123abc",94991861563);

-- LISTAR DADOS DA TABELA
SELECT * FROM Endereco;
SELECT * FROM lojista;
SELECT * FROM loja;

-- CADASTRAR OS DADOS DA LOJA
INSERT INTO Loja (nome, whatsapp, telefone, email, endereco_id_endereco, lojista_id_lojista)
values("GAMESSTART","94991861563",9491861563,"startgames@gmail.com", 1,1);
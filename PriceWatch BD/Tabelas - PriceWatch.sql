CREATE TABLE Clientes(
	id_clientes INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nome_cliente VARCHAR(150) NOT NULL,
	email VARCHAR(150) NOT NULL,
	telefone VARCHAR(20) NOT NULL,
	endereço VARCHAR(150) NOT NULL
	);
	/*
Tabela Clientes
Registra e armazena os dados de cadastro do cliente que usa o sistema
*/

CREATE TABLE Loja(
	id_loja INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nome_loja VARCHAR(150) NOT NULL
	);
	 /*
	Tabela Loja
Guarda as lojas que estão sendo monitoradas pelo sistema
(ex: Pichau, Kabum, Terabyteshop)
*/

CREATE TABLE Categorias(
	id_categoria INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nome_categoria VARCHAR(150) NOT NULL
	);
	/*
Tabela Categorias
Guarda os nichos/segmentos de produto (ex: Tecnologia, Vestuario e Eletrodomesticos)
e cada produto pertence a uma categoria
*/

CREATE TABLE Produtos(
	id_produto INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nome_produto VARCHAR(150) NOT NULL,
	modelo_produto VARCHAR(150) NOT NULL,
	marca_produto VARCHAR(150) NOT NULL,
	armazenamento VARCHAR(150) NULL,
	cor VARCHAR(150) NULL,
	id_categoria INT NOT NULL,
	UNIQUE(nome_produto, marca_produto, modelo_produto),
	FOREIGN KEY(id_categoria) REFERENCES Categorias(id_categoria)
	);
	/*
Tabela Produtos
Armazena os dados de cada produto monitorado
(ex: PS5, Slim, Sony, 1TB, Branco)
*/

CREATE TABLE Favoritos(
	id_favoritos INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    data_adicionado DATETIME NOT NULL,
    id_clientes INT NOT NULL,
    id_produtos INT NOT NULL,
    FOREIGN KEY (id_clientes) REFERENCES Clientes(id_clientes), 
    FOREIGN KEY (id_produtos) REFERENCES Produtos(id_produto)
    );
	/*
Tabela Favoritos
Registra quais produtos cada cliente marcou como favorito, pra
acompanhar uma promoção ou preço melhor no futuro
*/

CREATE TABLE Historico_Preco(
	id_historico INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	preco_obtido DECIMAL(10,2) NOT NULL,
	historico_dataehora DATETIME NOT NULL,
	id_produtos INT NOT NULL,
	id_loja INT NOT NULL,
	FOREIGN KEY(id_produtos) REFERENCES Produtos(id_produto),
	FOREIGN KEY(id_loja) REFERENCES Loja(id_loja)
	);
	/*
Tabela Historico de preço
Guarda o preço de cada produto ao longo do tempo e por loja
 é esse histórico que permite comparar preços passados e indicar a melhor loja pra comprar
*/


ALTER TABLE clientes
ADD COLUMN cpf VARCHAR(11) NOT NULL;

SELECT * FROM clientes;
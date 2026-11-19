create table Clientes(
    id_cliente int primary key not null identity (1,1),
    nome_cliente varchar(150) not null,
    email varchar(150) not null,
    cpf varchar(20) not null,
    telefone varchar(20) not null,
    endereco varchar (150) not null
);
/*
Tabela Clientes
Registra e armazena os dados de cadastro do cliente que usa o sistema
*/


create table Loja(
    id_loja int primary key not null identity (1,1),
    nome_loja varchar(150) not null   
);
 /*
Tabela Loja
Guarda as lojas que estão sendo monitoradas pelo sistema
(ex: Pichau, Kabum, Terabyteshop)
*/


create table Categorias(
    id_categoria int primary key not null identity (1,1),
    nome_categoria varchar(150) not null
);
/*
Tabela Categorias
Guarda os nichos/segmentos de produto (ex: Tecnologia, Vestuario e Eletrodomesticos)
e cada produto pertence a uma categoria
*/


create table Produtos(
    id_produtos int primary key not null identity (1,1),
    nome_produto varchar(150) not null,
    modelo_produto varchar(150) not null,
    marca_produto varchar(150) not null,
    armazenamento varchar(150) null,
    cor varchar(150) null,
    id_categoria int not null,
    unique (nome_produto, marca_produto, modelo_produto),
    foreign key (id_categoria) REFERENCES Categorias(id_categoria)
);
/*
Tabela Produtos
Armazena os dados de cada produto monitorado
(ex: PS5, Slim, Sony, 1TB, Branco)
*/


create table Favoritos(
    id_favoritos int primary key not null identity (1,1),
    data_adicionado datetime not null,
    id_cliente int not null,
    id_produtos int not null,
    foreign key (id_cliente) REFERENCES Clientes(id_cliente), 
    foreign key (id_produtos) REFERENCES Produtos(id_produtos)
);
/*
Tabela Favoritos
Registra quais produtos cada cliente marcou como favorito, pra
acompanhar uma promoção ou preço melhor no futuro
*/


create table Historico_Preco(
    id_historico int primary key not null identity (1,1),
    preco_obtido decimal(10,2) not null,
    historico_datahora datetime not null,
    id_produtos int not null,
    id_loja int not null,
    foreign key (id_produtos) REFERENCES Produtos(id_produtos),
    foreign key (id_loja) REFERENCES Loja(id_loja)
);
/*
Tabela Historico de preço
Guarda o preço de cada produto ao longo do tempo e por loja
 é esse histórico que permite comparar preços passados e indicar a melhor loja pra comprar
*/
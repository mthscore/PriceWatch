INSERT INTO clientes (nome_cliente, cpf, telefone, email, endereço)
VALUES ('Lucas Henrique Almeida', '38472915604', '11981234567', 'lucas.almeida@gmail.com', 'Rua das Acácias, 120 - Santo André - SP'),
  		 ('Mariana Souza Ribeiro', '52961837405', '11976543210', 'mariana.ribeiro@gmail.com', 'Rua Oliveira Lima, 56 - São Caetano do Sul - SP'),
  		 ('Rafael Costa Menezes', '14793625810', '11998761122', 'rafael.menezes@hotmail.com', 'Rua Augusta, 1370 - São Paulo - SP'),
  		 ('Beatriz Fernandes Lima', '67230481952', '11965437788', 'beatriz.lima@outlook.com', 'Rua Silva Jardim, 305 - Mauá - SP'),
  		 ('Larissa Gomes Cardoso', '26874159031', '11970126648', 'larissa.cardoso@icloud.com', 'Av. Paulista, 900 - São Paulo - SP');


INSERT INTO loja (nome_loja)
VALUES ('Amazon'),
		 ('Mercado Livre'),
		 ('Magazine Luiza'),
		 ('KaBuM!'),
		 ('Pichau');
		  
		 
INSERT INTO categorias (nome_categoria)
VALUES ('Hardware'),
		 ('Periféricos'),
		 ('Consoles'),
		 ('Jogos'),
		 ('Celulares');
		 		 
		 
INSERT INTO produtos (nome_produto, marca_produto, modelo_produto, armazenamento, cor, id_categoria)
VALUES ('Processador','AMD','Ryzen 5 5600', NULL, NULL, 1),
 		 ('Placa de Vídeo','Gigabyte','RTX 4060 8GB', NULL, NULL, 1),
 		 ('Memória RAM','Kingston','Fury Beast DDR4 16GB 3200MHz', NULL, NULL, 1),
 		 ('SSD NVMe','Kingston','NV2', '1TB', NULL, 1),
 		 ('Fonte','Corsair','CV650 650W', NULL, NULL, 1),
 		 ('Mouse Gamer', 'Logitech', 'G203', NULL, 'Preto', 2),
 		 ('Teclado Mecânico', 'Redragon', 'Kumara K552', NULL, 'Preto', 2),
 		 ('Headset Gamer', 'HyperX', 'Cloud Stinger', NULL, 'Preto', 2),
 		 ('Mousepad Gamer', 'HyperX', 'Fury S Pro', NULL, 'Preto', 2),
 		 ('Monitor Gamer 24"', 'Samsung', 'Odyssey G3', NULL, 'Preto', 2),
 		 ('Console PlayStation 5', 'Sony', 'Slim','1TB','Branco', 3),
 		 ('Console Xbox', 'Microsoft', 'Series S','512GB','Branco', 3),
 		 ('Console Xbox', 'Microsoft', 'Series X','1TB','Preto', 3),
 		 ('Console Steam Deck', 'Valve', 'OLED','512GB','Preto', 3),
 		 ('Console Nintendo Switch', 'Nintendo', 'OLED', '64GB', 'Branco', 3),
 		 ('God of War Ragnarök', 'Sony', 'PS5', NULL, NULL, 4),
 		 ('Elden Ring', 'Bandai Namco', 'PS5', NULL, NULL, 4),
 		 ('The Legend of Zelda: Tears of the Kingdom', 'Nintendo', 'Switch', NULL, NULL, 4),
 		 ('Forza Horizon 5', 'Xbox Game Studios', 'Xbox Series', NULL, NULL, 4),
 		 ('Hogwarts Legacy', 'Warner Bros. Games', 'PS5', NULL, NULL, 4),
 		 ('Smartphone', 'Apple', 'iPhone 15','128GB','Preto', 5),
 		 ('Smartphone', 'Samsung', 'Galaxy S24','256GB','Preto', 5),
 		 ('Smartphone', 'Motorola', 'Moto G84','256GB','Azul', 5),
 		 ('Smartphone', 'Xiaomi', 'Redmi Note 13','256GB','Preto', 5),
 		 ('Smartphone', 'Samsung', 'Galaxy A15','128GB','Azul', 5);
 		 
 		 
INSERT INTO historico_preco (id_produtos, id_loja, preco_obtido, historico_dataehora)
VALUES (1, 4, 749.90, '2026-11-10 14:30:00'),
       (2, 4, 2149.90, '2026-09-15 10:00:00'),
       (2, 5, 2049.90, '2026-10-12 16:20:00'),
       (2, 1, 1899.90, '2026-11-14 09:45:00'),
       (3, 5, 279.90, '2026-11-10 15:10:00'),
       (4, 1, 399.90, '2026-11-11 11:00:00'),
       (5, 2, 389.90, '2026-11-11 13:25:00'),
       (6, 2, 119.90, '2026-11-12 10:15:00'),
       (7, 4, 189.90, '2026-11-12 17:40:00'),
       (8, 1, 249.90, '2026-09-18 09:30:00'),
       (8, 3, 239.90, '2026-10-15 14:00:00'),
       (8, 4, 219.90, '2026-11-12 18:05:00'),
       (9, 2, 79.90, '2026-11-13 08:50:00'),
       (10, 3, 829.90, '2026-11-13 12:30:00'),
       (11, 1, 3999.00, '2026-09-20 10:20:00'),
       (11, 3, 3899.00, '2026-10-18 15:45:00'),
       (11, 4, 3699.00, '2026-11-13 09:10:00'),
       (12, 3, 2299.00, '2026-11-13 16:00:00'),
       (13, 1, 4399.00, '2026-11-14 10:35:00'),
       (14, 2, 5599.00, '2026-11-14 14:20:00'),
       (15, 4, 2399.00, '2026-11-14 19:00:00'),
       (16, 1, 229.90, '2026-09-22 11:40:00'),
       (16, 2, 199.90, '2026-10-20 13:15:00'),
       (16, 3, 179.90, '2026-11-15 10:05:00'),
       (17, 1, 179.90, '2026-11-15 12:45:00'),
       (18, 3, 349.90, '2026-11-15 15:30:00'),
       (19, 1, 199.90, '2026-11-15 17:50:00'),
       (20, 2, 149.90, '2026-11-16 09:00:00'),
       (21, 1, 4499.00, '2026-09-25 10:10:00'),
       (21, 3, 4349.00, '2026-10-22 16:30:00'),
       (21, 2, 4199.00, '2026-11-16 11:20:00'),
       (22, 3, 3299.00, '2026-11-16 13:40:00'),
       (23, 2, 1199.00, '2026-11-16 15:55:00'),
       (24, 1, 1099.00, '2026-11-16 18:10:00'),
       (25, 3, 899.00, '2026-11-16 20:25:00');


INSERT INTO favoritos (id_clientes, id_produtos, data_adicionado)
VALUES (1, 2, '2026-11-01'),
       (2, 21, '2026-11-03'),
       (3, 11, '2026-11-05'),
       (4, 8, '2026-11-07'),
       (5, 16, '2026-11-09');
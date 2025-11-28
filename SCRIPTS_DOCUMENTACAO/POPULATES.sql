CREATE DATABASE saep_db CHARACTER SET utf8mb4;USE saep_db;


INSERT INTO app_product (id, name, description, price, quantity, min_stock, material, type) VALUES 
(1, 'Martelo de Unha', 'Cabo de madeira tratada, cabeça de aço forjado.', 45.90, 50, 10, 'Madeira/Aço', 'Martelo'),
(2, 'Chave de Fenda Philips', 'Ponta imantada, cabo emborrachado.', 15.50, 100, 20, 'Cromo Vanádio', 'Chave'),
(3, 'Alicate Universal', 'Isolamento 1000V para eletricista.', 38.00, 30, 5, 'Aço Carbono', 'Alicate'),
(4, 'Chave Inglesa', 'Ajustável, ferro fundido.', 55.00, 15, 5, 'Ferro Fundido', 'Chave'),
(5, 'Chave Phillips Menor', 'Ideal para eletrônicos.', 12.00, 20, 8, 'Aço', 'Chave');

INSERT INTO app_movement (date, quantity, movement_type, product_id, responsible_id) VALUES 
(NOW(), 50, 'ENTRY', 1, 1),   -- Entrada Martelo
(NOW(), 100, 'ENTRY', 2, 1),  -- Entrada Chave Fenda
(NOW(), 30, 'ENTRY', 3, 1),   -- Entrada Alicate
(NOW(), 15, 'ENTRY', 4, 1),   -- Entrada Chave Inglesa
(NOW(), 20, 'ENTRY', 5, 1);   -- Entrada Chave Phillips Menor

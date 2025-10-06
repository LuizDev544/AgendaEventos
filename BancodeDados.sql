create database agenda_mg;
use agenda_mg;

create table Eventos;

select * from Eventos;

select * from admin;

drop table usuarios;

drop table admin;

INSERT INTO Eventos 
(nome_evento, descricao_do_evento, data_do_evento, local_do_evento, preco_do_evento, capacidade_de_pessoas_no_evento, tipo_do_evento, apresentador_do_evento, duracao_do_evento)
VALUES 
('Show de Rock', 
'Apresentação da banda RockStars com músicas clássicas e autorais.', 
'2025-11-15', 
'Arena São Paulo', 
150.00, 
5000, 
'Show Musical', 
'Banda RockStars', 
'3 horas'),

('Feira de Tecnologia', 
'Exposição das últimas inovações em tecnologia e gadgets.', 
'2025-12-01', 
'Expo Center Norte', 
50.00, 
2000, 
'Feira/Tecnologia', 
'TechWorld', 
'8 horas'),

('Peça de Teatro: O Mistério', 
'Drama teatral com suspense e interação com o público.', 
'2025-11-20', 
'Teatro Municipal', 
80.00, 
800, 
'Teatro', 
'Companhia Encena', 
'2 horas'),

('Workshop de Fotografia', 
'Aprenda técnicas profissionais de fotografia com renomados fotógrafos.', 
'2025-11-25', 
'Espaço Cultural Fotografia Viva', 
120.00, 
100, 
'Workshop', 
'Carlos Almeida', 
'4 horas'),

('Festival de Comida Gourmet', 
'Degustação de pratos de chefs renomados e food trucks locais.', 
'2025-12-05', 
'Parque Ibirapuera', 
30.00, 
3000, 
'Gastronomia', 
'Diversos Chefs', 
'6 horas'),

('Show de Stand-up Comedy', 
'Humoristas convidados apresentam suas melhores piadas em um show imperdível.', 
'2025-12-10', 
'Teatro Bradesco', 
100.00, 
1200, 
'Comédia', 
'Humor em Cena', 
'2 horas');

INSERT INTO admin (email, senha, nome) VALUES
('admin@agendamg.com', '$2a$12$WYdbsGjlIIl2ja9qxVQgE.nz3.blEyFcp5OgXPovHh7hXTMjir/JW', 'Administrador Principal');

create table IF NOT EXISTS admin (
    id int auto_increment primary key,
    email varchar(255) not null unique,
    senha varchar(255) not null,
    nome varchar(255) not null,
    data_criacao timestamp default CURRENT_TIMESTAMP,
    ativo boolean default TRUE,
    
    INDEX idx_email (email)
);

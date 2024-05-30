DROP DATABASE IF EXISTS poupai;
CREATE DATABASE poupai;
USE poupai;

create table usuarios(
	id int primary key not null,
	email varchar(255) unique not null,
	nome varchar(255) not null,
	senha varchar(255) not null,
	dt_nascimento date not null
);

CREATE TABLE despesas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    mes_ano VARCHAR(7) NOT NULL, -- MM/YYYY
    usuario_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE limites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    valor DECIMAL(10, 2) NOT NULL,
    mes_ano VARCHAR(7) NOT NULL, -- MM/YYYY
    usuario_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
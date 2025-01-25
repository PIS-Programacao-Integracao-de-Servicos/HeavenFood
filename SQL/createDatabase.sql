-- Criação da base de dados
DROP DATABASE IF EXISTS ReceitaDB;
CREATE DATABASE ReceitaDB;
USE ReceitaDB;

-- Tabela de Categorias de Receitas
CREATE TABLE Categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
);

-- Tabela de Receitas
CREATE TABLE Receita (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_url VARCHAR(255),
    nome VARCHAR(255) NOT NULL,
    autor VARCHAR(255),
    descricao_preparacao TEXT,
    dificuldade ENUM('Fácil', 'Média', 'Difícil'),
    categoria_id INT,
    tempo INT,
    custo DECIMAL(10, 2),
    FOREIGN KEY (categoria_id) REFERENCES Categorias(id) ON DELETE SET NULL
);

-- Tabela de Ingredientes
CREATE TABLE Ingrediente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT
);

-- Tabela de relação entre Receitas e Ingredientes
CREATE TABLE Receita_Ingrediente (
    receita_id INT,
    ingrediente_id INT,
    quantidade VARCHAR(255),
    PRIMARY KEY (receita_id, ingrediente_id),
    FOREIGN KEY (receita_id) REFERENCES Receita(id) ON DELETE CASCADE,
    FOREIGN KEY (ingrediente_id) REFERENCES Ingrediente(id) ON DELETE CASCADE
);

-- Tabela de Utilizadores
CREATE TABLE Utilizadores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha_hash VARCHAR(255),
    administrador BOOLEAN DEFAULT FALSE
);
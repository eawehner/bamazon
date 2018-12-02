DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
    item_id INTEGER AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price INTEGER NOT NULL,
    stock_quantity INTEGER NOT NULL
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Tales of Berseria", "Video Games", 50, 30), ("Chocobo Plush", "Toys", 25, 10), ("Totoro Collecter's Mug", "Collectables", 15, 40), ("Sailor Moon Figurine", "Toys", 150, 3), ("Jigglypuff Puff", "Toys", 5, 30), ("Final Fantasy XV", "Video Games", 45, 40), ("SOMA", "Video Games", 30, 15), ("Replica of Noctus' Sword", "Collectables", 400, 1), ("Light Up Pikachu", "Toys", 10, 60), ("Eorzea Lore Book", "Collectables", 75, 13);

CREATE TABLE departments(
    department_id INTEGER AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    over_head_costs INTEGER
);
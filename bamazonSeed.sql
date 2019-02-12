DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(30) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Chocolate", "Food", 2, 45);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Biscuit", "Food", 3, 25);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shirt", "Garment", 14, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pant", "Garment", 12, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hat", "Garment", 8, 30);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("CellPhone", "Electronic", 300, 75);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("TV", "Electronic", 500, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPad", "Electronic", 250, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bicycle", "Entertaiment", 180, 40);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Skate", "Entertaiment", 60, 50);

SELECT * FROM products;

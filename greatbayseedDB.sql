DROP DATABASE IF EXISTS greatbay_db;

CREATE DATABASE greatbay_db;

USE greatbay_db;

CREATE TABLE greatbay (
  id INT NOT NULL AUTO_INCREMENT,
  item VARCHAR(45) NULL,
  category VARCHAR(45) NULL,
  price INT(10) NULL,
  quantity INT(10) NULL,
  PRIMARY KEY (id)
);

INSERT INTO greatbay (item, category, price, quantity)
VALUES ("cornflake", "food", 7,1);

INSERT INTO greatbay (item, category, price, quantity)
VALUES ("spoon", "cultery", 3,4);

INSERT INTO greatbay (item, category, price, quantity)
VALUES ("sailboat", "vehicle", 10,2);

-- ### Alternative way to insert more than one row
-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("vanilla", 2.50, 100), ("chocolate", 3.10, 120), ("strawberry", 3.25, 75);

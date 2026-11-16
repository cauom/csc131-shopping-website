CREATE DATABASE shop; -- Create database named "shop"

CREATE TABLE user (
    user_id INT NOT NULL PRIMARY KEY, -- assign user_id as a primary key and integer data type
    first_name VARCHAR(50) NOT NULL,  -- assign first_name as string data type with 50 characters maximum
    last_name VARCHAR(50) NOT NULL,   -- assign last_name as string data type with 50 characters maximum
    email VARCHAR(50) NOT NULL UNIQUE, -- assign email as string data type with 50 characters maximum
    password VARCHAR(100) NOT NULL UNIQUE, -- assign password as string data type with 100 characters maximum
    phone_number VARCHAR(12) NOT NULL UNIQUE, -- assign phone_number as string data type with 12 characters maximum
    street VARCHAR(50) NOT NULL, -- assign street as string data type with 50 characters maximum
    city VARCHAR(50) NOT NULL, -- assign city as string data type with 50 characters maximum
    state VARCHAR(50) NOT NULL, -- assign state as string data type with 50 characters maximum
    postal_code INT NOT NULL -- assign postal_code as integer data type
);

CREATE TABLE cart_item (
	cart_item_id INT NOT NULL PRIMARY KEY,  -- assign cart_item_id as a primary key and integer data type
    cart_id INT NOT NULL,					-- assign cart_id as integer data type
    product_id INT NOT NULL,				-- assign product_id as integer data type
    quantity INT NOT NULL CHECK (quantity > 0), -- assign quantity as integer data type and must be larger than zero 
    CONSTRAINT fk_cart_id FOREIGN KEY (cart_id) REFERENCES cart(cart_id), -- assign cart_id as a foreign key from table "cart"
    CONSTRAINT fk_product_id FOREIGN KEY (product_id) REFERENCES product(product_id) -- assign product_id as a foreign key from table "product"
);

-- Add new row with values into table "product"
INSERT INTO product
VALUES (101, "PS5", "Gaming", 599.99, 19);

-- Delete a row from table "cart item" that has cart_item_id = 1004
DELETE FROM cart_item
WHERE cart_item_id = 1004;

-- Update the price of a product in table "product" with user_id 101 to be $499.59
UPDATE product
SET price = 499.59 WHERE user_id = 101;

-- Show all rows from table "user"
SELECT * from user;
-- Show only name, price and stock from table "product" where price is less than $100
select name, price, stock from product WHERE price < 100;
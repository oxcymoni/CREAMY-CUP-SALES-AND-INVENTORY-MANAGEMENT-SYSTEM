CREATE TABLE Inventory (
    inventory_id INT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(150) NOT NULL,
    unit VARCHAR(50),
    quantity_on_hand DECIMAL(10,2) DEFAULT 0,
    reorder_level DECIMAL(10,2) DEFAULT 0
);


CREATE TABLE Product_Ingredients (
    recipe_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    inventory_id INT NOT NULL,
    quantity_required DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    FOREIGN KEY (inventory_id) REFERENCES Inventory(inventory_id)
);


CREATE TABLE Stock_Movements (
    movement_id INT AUTO_INCREMENT PRIMARY KEY,
    inventory_id INT NOT NULL,
    user_id INT NOT NULL,
    movement_type VARCHAR(50) NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    movement_date DATETIME NOT NULL,
    FOREIGN KEY (inventory_id) REFERENCES Inventory(inventory_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
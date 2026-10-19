CREATE TABLE Purchases (
    purchase_id INT AUTO_INCREMENT PRIMARY KEY,
    supplier_id INT NOT NULL,
    user_id INT NOT NULL,
    purchase_date DATETIME NOT NULL,
    total_cost DECIMAL(12,2) NOT NULL,
    status VARCHAR(50),
    FOREIGN KEY (supplier_id) REFERENCES Suppliers(supplier_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Purchase_Details (
    purchase_detail_id INT AUTO_INCREMENT PRIMARY KEY,
    purchase_id INT NOT NULL,
    inventory_id INT NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    unit_cost DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES Purchases(purchase_id),
    FOREIGN KEY (inventory_id) REFERENCES Inventory(inventory_id)
);

CREATE TABLE Stock_Alerts (
    alert_id INT AUTO_INCREMENT PRIMARY KEY,
    inventory_id INT NOT NULL,
    alert_date DATETIME NOT NULL,
    alert_message VARCHAR(255),
    alert_status VARCHAR(50),
    FOREIGN KEY (inventory_id) REFERENCES Inventory(inventory_id)
);

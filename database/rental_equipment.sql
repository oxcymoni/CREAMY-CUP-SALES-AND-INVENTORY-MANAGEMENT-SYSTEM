CREATE TABLE rental_equipment (
    equipment_id INT AUTO_INCREMENT PRIMARY KEY,
    equipment_name VARCHAR(150) NOT NULL,
    equipment_type VARCHAR(100), 
    status VARCHAR(50)
);

CREATE TABLE rental_rates (
    rate_id INT AUTO_INCREMENT PRIMARY KEY,
    equipment_id INT NOT NULL,
    rate_amount DECIMAL(10,2) NOT NULL,
    billing_unit VARCHAR(50) NOT NULL,
    effective_date DATE NOT NULL,
    FOREIGN KEY (equipment_id) REFERENCES 
  rental_equipment(equipment_id)
);

CREATE TABLE rentals (
    rental_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    user_id INT NOT NULL,
    equipment_id INT NOT NULL,
    rate_id INT NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME,
    total_amount DECIMAL(12,2),
    status VARCHAR(50),
    FOREIGN KEY (customer_id) REFERENCES 
  customers(customer_id),
    FOREIGN KEY (user_id) REFERENCES
  users(user_id),
    FOREIGN KEY (equipment_id) REFERENCES
  rental_equipment(equipment_id),
    FOREIGN KEY (rate_id) REFERENCES 
  rental_rates(rate_id)
);

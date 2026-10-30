INSERT INTO employees
(employee_id, first_name, last_name, position, contact_number)
VALUES
(1, 'Maria', 'Santos', 'Cashier', '09171234567'),
(2, 'John', 'Reyes', 'Manager', '09181234567');

INSERT INTO users
(user_id, employee_id, username, password_hash, role, status)
VALUES
(1, 1, 'maria.s', 'REPLACE_WITH_REAL_PASSWORD_HASH', 'Cashier', 'Active'),
(2, 2, 'john.r', 'REPLACE_WITH_REAL_PASSWORD_HASH', 'Admin', 'Active');

INSERT INTO customers
(customer_id, customer_name, contact_number)
VALUES
(1, 'Ana Cruz', '09191234567'),
(2, 'Mark Dela Cruz', '09201234567'),
(3, 'Sofia Garcia', '09211234567');

INSERT INTO suppliers
(supplier_id, supplier_name, contact_number, address)
VALUES
(1, 'Valencia Coffee Supply', '09301234567', 'Valencia, Negros Oriental'),
(2, 'Fresh Dairy Supplier', '09311234567', 'Dumaguete City');

INSERT INTO categories
(category_id, category_name, description)
VALUES
(1, 'Coffee', 'Hot and iced coffee'),
(2, 'Mocktails', 'Non-alcoholic drinks'),
(3, 'Snacks', 'Light snacks and pastries'),
(4, 'Meals', 'Food and meals');

INSERT INTO inventory
(inventory_id, item_name, unit, quantity_on_hand, reorder_level)
VALUES
(1, 'Coffee Beans', 'grams', 460.00, 100.00),
(2, 'Fresh Milk', 'ml', 700.00, 200.00),
(3, 'Vanilla Syrup', 'ml', 160.00, 180.00),
(4, 'Plastic Cups', 'pieces', 48.00, 20.00),
(5, 'Chocolate Muffins', 'pieces', 12.00, 5.00);

INSERT INTO rental_equipment
(equipment_id, equipment_name, equipment_type, status)
VALUES
(1, 'Billiards Table 1', 'Billiards', 'Available'),
(2, 'Table Tennis Set 1', 'Table Tennis', 'Available');

INSERT INTO products
(product_id, category_id, product_name, price, status)
VALUES
(1, 1, 'Iced Coffee', 120.00, 'Available'),
(2, 1, 'Hot Coffee', 100.00, 'Available'),
(3, 2, 'Blue Lemonade', 90.00, 'Available'),
(4, 3, 'Chocolate Muffin', 85.00, 'Available'),
(5, 4, 'Burger Steak', 150.00, 'Available');

INSERT INTO rental_rates
(rate_id, equipment_id, rate_amount, billing_unit, effective_date)
VALUES
(1, 1, 150.00, 'Per Hour', '2026-11-01'),
(2, 2, 50.00, 'Per Hour', '2026-11-01');

INSERT INTO product_ingredients
(recipe_id, product_id, inventory_id, quantity_required)
VALUES
(1, 1, 1, 20.00),
(2, 1, 2, 150.00),
(3, 1, 3, 20.00),
(4, 1, 4, 1.00),
(5, 4, 5, 1.00);

INSERT INTO sales
(sale_id, customer_id, user_id, sale_date, total_amount, status)
VALUES
(1, 1, 1, '2026-11-03 
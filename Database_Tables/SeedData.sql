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
(1, 1, 1, '2026-11-03 09:30:00', 325.00, 'Completed');

INSERT INTO sale_details
(sale_detail_id, sale_id, product_id, quantity, unit_price, subtotal)
VALUES
(1, 1, 1, 2, 120.00, 240.00),
(2, 1, 4, 1, 85.00, 85.00);

INSERT INTO rentals
(rental_id, customer_id, user_id, equipment_id, rate_id, start_time, end_time, total_amount, status)
VALUES
(1, 2, 1, 1, 1, '2026-11-03 10:00:00', '2026-11-03 11:00:00', 150.00, 'Completed');

INSERT INTO purchases
(purchase_id, supplier_id, user_id, purchase_date, total_cost, status)
VALUES
(1, 2, 2, '2026-11-03 11:00:00', 50.00, 'Pending');

INSERT INTO purchase_details
(purchase_detail_id, purchase_id, inventory_id, quantity, unit_cost)
VALUES
(1, 1, 2, 500.00, 0.10);

INSERT INTO stock_movements
(movement_id, inventory_id, user_id, movement_type, quantity, movement_date)
VALUES
(1, 1, 2, 'IN', 500.00, '2026-11-03 08:00:00'),
(2, 2, 2, 'IN', 1000.00, '2026-11-03 08:00:00'),
(3, 3, 2, 'IN', 200.00, '2026-11-03 08:00:00'),
(4, 4, 2, 'IN', 50.00, '2026-11-03 08:00:00'),
(5, 5, 2, 'IN', 13.00, '2026-11-03 08:00:00'),
(6, 1, 1, 'OUT', 40.00, '2026-11-03 09:30:00'),
(7, 2, 1, 'OUT', 300.00, '2026-11-03 09:30:00'),
(8, 3, 1, 'OUT', 40.00, '2026-11-03 09:30:00'),
(9, 4, 1, 'OUT', 2.00, '2026-11-03 09:30:00'),
(10, 5, 1, 'OUT', 1.00, '2026-11-03 09:30:00');

INSERT INTO stock_alerts
(alert_id, inventory_id, alert_date, alert_message, alert_status)
VALUES
(1, 3, '2026-11-03 10:00:00', 'Vanilla Syrup is below reorder level', 'Unresolved');

INSERT INTO payments
(payment_id, sale_id, rental_id, amount, payment_method, payment_date)
VALUES
(1, 1, NULL, 325.00, 'Cash', '2026-11-03 09:30:00'),
(2, NULL, 1, 150.00, 'GCash', '2026-11-03 11:00:00');
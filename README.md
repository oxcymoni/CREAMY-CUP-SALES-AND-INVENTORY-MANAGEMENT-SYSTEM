# Creamy Cup

## Sales and Inventory Management System

Creamy Cup is a web-based Sales and Inventory Management System designed to manage products, suppliers, categories, employees, sales transactions, purchases, inventory, rentals, and reports.

The system uses a MySQL database, a Node.js and Express.js backend, and an HTML, CSS, and JavaScript frontend.

## Group Members

1. Torres, Charles Daniel L.
2. Villanueva, Raymond Jay
3. Viliran, Kaci Miel L.
4. Rano, Jonard P.
5. Tuso, Isaias James
6. Tangeres, Jade Mark N.

## Scope and Features

### 1. Core and Access Management

- User login and authentication.
- View and manage user records.
- Manage employee information.
- Manage customer information.

### 2. Master Data Management

- Add, view, update, and delete suppliers.
- Manage product categories.
- Manage product information.
- Manage employee records.

### 3. Transactions and Payments

- Manage sales transactions.
- Manage sale details.
- Manage payment records.
- View transaction information.

### 4. Inventory and Unique Features

- Manage inventory records.
- Manage product ingredients.
- Track stock movements.
- Monitor low-stock products.
- Generate stock alerts.

### 5. Purchases and Reports

- Manage purchase records.
- Manage purchase details.
- Generate sales reports.
- Generate purchase reports.
- Generate rental reports.
- Generate payment reports.
- Monitor low-stock records and stock alerts.

### 6. Audit and Rentals

- Manage rental equipment.
- Manage rental transactions.
- Manage rental rates.
- Maintain audit-related records.

## Major Features

- Sales and transaction management.
- Inventory and ingredient monitoring.
- Low-stock and stock alert monitoring.
- Master Data Management.
- Rental and equipment management.
- Sales, purchase, rental, and payment reports.

## Technologies Used

- Database: MySQL
- Backend: Node.js
- Web Framework: Express.js
- Frontend: HTML, CSS, JavaScript
- API: REST API and JSON
- Database Driver: MySQL2

---

## Member Responsibilities

| Member                        | GitHub Username  | Tables                                                      | Endpoints / Screens                                                   | Join Report(s) and Join Type                                                                      | Feature Role                             |
| :---------------------------- | :--------------- | :---------------------------------------------------------- | :-------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------ | :--------------------------------------- |
| **Torres, Charles Daniel L.** | `@ttsonic8`      | `employees`, `users`, `customers`                           | `/api/auth`, `/api/users`, `login.html`, `users.html`                 | `GET /api/users/report` — `LEFT JOIN` (`users LEFT JOIN employees`)                               | Core & Access Management                 |
| **Villanueva, Raymond Jay**   | `@oxcymoni`      | `categories`, `products`, `suppliers`                       | `/api/categories`, `/api/products`, `products.html`, `suppliers.html` | `GET /api/products/report` — `INNER JOIN` (`products INNER JOIN categories INNER JOIN suppliers`) | Master Data Management                   |
| **Viliran, Kaci Miel L.**     | `@kakkaakk`      | `sales`, `sale_details`, `payments`                         | `/api/sales`, `/api/payments`, `transactions.html`, `pos.html`        | `GET /api/sales/report` — `INNER JOIN` (`sales INNER JOIN sale_details INNER JOIN payments`)      | Transactions & Payments                  |
| **Rano, Jonard P.**           | `@jonardrano916` | `inventory`, `product_ingredients`, `stock_movements`       | `/api/inventory`, `/api/stock-movements`, `inventory.html`            | `GET /api/inventory/report` — `LEFT JOIN` (`inventory LEFT JOIN product_ingredients`)             | Unique Feature (Inventory & Ingredients) |
| **Tuso, Isaias James**        | `@Zerox`         | `purchases`, `purchase_details`, `stock_alerts`             | `/api/purchases`, `/api/reports`, `purchases.html`, `reports.html`    | `GET /api/purchases/report` — `INNER JOIN` (`purchases INNER JOIN purchase_details`)              | Reports & Analytics                      |
| **Tangeres, Jade Mark N.**    | `@SirJeydii`     | `rental_equipment`, `rentals`, `rental_rates`, `audit_logs` | `/api/rentals`, `/api/audit-logs`, `rentals.html`, `audit-logs.html`  | `GET /api/audit-logs/report` — `LEFT JOIN` (`audit_logs LEFT JOIN users`)                         | Audit & Rentals                          |

_The ownership matrix shows each member's assigned responsibilities. Some assigned screens and report endpoints may still need to be added to the current backend._

---

# Setup Instructions

## Prerequisites

Before running the project, install:

- Node.js
- npm
- MySQL Server
- MySQL Workbench (recommended)
- Visual Studio Code
- VS Code Live Server extension
- Git

## 1. Clone the Repository

Open your terminal and execute:

```bash
git clone https://github.com/oxcymoni/CREAMY-CUP-SALES-AND-INVENTORY-MANAGEMENT-SYSTEM.git
```

Enter the project directory:

```bash
cd CREAMY-CUP-SALES-AND-INVENTORY-MANAGEMENT-SYSTEM
```

## 2. Create the Database

1. Open MySQL Workbench.
2. Connect to your local MySQL Server.
3. Create the database:

```sql
CREATE DATABASE CreamyCup_database;
```

4. Select the database:

```sql
USE CreamyCup_database;
```

5. Execute your group's SQL schema script to create the required tables.
6. Execute the seed data script if one is provided.

**Important:** The current project files do not include the SQL schema and seed data scripts. Add the finalized SQL files to the repository so other members can set up the database.

## 3. Configure Environment Variables

Inside the project root folder, create a file named `.env`.

Add your local MySQL configuration:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_local_mysql_password
DB_NAME=CreamyCup_database
PORT=3000
```

Replace `your_local_mysql_password` with your own MySQL password.

If your MySQL username is different from `root`, update `DB_USER` accordingly.

**Security Reminder:**

- Never upload your actual `.env` file to GitHub.
- Never share your database password.
- Use `.env.example` with placeholder values for other developers.

## 4. Install Backend Dependencies

From the project root directory, execute:

```bash
npm install
```

This installs the dependencies listed in `package.json`, including:

- Express
- MySQL2
- CORS
- Dotenv

## 5. Start the Backend Server

Run:

```bash
node server.js
```

If successful, the terminal should display:

```text
Server running at http://localhost:3000
```

The backend API is now available at:

```text
http://localhost:3000
```

To check whether the backend is running, open:

```text
http://localhost:3000/
```

Expected response:

```text
CREAMY-CUP-SALES-AND-INVENTORY-MANAGEMENT-SYSTEM API is running
```

## 6. Open the Frontend

1. Open the project folder in Visual Studio Code.
2. Locate `login.html`.
3. Right-click the file.
4. Select **Open with Live Server**.
5. The login page should open in your browser.

Keep the backend server running while using the frontend.

Other frontend pages included in the current project:

- `masterdata.html`
- `transactions.html`
- `inventory.html`
- `reports.html`
- `audit.html`

## 7. Verify the Setup

After completing the setup, check the following:

- [ ] MySQL Server is running.
- [ ] The `CreamyCup_database` database exists.
- [ ] Required database tables have been created.
- [ ] The `.env` file contains the correct local credentials.
- [ ] Backend dependencies are installed.
- [ ] The backend server starts successfully.
- [ ] `http://localhost:3000/` displays the API running message.
- [ ] The frontend login page opens through Live Server.
- [ ] Frontend requests can communicate with the backend.
- [ ] The system can retrieve and manage database records.

---

# API Endpoint List

The following endpoints are registered in the current backend route files.

## 1. Core and Access Management

Base route: `/api/auth`

| Method | Endpoint              | Description         |
| :----- | :-------------------- | :------------------ |
| POST   | `/api/auth/login`     | User login          |
| GET    | `/api/auth/users`     | Retrieve all users  |
| GET    | `/api/auth/users/:id` | Retrieve user by ID |
| POST   | `/api/auth/users`     | Create a user       |
| PUT    | `/api/auth/users/:id` | Update a user       |
| DELETE | `/api/auth/users/:id` | Delete a user       |

## 2. Master Data Management

Base route: `/api/master-data`

### Suppliers

| Method | Endpoint                         | Description             |
| :----- | :------------------------------- | :---------------------- |
| GET    | `/api/master-data/suppliers`     | Retrieve all suppliers  |
| GET    | `/api/master-data/suppliers/:id` | Retrieve supplier by ID |
| POST   | `/api/master-data/suppliers`     | Create supplier         |
| PUT    | `/api/master-data/suppliers/:id` | Update supplier         |
| DELETE | `/api/master-data/suppliers/:id` | Delete supplier         |

### Categories

| Method | Endpoint                          | Description             |
| :----- | :-------------------------------- | :---------------------- |
| GET    | `/api/master-data/categories`     | Retrieve all categories |
| GET    | `/api/master-data/categories/:id` | Retrieve category by ID |
| POST   | `/api/master-data/categories`     | Create category         |
| PUT    | `/api/master-data/categories/:id` | Update category         |
| DELETE | `/api/master-data/categories/:id` | Delete category         |

### Products

| Method | Endpoint                        | Description            |
| :----- | :------------------------------ | :--------------------- |
| GET    | `/api/master-data/products`     | Retrieve all products  |
| GET    | `/api/master-data/products/:id` | Retrieve product by ID |
| POST   | `/api/master-data/products`     | Create product         |
| PUT    | `/api/master-data/products/:id` | Update product         |
| DELETE | `/api/master-data/products/:id` | Delete product         |

### Employees

| Method | Endpoint                         | Description             |
| :----- | :------------------------------- | :---------------------- |
| GET    | `/api/master-data/employees`     | Retrieve all employees  |
| GET    | `/api/master-data/employees/:id` | Retrieve employee by ID |
| POST   | `/api/master-data/employees`     | Create employee         |
| PUT    | `/api/master-data/employees/:id` | Update employee         |
| DELETE | `/api/master-data/employees/:id` | Delete employee         |

## 3. Transactions

Base route: `/api/transactions`

### Sales

| Method | Endpoint                      | Description         |
| :----- | :---------------------------- | :------------------ |
| GET    | `/api/transactions/sales`     | Retrieve all sales  |
| GET    | `/api/transactions/sales/:id` | Retrieve sale by ID |
| POST   | `/api/transactions/sales`     | Add a sale          |
| PUT    | `/api/transactions/sales/:id` | Update sale         |
| DELETE | `/api/transactions/sales/:id` | Delete sale         |

### Rental Logs

| Method | Endpoint                            | Description               |
| :----- | :---------------------------------- | :------------------------ |
| GET    | `/api/transactions/rental-logs`     | Retrieve rental logs      |
| GET    | `/api/transactions/rental-logs/:id` | Retrieve rental log by ID |
| POST   | `/api/transactions/rental-logs`     | Create rental log         |
| PUT    | `/api/transactions/rental-logs/:id` | Update rental log         |
| DELETE | `/api/transactions/rental-logs/:id` | Delete rental log         |

### Stock Movements and Purchase History

| Method | Endpoint                             | Description               |
| :----- | :----------------------------------- | :------------------------ |
| GET    | `/api/transactions/stock-movements`  | Retrieve stock movements  |
| POST   | `/api/transactions/stock-movements`  | Add stock movement        |
| GET    | `/api/transactions/purchase-history` | Retrieve purchase history |

## 4. Inventory and Unique Features

Base route: `/api`

### Inventory

| Method | Endpoint             | Description              |
| :----- | :------------------- | :----------------------- |
| GET    | `/api/inventory`     | Retrieve inventory       |
| GET    | `/api/inventory/:id` | Retrieve inventory by ID |
| POST   | `/api/inventory`     | Add inventory            |
| PUT    | `/api/inventory/:id` | Update inventory         |
| DELETE | `/api/inventory/:id` | Delete inventory         |

### Low Stock and Stock Alerts

| Method | Endpoint            | Description                |
| :----- | :------------------ | :------------------------- |
| GET    | `/api/low-stock`    | Retrieve low-stock records |
| GET    | `/api/stock-alerts` | Retrieve stock alerts      |

### Product Ingredients

| Method | Endpoint                       | Description                       |
| :----- | :----------------------------- | :-------------------------------- |
| GET    | `/api/product-ingredients`     | Retrieve product ingredients      |
| GET    | `/api/product-ingredients/:id` | Retrieve product ingredient by ID |
| POST   | `/api/product-ingredients`     | Add product ingredient            |
| PUT    | `/api/product-ingredients/:id` | Update product ingredient         |
| DELETE | `/api/product-ingredients/:id` | Delete product ingredient         |

## 5. Equipment and Rentals

Base route: `/api/audit`

### Equipment

| Method | Endpoint                   | Description              |
| :----- | :------------------------- | :----------------------- |
| GET    | `/api/audit/equipment`     | Retrieve equipment       |
| GET    | `/api/audit/equipment/:id` | Retrieve equipment by ID |
| POST   | `/api/audit/equipment`     | Add equipment            |
| PUT    | `/api/audit/equipment/:id` | Update equipment         |
| DELETE | `/api/audit/equipment/:id` | Delete equipment         |

### Rental Rates

| Method | Endpoint               | Description                |
| :----- | :--------------------- | :------------------------- |
| GET    | `/api/audit/rates`     | Retrieve rental rates      |
| GET    | `/api/audit/rates/:id` | Retrieve rental rate by ID |
| POST   | `/api/audit/rates`     | Create rental rate         |
| PUT    | `/api/audit/rates/:id` | Update rental rate         |
| DELETE | `/api/audit/rates/:id` | Delete rental rate         |

### Rental Records

| Method | Endpoint                 | Description                  |
| :----- | :----------------------- | :--------------------------- |
| GET    | `/api/audit/rentals`     | Retrieve rental records      |
| GET    | `/api/audit/rentals/:id` | Retrieve rental record by ID |
| POST   | `/api/audit/rentals`     | Create rental record         |
| PUT    | `/api/audit/rentals/:id` | Update rental record         |
| DELETE | `/api/audit/rentals/:id` | Delete rental record         |

## 6. Reports

Base route: `/api`

| Method | Endpoint                    | Description                 |
| :----- | :-------------------------- | :-------------------------- |
| GET    | `/api/reports/sales`        | Generate sales report       |
| GET    | `/api/reports/purchases`    | Generate purchase report    |
| GET    | `/api/reports/rentals`      | Generate rental report      |
| GET    | `/api/reports/payments`     | Generate payment report     |
| GET    | `/api/reports/low-stock`    | Generate low-stock report   |
| GET    | `/api/reports/stock-alerts` | Generate stock alert report |

---

## Assigned Join Reports

The following reports are part of the group's assigned responsibilities.

| Member             | Report Endpoint              | Join Type  | Tables                                |
| :----------------- | :--------------------------- | :--------- | :------------------------------------ |
| Charles Torres     | `GET /api/users/report`      | LEFT JOIN  | `users`, `employees`                  |
| Raymond Villanueva | `GET /api/products/report`   | INNER JOIN | `products`, `categories`, `suppliers` |
| Kaci Viliran       | `GET /api/sales/report`      | INNER JOIN | `sales`, `sale_details`, `payments`   |
| Jonard Rano        | `GET /api/inventory/report`  | LEFT JOIN  | `inventory`, `product_ingredients`    |
| Isaias Tuso        | `GET /api/purchases/report`  | INNER JOIN | `purchases`, `purchase_details`       |
| Jade Mark Tangeres | `GET /api/audit-logs/report` | LEFT JOIN  | `audit_logs`, `users`                 |

_These are assigned report endpoints. Add and test their route definitions before treating them as available API endpoints._

---

## Environment Example

Create a file named `.env.example` in the project root.

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=CreamyCup_database
PORT=3000
```

Each developer must create their own `.env` file using their local MySQL credentials.

## Git Ignore

Make sure your `.gitignore` contains:

```gitignore
node_modules/
.env
```

Never commit your real `.env` file to GitHub.

---

## Entity Relationship Diagram (ERD)

![Creamy Cup ER Diagram](assets/ER-Diagram.png)

**Creamy Cup – Sales and Inventory Management System**

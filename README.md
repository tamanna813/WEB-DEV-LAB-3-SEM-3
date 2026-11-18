# Assignment 3: Inventory and Data Management System

Backend REST API using Node.js, Express.js, MongoDB, Mongoose and dotenv.

## 1. Setup

1. Install Node.js and start MongoDB locally, or create a MongoDB Atlas database.
2. Open this project folder in VS Code.
3. Install packages:

```bash
npm install
```

4. Create a file named `.env` in the project root and add:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/inventory_db
```

For MongoDB Atlas, replace the URI with your Atlas connection string.
5. Start the server:

```bash
npm start
```

Expected terminal messages:

```text
MongoDB connected successfully
Server running on http://localhost:5000
```

## 2. API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/products` | Create a product |
| GET | `/api/products` | List, filter, sort and paginate |
| GET | `/api/products/:id` | Get one product |
| PUT | `/api/products/:id` | Update product details |
| DELETE | `/api/products/:id` | Delete a product |
| PATCH | `/api/products/:id/stock` | Restock or record a sale |
| GET | `/api/products/low-stock` | Low-stock report |
| GET | `/api/products/summary` | Category-wise aggregation |

## 3. Postman examples

### Create product
POST `http://localhost:5000/api/products`

Body -> raw -> JSON:

```json
{
  "name": "Gel Pen Pack of 15",
  "sku": "STNY-PN-713",
  "category": "Stationery",
  "price": 120,
  "quantity": 40,
  "reorderLevel": 20,
  "supplier": "Cello Pens"
}
```

### Get all products
GET `http://localhost:5000/api/products`

Filtering, search, sorting and pagination examples:

- `/api/products?category=Stationery`
- `/api/products?search=pen`
- `/api/products?minPrice=50&maxPrice=500`
- `/api/products?sort=price&order=asc`
- `/api/products?page=2&limit=5`
- `/api/products?category=Stationery&sort=quantity&order=desc&page=1&limit=10`

Allowed sort fields: `name`, `price`, `quantity`, `createdAt`, `category`.

### Get one product
GET `http://localhost:5000/api/products/PRODUCT_ID`

Replace `PRODUCT_ID` with the `_id` returned by the create request.

### Update product
PUT `http://localhost:5000/api/products/PRODUCT_ID`

```json
{
  "price": 140,
  "quantity": 60
}
```

### Adjust stock
PATCH `http://localhost:5000/api/products/PRODUCT_ID/stock`

Restock by 10:

```json
{ "change": 10 }
```

Record a sale of 5:

```json
{ "change": -5 }
```

A sale is rejected if it would make stock negative.

### Delete product
DELETE `http://localhost:5000/api/products/PRODUCT_ID`

### Low-stock report
GET `http://localhost:5000/api/products/low-stock`

A product is considered low-stock when `quantity` is less than or equal to `reorderLevel`.

### Category summary
GET `http://localhost:5000/api/products/summary`

The aggregation returns the number of products, total quantity, total stock value and average price for each category.

## 4. Features included

- Mongoose schema with required fields, trimming, minimum values, integer checks and unique SKU.
- Automatic `createdAt` and `updatedAt` timestamps.
- Virtual `stockValue` field (`price * quantity`).
- Complete CRUD operations.
- Query-string filtering, searching, sorting and pagination.
- Safe atomic stock adjustment with `$inc`.
- Low-stock query using `$expr`.
- Category summary using MongoDB aggregation.
- Centralized error handling for validation, invalid IDs, duplicate SKU and unknown routes.
- Environment variables loaded using dotenv.

## 5. Suggested testing order

1. Create 3–5 products in different categories.
2. Call GET all products and try filtering, sorting and pagination.
3. Copy a returned `_id` and test GET by ID.
4. Update a product with PUT.
5. Increase and decrease stock using PATCH.
6. Set one product's quantity below or equal to its reorder level and call low-stock.
7. Call summary to see category totals.
8. Delete a product.

Use the screenshots in the assignment PDF as a guide to the expected Postman request/response style.

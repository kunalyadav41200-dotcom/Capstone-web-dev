# E-Commerce and Inventory Management System (Backend Capstone)

Backend capstone built with Node.js, Express, MongoDB, Mongoose, JWT, bcrypt, and Socket.IO. It implements customer/seller/admin roles, product catalogue, cart, simulated checkout, inventory, order lifecycle, reports, and real-time notifications.

## Requirements
- Node.js 18+ (20 LTS recommended)
- MongoDB Community Server running locally **or** a MongoDB Atlas URI
- Postman (for API tests)

## Setup
1. Open this project folder in VS Code / terminal.
2. Run `npm install`.
3. Copy `.env.example` to `.env` and update `MONGO_URI` and the JWT secrets. Never commit `.env`.
4. Start MongoDB locally, or use your Atlas connection string in `MONGO_URI`.
5. Seed demo data: `npm run seed`.
6. Start backend: `npm start` (development with auto-reload: `npm run dev`).
7. Check `http://localhost:5000/health`.

## Demo accounts (created by seed)
- Admin: `admin@example.com` / `Admin12345`
- Seller: `seller@example.com` / `Seller12345`
- Customer: `customer@example.com` / `Customer12345`

Change demo passwords and secrets before deployment.

## API base URL
`http://localhost:5000/api`

### Auth
- `POST /auth/register` customer registration (name, email, password)
- `POST /auth/login` login (email, password)
- `POST /auth/refresh` refresh token (refreshToken)
- `POST /auth/logout` authenticated; optional refreshToken
- `GET /users/me`, `PATCH /users/me` authenticated

### Catalogue
- `GET /categories`
- `POST /categories` admin
- `GET /products?search=&category=&minPrice=&maxPrice=&sort=price_asc&page=1&limit=10`
- `GET /products/:id`
- `POST /products` seller/admin
- `PATCH /products/:id`, `DELETE /products/:id` owner seller/admin (delete is soft archive)

### Cart (customer)
- `GET /cart`
- `POST /cart/items` `{ "productId":"...", "quantity":1 }`
- `PATCH /cart/items/:productId` `{ "quantity":2 }`
- `DELETE /cart/items/:productId`

### Orders
- `POST /orders/checkout` `{ "deliveryAddress":"Full delivery address" }` — stock is reserved with atomic conditional updates; simulated payment is marked paid.
- `GET /orders/mine` customer
- `GET /orders` role-filtered list
- `GET /orders/:id`
- `PATCH /orders/:id/status` admin/seller; statuses: processing, shipped, delivered, cancelled. Valid transitions are enforced. Cancellation restores stock.

### Reports (admin; low-stock admin/seller)
- `GET /reports/sales` — aggregation by product: units and revenue
- `GET /reports/inventory` — aggregation by category: product count, stock, average price and low-stock count
- `GET /reports/low-stock`

## Authentication
Use `Authorization: Bearer <accessToken>`. Access tokens expire quickly (default 15m); refresh tokens default to 7 days and are stored as SHA-256 hashes in the database. Refresh endpoint rotates refresh tokens. Logout revokes the supplied refresh token.

## Socket.IO
Connect to the server origin with Socket.IO and provide `auth: { token: accessToken }`.
- `connected`: `{ userId }`
- `order:created`: `{ orderId, status }` sent to customer
- `order:status`: `{ orderId, status }` sent to customer on status update
- `seller:new-order`: `{ orderId }` sent to sellers on new order

Socket authentication uses the access JWT. Each authenticated socket joins its own `user:<id>` room.

## Architecture
`routes → middleware → controllers → models → MongoDB`. Controllers use `asyncHandler`; validation middleware checks request input; centralized error middleware returns JSON. `services/events.js` uses EventEmitter for `order-placed` and `stock-low` internal events.

## Indexes and aggregations
- Product: text index on name/description, category-price compound index, seller index
- Order: customer-createdAt and status-createdAt indexes
- RefreshToken: unique token hash
- Aggregations: sales by product; inventory metrics by category

## Test collection
Import `docs/postman_collection.json` in Postman. Set collection variables `baseUrl`, `accessToken`, `refreshToken`, `categoryId`, `productId`. Run requests in order; login requests include scripts to capture tokens. Seed database first. See `docs/test-cases.md`.

## Notes / limitations
- Payment is simulated; no real payment processing or card data is collected.
- There is no frontend; backend APIs are demonstrated with Postman and Socket.IO client.
- For production use, add stronger rate limiting, email verification, transaction-based multi-item checkout (MongoDB replica set), audit logging, and a deployment secret manager.

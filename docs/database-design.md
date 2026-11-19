# Database Design

## Collections

| Collection | Fields / purpose | Relationships |
|---|---|---|
| users | name, email (unique), password hash, role, isActive | Referenced by products, carts, orders, refresh tokens |
| refreshTokens | user, tokenHash (unique), expiresAt | User reference; raw token never stored |
| categories | name (unique), description | Referenced by products |
| products | name, description, price, category, seller, stock, sku, isActive | Category and seller references |
| carts | customer (unique), items: product + quantity | Customer and product references |
| orders | customer, items snapshot (product, seller, name, unitPrice, quantity), total, address, payment, status | Customer/product/seller references; product name and price snapshots preserve historical order detail |

## Relationship overview
- User 1 — 1 Cart (customer)
- User 1 — many Products (seller)
- Category 1 — many Products
- User 1 — many Orders (customer)
- Order contains many line items; each item references a Product and Seller and stores purchase-time name/price.

## Indexes
- Product text index on `name` and `description` for catalogue search.
- Product `{ category: 1, price: 1 }` for category/price filters.
- Product `{ seller: 1 }` for seller listings.
- Order `{ customer: 1, createdAt: -1 }` for customer order history.
- Order `{ status: 1, createdAt: -1 }` for status/report queries.
- RefreshToken unique index on `tokenHash`.

## Aggregation pipelines
1. Sales analytics: exclude cancelled orders → unwind order items → group by product → sum quantities and line revenue → sort revenue descending → limit top 20.
2. Inventory analytics: active products → group by category → count products, sum stock, average price, count low-stock items → lookup category name.

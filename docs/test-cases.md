# API Test Cases

| ID | Scenario | Request | Expected |
|---|---|---|---|
| T01 | Health check | GET /health | 200 API running |
| T02 | Valid customer register | POST /auth/register valid body | 201; tokens returned |
| T03 | Invalid email | POST /auth/register invalid email | 400 validation response |
| T04 | Duplicate email | Register same email twice | 409 duplicate |
| T05 | Successful login | POST /auth/login seeded customer | 200 tokens |
| T06 | Wrong password | POST /auth/login incorrect password | 401 |
| T07 | Protected route no token | GET /users/me | 401 |
| T08 | Customer forbidden admin report | GET /reports/sales as customer | 403 |
| T09 | Product browse | GET /products | 200 paginated items |
| T10 | Product create as seller | POST /products valid product | 201 |
| T11 | Product create as customer | POST /products customer token | 403 |
| T12 | Add cart item | POST /cart/items valid product | 200 cart updated |
| T13 | Quantity invalid | POST /cart/items quantity 0 | 400 |
| T14 | Checkout | POST /orders/checkout address | 201; stock decreases; cart cleared |
| T15 | Insufficient inventory | Checkout quantity beyond stock | 409; stock rollback |
| T16 | Customer sees own orders | GET /orders/mine | 200 own records |
| T17 | Customer requests another's order | GET /orders/:id | 403 |
| T18 | Invalid status transition | PATCH order status delivered from placed | 400 |
| T19 | Cancel order | PATCH status cancelled when permitted | Stock restored |
| T20 | Sales aggregation | GET /reports/sales as admin | 200 rows |
| T21 | Inventory aggregation | GET /reports/inventory as admin | 200 category summary |
| T22 | Refresh token rotation | POST /auth/refresh | New access/refresh; old refresh rejected |
| T23 | Logout invalidation | POST /auth/logout with refresh | 200; refresh rejected |

Run the Postman collection after `npm run seed`. Capture screenshots of successful requests and at least one validation failure and unauthorized request for the report.

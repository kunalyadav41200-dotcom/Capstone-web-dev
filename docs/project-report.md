# Backend Development Capstone Project Report

## E-Commerce and Inventory Management System

**Course:** Backend Development  
**Technology Stack:** Node.js, Express.js, MongoDB, Mongoose  
**Team Members:** ____________________  
**Section / Roll No.:** ____________________  
**Faculty:** ____________________  
**Academic Year:** 2026–27

## 1. Abstract
The E-Commerce and Inventory Management System is a REST API backend for an online store. Customers can browse products, maintain a shopping cart, place orders, and track order status. Sellers manage their own product listings and stock. Administrators manage categories and access analytical reports. The system uses MongoDB for persistence, Mongoose for data modelling, Express for REST APIs, JWT for authentication, bcrypt for password security, and Socket.IO for live order notifications. Payment is simulated for academic demonstration.

## 2. Problem Statement
Manual or disconnected product, cart, order, and stock records can lead to incorrect inventory, poor order visibility, and unauthorized data changes. The project provides a centralized backend with validation, role permissions, stock checks, order lifecycle rules, and reporting.

## 3. Objectives
- Implement a complete product-to-order backend workflow.
- Provide customer, seller and administrator roles.
- Store products, categories, carts, orders and user data in MongoDB.
- Maintain inventory safely during checkout and cancellation.
- Generate sales and inventory summaries using aggregation.
- Provide secure login, protected endpoints and real-time notifications.

## 4. Scope and Limitations
Included: authentication, catalogue, categories, cart, simulated checkout, order history/status, inventory updates, reports, real-time order events, API testing. Not included: frontend UI, real payment gateway, shipment integration, production-grade file upload or email delivery.

## 5. Functional Requirements
1. Customer registration and login; seller/admin accounts are seeded or created administratively.
2. Products can be browsed, searched, filtered and paginated.
3. Sellers can create and edit their own listings; administrators can manage listings.
4. Customers can add/update/remove cart items.
5. Checkout revalidates price/stock and calculates total server-side.
6. Stock is decremented atomically per item and restored for valid cancellations.
7. Orders have controlled statuses: placed → processing → shipped → delivered; cancellation is allowed before shipping according to implemented transitions.
8. Admin reports summarize sales and inventory.
9. Socket.IO sends order-created/status updates to authenticated user rooms.

## 6. Non-Functional Requirements
Security: password hashing, JWT, role checks, secret configuration through environment variables. Reliability: validation, centralized errors, atomic conditional stock decrement. Maintainability: MVC/layer separation. Performance: indexes and paginated catalogue results. Usability for evaluation: JSON API and imported Postman collection.

## 7. System Architecture
Client/Postman → Express Routes → Validation/Auth Middleware → Controllers → Mongoose Models → MongoDB. EventEmitter emits internal `order-placed` and `stock-low` events. Socket.IO authenticates connections and delivers events to user-specific rooms.

## 8. Modules
- Authentication and profile module
- Product and category module
- Cart module
- Checkout and order management module
- Inventory module
- Reports and analytics module
- Real-time notifications module

## 9. Database Design
Collections: users, refreshTokens, categories, products, carts, orders. User roles are customer, seller and admin. Products reference category and seller. Carts belong to one customer and contain product/quantity entries. Orders contain customer and item snapshots including product, seller, item name, unit price and quantity. Detailed schema and indexes are in `docs/database-design.md`.

## 10. REST API Documentation
Endpoint reference and example payloads are in `README.md`; Postman requests are in `docs/postman_collection.json`.

## 11. Authentication and Authorization
Passwords are hashed with bcryptjs. Access JWTs are short-lived and used in the Authorization Bearer header. Refresh tokens are stored as SHA-256 hashes and rotated when refreshed; logout removes the refresh token. Role middleware restricts customer, seller and admin operations. Sellers may edit only their own products and update orders containing their products.

## 12. Implementation Details
Node.js runs the application; Express handles routes and middleware. Mongoose defines schemas, validation, references and indexes. The controller layer handles business workflows. Errors flow to a centralized handler. Checkout uses conditional atomic stock updates (`stock >= quantity`) to prevent overselling for each product; if a later operation fails, earlier reservations are rolled back. The payment state is marked as simulated.

## 13. Aggregation
- Sales: exclude cancelled orders, unwind line items, group by product, sum units/revenue, sort by revenue and limit.
- Inventory: group active products by category and compute count, total units, average price and low-stock count; lookup category names.

## 14. Testing Strategy
Use Postman collection. Tests cover success, invalid input, missing token, insufficient permissions, unavailable products, insufficient stock, checkout, order access, invalid status transition, refresh rotation and reports. Refer to `docs/test-cases.md`. Add screenshots of executed Postman responses here after testing.

## 15. Demonstration Evidence
**Screenshot 1:** Server running and health endpoint.  
**Screenshot 2:** Login success.  
**Screenshot 3:** Product list.  
**Screenshot 4:** Add cart item and checkout.  
**Screenshot 5:** Order status update / Socket.IO event.  
**Screenshot 6:** Sales or inventory report.  
**Screenshot 7:** Validation failure and unauthorized request.

## 16. Conclusion
The project demonstrates core backend development concepts through a practical store workflow. It combines REST design, MongoDB data modelling, authentication, role-based authorization, validation, error handling, aggregation, indexes, EventEmitter and Socket.IO. The implementation is suitable for academic demonstration and can be extended with a frontend, real payment integration, database transactions, deployment and additional security controls.

## 17. Future Enhancements
- Frontend dashboard and responsive UI
- Real payment provider integration in a secure test environment
- MongoDB transactions for multi-product checkout (requires replica-set configuration)
- Rate limiting, email verification, password reset and audit logging
- Shipment tracking and invoice generation
- Automated integration tests and deployment pipeline

## 18. References
- Node.js Documentation: https://nodejs.org/docs/
- Express Documentation: https://expressjs.com/
- MongoDB Documentation: https://www.mongodb.com/docs/
- Mongoose Documentation: https://mongoosejs.com/docs/
- Socket.IO Documentation: https://socket.io/docs/

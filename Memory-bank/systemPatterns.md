# System Patterns

## System Architecture
- [ ] The backend follows a layered architecture (Controllers, Routes, Models, Middlewares).

## Key Technical Decisions
- [ ] Using Node.js and Express for the backend.
- [ ] Using MongoDB for the database.

## Design Patterns in Use
- [ ] MVC (Model-View-Controller) pattern.
- [ ] Middleware pattern for request handling.

## Component Relationships
- [ ] Routes handle incoming requests and pass them to Controllers.
- [ ] Controllers interact with Models to perform database operations.
- [ ] Middlewares handle authentication, authorization, and other request processing tasks.

## Critical Implementation Paths
- [ ] User authentication and authorization flow.
- [ ] Data validation and sanitization.
- [ ] Shipment tracking and status updates.
- [ ] Logistics data management (e.g., routes, carriers, pricing).
- [ ] Simplified authentication middleware using `requireAuthUser` and `hasRole`.
- [ ] Updated user routes to use the `requireAuthUser` middleware.
- [ ] Updated admin routes to use the `requireAuthUser` and `hasRole` middlewares.
- [ ] Updated client routes to use the `requireAuthUser` and `hasRole` middlewares.
- [ ] Updated sales agent routes to use the `requireAuthUser` and `hasRole` middlewares.
- [ ] Updated financial officer routes to use the `requireAuthUser` and `hasRole` middlewares.
- [ ] Updated operational officer routes to use the `requireAuthUser` and `hasRole` middlewares.
- [ ] Updated document routes to use the `requireAuthUser` and `hasRole` middlewares.
- [ ] Updated shipment routes to use the `requireAuthUser` and `hasRole` middlewares.
- [ ] Updated invoice routes to use the `requireAuthUser` and `hasRole` middlewares.
- [ ] Updated quote routes to use the `requireAuthUser` and `hasRole` middlewares.

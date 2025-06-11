## Active Context

This document outlines the current focus, recent changes, and next steps for the project. It also captures important patterns, preferences, learnings, and insights.

**Current Work Focus:**

Simplifying the authentication middleware, addressing a login issue, updating the user routes, updating the admin routes, updating the client routes, updating the sales agent routes, updating the financial officer routes, updating the operational officer routes, updating the document routes, updating the shipment routes, and updating the quote routes.

**Recent Changes:**

*   Examined `middlewares/auth.js` to identify areas for simplification.
*   Removed redundant `authenticate` function.
*   Refactored `requireAuthUser` to use `async/await`.
*   Consolidated role-specific middlewares into a single `hasRole` middleware.
*   Updated `middlewares/auth.js` with the simplified code.
*   Updated `routes/usersRouter.js` to use the new `requireAuthUser` middleware.
*   Removed unnecessary imports from `routes/usersRouter.js`.
*   Updated `routes/adminRouter.js` to use the new `requireAuthUser` and `hasRole` middlewares.
*   Removed unnecessary imports from `routes/adminRouter.js`.
*   Updated `routes/clientRouter.js` to use the new `requireAuthUser` and `hasRole` middlewares.
*   Removed unnecessary imports from `routes/clientRouter.js`.
*   Updated `routes/salesAgentRouter.js` to use the new `requireAuthUser` and `hasRole` middlewares.
*   Removed unnecessary imports from `routes/salesAgentRouter.js`.
*   Removed redundant middleware from `routes/salesAgentRouter.js`.
*   Updated `routes/financialOfficerRouter.js` to use the new `requireAuthUser` and `hasRole` middlewares.
*   Removed unnecessary imports from `routes/financialOfficerRouter.js`.
*   Updated `routes/operationalOfficerRouter.js` to use the new `requireAuthUser` and `hasRole` middlewares.
*   Removed unnecessary imports from `routes/operationalOfficerRouter.js`.
*   Updated `routes/documentRouter.js` to use the new `requireAuthUser` and `hasRole` middlewares.
*   Removed unnecessary imports from `routes/documentRouter.js`.
*   Updated `routes/shipmentRouter.js` to use the new `requireAuthUser` and `hasRole` middlewares.
*   Removed unnecessary imports from `routes/shipmentRouter.js`.
*   Updated `routes/invoiceRouter.js` to use the new `requireAuthUser` and `hasRole` middlewares.
*   Removed unnecessary imports from `routes/invoiceRouter.js`.
*   Updated `routes/quoteRouter.js` to use the new `requireAuthUser` and `hasRole` middlewares.
*   Removed unnecessary imports from `routes/quoteRouter.js`.

**Next Steps:**

*   Update this `activeContext.md` file with the findings.
*   Update other relevant Memory Bank files.

**Achievable File Types Handled by Agents (Based on `documentSchema.js`):**

*   **Operational Department (Shipments & Logistics):**
    These documents are related to the movement of goods, customs, and transport operations.

    *   Shipment-Related Documents:
        *   Bill of Lading (B/L) (Sea/Air) - `bill_of_lading`
        *   Air Waybill (AWB) - `air_waybill`
        *   House Bill of Lading (HBL) - `house_bill_of_lading`
        *   Master Bill of Lading (MBL) - `master_bill_of_lading`
        *   Sea Waybill - `sea_waybill`
        *   Packing List - `packing_list`
        *   Customs Clearance Documents - `customs_clearance_documents`
        *   Dangerous Goods Declaration - `dangerous_goods_declaration`
        *   Freight Booking Confirmation - `freight_booking_confirmation`
        *   Shipping Instructions (SI) - `shipping_instructions`
        *   Proof of Delivery (POD) - `proof_of_delivery`

*   **Financial Department (Invoices & Payments):**
    These documents are related to billing, payments, and financial tracking.

    *   Invoices & Billing:
        *   Freight Invoice (to customer) - `freight_invoice`
        *   Vendor Invoice (from carriers, truckers, etc.) - `vendor_invoice`
        *   Proforma Invoice - `proforma_invoice`
        *   Debit/Credit Notes - `debit_notes`
        *   Tax Invoice (VAT/GST) - `tax_invoices`
    *   Payment & Accounting:
        *   Payment Receipts - `payment_receipts`
        *   Bank Transfer Slips - `bank_transfer_slips`
        *   Letter of Credit (L/C) Documents - `letter_of_credit_documents`

**Active Decisions and Considerations:**

*   The `documentController.js` handles the file upload, and the `documentCategory` field determines whether the document is financial or operational.
*   The file types are determined by the `file.mimetype` property.
*   The authentication middleware has been simplified to improve readability and maintainability.
*   The `routes/usersRouter.js` file has been updated to use the new `requireAuthUser` middleware.
*   The `routes/adminRouter.js` file has been updated to use the new `requireAuthUser` and `hasRole` middlewares.
*   The `routes/clientRouter.js` file has been updated to use the new `requireAuthUser` and `hasRole` middlewares.
*   The `routes/salesAgentRouter.js` file has been updated to use the new `requireAuthUser` and `hasRole` middlewares.
*   The `routes/financialOfficerRouter.js` file has been updated to use the new `requireAuthUser` and `hasRole` middlewares.
*   The `routes/operationalOfficerRouter.js` file has been updated to use the new `requireAuthUser` and `hasRole` middlewares.
*   The `routes/documentRouter.js` file has been updated to use the new `requireAuthUser` and `hasRole` middlewares.
*   The `routes/shipmentRouter.js` file has been updated to use the new `requireAuthUser` and `hasRole` middlewares.
*   The `routes/invoiceRouter.js` file has been updated to use the new `requireAuthUser` and `hasRole` middlewares.
*   The `routes/quoteRouter.js` file has been updated to use the new `requireAuthUser` and `hasRole` middlewares.

**Important Patterns and Preferences:**

*   Role-based access control is implemented to restrict access to documents based on the user's role.
*   `async/await` is preferred for asynchronous operations.

**Learnings and Project Insights:**

*   The application now has a more streamlined authentication process.
*   The simplified `hasRole` middleware reduces code duplication and improves maintainability.
*   The `routes/usersRouter.js` file is now consistent with the simplified authentication middleware.
*   The `routes/adminRouter.js` file is now consistent with the simplified authentication middleware.
*   The `routes/clientRouter.js` file is now consistent with the simplified authentication middleware.
*   The `routes/salesAgentRouter.js` file is now consistent with the simplified authentication middleware.
*   The `routes/financialOfficerRouter.js` file is now consistent with the simplified authentication middleware.
*   The `routes/operationalOfficerRouter.js` file is now consistent with the simplified authentication middleware.
*   The `routes/documentRouter.js` file is now consistent with the simplified authentication middleware.
*   The `routes/shipmentRouter.js` file is now consistent with the simplified authentication middleware.
*   The `routes/invoiceRouter.js` file is now consistent with the simplified authentication middleware.
*   The `routes/quoteRouter.js` file is now consistent with the simplified authentication middleware.

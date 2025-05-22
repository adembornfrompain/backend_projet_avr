## Active Context

This document outlines the current focus, recent changes, and next steps for the project. It also captures important patterns, preferences, learnings, and insights.

**Current Work Focus:**

Noting the types of files handled and uploaded by financial and operational agents and ensuring they are achievable with this project.

**Recent Changes:**

*   Examined `documentController.js` to understand document upload logic.
*   Checked `financialOfficerRouter.js` and `operationalOfficerRouter.js` to confirm access to document upload functionality.
*   Examined `documentSchema.js` to determine the supported document types.
*   Modified `documentSchema.js` to include all document types provided by the user.

**Next Steps:**

*   Update this `activeContext.md` file with the findings.

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

**Important Patterns and Preferences:**

*   Role-based access control is implemented to restrict access to documents based on the user's role.

**Learnings and Project Insights:**

*   The application now supports uploading and managing all document types related to shipments, invoices, and other financial and operational activities as requested by the user.

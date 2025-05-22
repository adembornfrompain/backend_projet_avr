# Admin Use Case Diagram

```mermaid
  actor Admin
  usecase ManageUsers
  usecase ManageDocuments
  usecase ManageInvoices
  usecase ManageShipments
  usecase ManageQuotes
  usecase ConfigureSystem

  Admin -- ManageUsers
  Admin -- ManageDocuments
  Admin -- ManageInvoices
  Admin -- ManageShipments
  Admin -- ManageQuotes
  Admin -- ConfigureSystem

  note left of ManageUsers: Create, Read, Update, Delete users; manage roles, permissions, password reset
  note left of ManageDocuments: Upload, view, delete any document
  note left of ManageInvoices: View, update, manage all invoices
  note left of ManageShipments: View and manage all shipments
  note left of ManageQuotes: View and manage all quotes
  note left of ConfigureSystem: System settings, monitor performance

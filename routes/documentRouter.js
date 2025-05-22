// Fixed DocumentRouter.js
const express = require("express");
const router = express.Router();
const documentController = require("../controllers/documentController");
const {
  authenticate,
  isAdmin,
  isClient,
  isFinancialOfficer,
  isOperationalOfficer,
} = require("../middlewares/auth");
const upload = require("../middlewares/uploadFile");

// Apply authentication middleware to all routes
router.use(authenticate);

// CLIENT ROUTES
// Get all documents for logged-in client (renamed from /document to make more semantic sense)
router.get("/client/all", isClient, documentController.getAllDocuments);

// Get financial documents for logged-in client
router.get(
  "/client/financial",
  isClient,
  documentController.getClientFinancialDocuments
);

// Get operational documents for logged-in client
router.get(
  "/client/operational",
  isClient,
  documentController.getClientOperationalDocuments
);

// Delete document (client can delete their own documents)
router.delete("/:documentId", isClient, documentController.deleteDocument);

// FINANCIAL OFFICER ROUTES
// Get all financial documents
router.get(
  "/financial/all",
  isFinancialOfficer,
  documentController.getFinancialDocuments
);

// OPERATIONAL OFFICER ROUTES
// Get all operational documents
router.get(
  "/operational/all",
  isOperationalOfficer,
  documentController.getOperationalDocuments
);

// ADMIN ROUTES
// Get all documents (for admin)
router.get("/all", isAdmin, documentController.getAllDocuments);

// Get document by ID
router.get("/:id", isAdmin, documentController.getDocumentById);

// Update document
router.put("/:id", isAdmin, documentController.updateDocument);

// SHARED ROUTES (accessible by multiple roles)
// Get documents by client ID
router.get(
  "/client/:clientId",
  [isAdmin, isFinancialOfficer, isOperationalOfficer],
  documentController.getDocuments
);

// Download document (accessible by all authenticated users)
router.get(
  "/download/:documentId",
  [isClient, isFinancialOfficer, isOperationalOfficer, isAdmin],
  documentController.downloadDocument
);

// Upload document route (financial and operational officers only)
router.post(
  "/upload",
  [isFinancialOfficer, isOperationalOfficer],
  upload.single("document"),
  documentController.uploadDocument
);

router.put(
  "/operational/:documentId/verify",
  isOperationalOfficer,
  documentController.verifyDocument
);


module.exports = router;

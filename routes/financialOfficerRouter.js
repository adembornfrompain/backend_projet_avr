const express = require('express');
const router = express.Router();
const financialOfficerController = require('../controllers/financialOfficerController');
const { authenticate, isFinancialOfficer } = require('../middlewares/auth');

// Generate invoice
router.post('/invoices', authenticate, isFinancialOfficer, financialOfficerController.generateInvoice);

// Get all invoices
router.get('/invoices', authenticate, isFinancialOfficer, financialOfficerController.getAllInvoices);

// Get invoice by ID
router.get('/invoices/:id', authenticate, isFinancialOfficer, financialOfficerController.getInvoiceById);

// Update invoice
router.put('/invoices/:id', authenticate, isFinancialOfficer, financialOfficerController.updateInvoice);

// Send invoice
router.post('/invoices/:id/send', authenticate, isFinancialOfficer, financialOfficerController.sendInvoice);

// Get all clients
router.get('/clients', authenticate, isFinancialOfficer, financialOfficerController.getAllClients);

// Get quote by ID
router.get('/quotes/:id', authenticate, isFinancialOfficer, financialOfficerController.getQuoteById);

// Get user by ID
router.get('/users/:id', authenticate, isFinancialOfficer, financialOfficerController.getUserById);

// Get all shipments
router.get('/shipments', authenticate, isFinancialOfficer, financialOfficerController.getAllShipments);

module.exports = router;

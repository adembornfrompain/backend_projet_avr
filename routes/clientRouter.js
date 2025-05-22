const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const { authenticate, isClient } = require('../middlewares/auth');

// Profile
router.get('/getProfile', authenticate, isClient, clientController.getProfile);
router.put('/updateProfile', authenticate, isClient, clientController.updateProfile);

// Password
router.put('/updatePassword', authenticate, isClient, clientController.updatePassword);

// Quotes
router.post('/requestQuote', authenticate, isClient, clientController.requestQuote);
router.get('/getClientQuotes', authenticate, isClient, clientController.getClientQuotes);

// Shipments
router.get('/getShipments', authenticate, isClient, clientController.getShipments);
router.get('/shipments/:id/details', authenticate, isClient, clientController.getDocuments);

// Invoices & Payments
router.get('/getInvoices', authenticate, isClient, clientController.getInvoices);

// Account Management
router.delete('/deleteAccount', authenticate, isClient, clientController.deleteAccount);

// Download document
router.get('/documents/:id/download', authenticate, isClient, clientController.downloadDocument);

module.exports = router;

const express = require('express');
const router = express.Router();
const operationalOfficerController = require('../controllers/operationalOfficerController');
const { authenticate, isOperationalOfficer } = require('../middlewares/auth');
const uploadFile = require('../middlewares/uploadFile');
const shipmentController = require('../controllers/shipmentController');

// Get all shipments
router.get('/shipments', authenticate, isOperationalOfficer, operationalOfficerController.getAllShipments);

// Get shipment by ID
router.get('/shipments/:id', authenticate, isOperationalOfficer, operationalOfficerController.getShipmentById);

// Create a new shipment
router.post('/shipments', authenticate, isOperationalOfficer, operationalOfficerController.createShipment);

// Update shipment
router.put('/shipments/:id', authenticate, isOperationalOfficer, operationalOfficerController.updateShipment);

// Delete shipment
router.delete('/shipments/:id', authenticate, isOperationalOfficer, operationalOfficerController.deleteShipment);

// Get all quotes
router.get('/quotes', authenticate, isOperationalOfficer, operationalOfficerController.getAllQuotes);

// Upload document
router.post('/documents', authenticate, isOperationalOfficer, uploadFile.single('document'), operationalOfficerController.uploadDocument);

router.get('/quotes/:id', authenticate, isOperationalOfficer, operationalOfficerController.getQuoteById);

module.exports = router;

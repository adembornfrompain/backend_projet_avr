const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');
const { authenticate, isSalesAgent } = require('../middlewares/auth');

// Apply authentication middleware to all routes
router.use(authenticate);

// Create a new lead (Sales Agent)
router.post('/', isSalesAgent, leadController.createLead);

// Get all leads (Sales Agent)
router.get('/', isSalesAgent, leadController.getAllLeads);

// Get a specific lead by ID (Sales Agent)
router.get('/:id', isSalesAgent, leadController.getLeadById);

// Update a lead by ID (Sales Agent)
router.put('/:id', isSalesAgent, leadController.updateLead);

// Delete a lead by ID (Sales Agent)
router.delete('/:id', isSalesAgent, leadController.deleteLead);

module.exports = router;

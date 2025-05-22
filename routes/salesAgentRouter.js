const express = require('express');
const { authenticate, isSalesAgent } = require('../middlewares/auth');
const salesAgentController = require('../controllers/salesAgentController');


const router = express.Router();

// Middleware to ensure the user is authenticated and has the 'salesAgent' role
router.use(authenticate);
router.use(isSalesAgent);

// Lead routes
router.get('/leads',isSalesAgent, salesAgentController.getAllLeads);
router.get('/leads/:id', salesAgentController.getLeadById);
router.post('/leads', salesAgentController.createLead);
router.put('/leads/:id', salesAgentController.updateLead);
router.delete('/leads/:id', salesAgentController.deleteLead);

// Client routes
router.get('/clients', salesAgentController.getAllClients);
router.get('/clients/:id', salesAgentController.searchClientById); 
// Quote routes
router.get('/quotes', salesAgentController.getAllQuotes);
router.put('/quotes/:id/approve', salesAgentController.approveQuote);
router.put('/quotes/:id/reject', salesAgentController.rejectQuote);

module.exports = router;
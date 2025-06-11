const express = require('express');
const salesAgentController = require('../controllers/salesAgentController');
const { requireAuthUser, hasRole } = require('../middlewares/auth');

const router = express.Router();

// Lead routes
router.get('/leads', requireAuthUser, hasRole('salesAgent'), salesAgentController.getAllLeads);
router.get('/leads/:id', requireAuthUser, hasRole('salesAgent'), salesAgentController.getLeadById);
router.post('/leads', requireAuthUser, hasRole('salesAgent'), salesAgentController.createLead);
router.put('/leads/:id', requireAuthUser, hasRole('salesAgent'), salesAgentController.updateLead);
router.delete('/leads/:id', requireAuthUser, hasRole('salesAgent'), salesAgentController.deleteLead);

// Client routes
router.get('/clients', requireAuthUser, hasRole('salesAgent'), salesAgentController.getAllClients);
router.get('/clients/:id', requireAuthUser, hasRole('salesAgent'), salesAgentController.searchClientById);

// Quote routes
router.get('/quotes', requireAuthUser, hasRole('salesAgent'), salesAgentController.getAllQuotes);
router.put('/quotes/:id/approve', requireAuthUser, hasRole('salesAgent'), salesAgentController.approveQuote);
router.put('/quotes/:id/reject', requireAuthUser, hasRole('salesAgent'), salesAgentController.rejectQuote);

module.exports = router;

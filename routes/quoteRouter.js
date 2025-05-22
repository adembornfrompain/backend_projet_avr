const express = require('express');
const router = express.Router();
const quoteController = require('../controllers/quoteController');
const { authenticate, isClient, isSalesAgent } = require('../middlewares/auth');

// Apply authentication to all routes
router.use(authenticate);

// Client Routes
router.post('/request', isClient, quoteController.requestQuote);
router.get('/my-quotes', isClient, quoteController.getClientQuotes);
router.get('/:id', isClient, quoteController.getQuoteById);

// Sales Agent Routes
router.get('/all', isSalesAgent, quoteController.getAllQuotes);
router.get('/pending', isSalesAgent, quoteController.getPendingQuotes);
router.put('/:id/accept', isSalesAgent, quoteController.acceptQuote);
router.put('/:id/reject', isSalesAgent, quoteController.rejectQuote);

module.exports = router; 
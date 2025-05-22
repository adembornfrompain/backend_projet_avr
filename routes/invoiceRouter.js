const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');
const { 
    authenticate, 
    isClient, 
    isFinancialOfficer 
} = require('../middlewares/auth');
const uploadFile = require('../middlewares/uploadFile');

// Apply authentication to all routes
router.use(authenticate);

// Client Routes
router.get('/my-invoices', 
    isClient, 
    invoiceController.getClientInvoices
);

// Financial Officer Routes
router.post('/create', 
    isFinancialOfficer, 
    invoiceController.createInvoice
);

router.get('/all', 
    isFinancialOfficer, 
    invoiceController.getAllInvoices
);

router.get('/pending', 
    isFinancialOfficer, 
    invoiceController.getPendingInvoices
);

router.get('/overdue', 
    isFinancialOfficer, 
    invoiceController.getOverdueInvoices
);

router.put('/:id/status', 
    isFinancialOfficer, 
    invoiceController.updateInvoiceStatus
);

// Shared Routes (with role-based access)
router.get('/:id', 
    [isClient, isFinancialOfficer], 
    invoiceController.getInvoiceById
);

router.post(
    '/upload',
    isFinancialOfficer,
    uploadFile.single('invoice'),
    invoiceController.uploadInvoice
);

router.get('/download/:id',
    isFinancialOfficer,
    invoiceController.downloadInvoice
);

router.put('/:id',
    isFinancialOfficer,
    invoiceController.updateInvoice
);

module.exports = router;

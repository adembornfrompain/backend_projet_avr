const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    shipmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shipment',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    documentType: {
        type: String,
        enum: [
            'invoices',
            'account_statements',
            'payment_receipts',
            'credit_notes',
            'debit_notes',
            'quotation',
            'proforma_invoice',
            'tax_invoices',
            'customs_duty_receipts',
            'service_contract',
            'pricing_agreement',
            'bill_of_lading',
            'delivery_order',
            'cargo_manifest',
            'packing_list',
            'commercial_invoice',
            'pre_alert',
            'pre_advice',
            'arrival_notice',
            'container_tracking_reports',
            'air_waybill',
            'house_bill_of_lading',
            'master_bill_of_lading',
            'sea_waybill',
            'customs_clearance_documents',
            'dangerous_goods_declaration',
            'freight_booking_confirmation',
            'shipping_instructions',
            'proof_of_delivery',
            'freight_invoice',
            'vendor_invoice',
            'bank_transfer_slips',
            'letter_of_credit_documents'
        ],
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    },
    fileType: {
        type: String,
        required: true
    },
    fileSize: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    verifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    verificationDate: Date,
    verificationNotes: String,
    expiryDate: Date,
    isRequired: {
        type: Boolean,
        default: true
    },
    documentCategory: {
        type: String,
        enum: ['financial', 'operational'],
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Document', documentSchema);

const mongoose = require('mongoose');

const locationUpdateSchema = new mongoose.Schema({
    location: { type: String, required: true },
    status: { 
        type: String, 
        enum: ['picked-up', 'in-transit', 'arrived-at-facility', 'out-for-delivery', 'delivered', 'delayed'],
        required: true 
    },
    timestamp: { type: Date, default: Date.now },
    notes: { type: String },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const shipmentSchema = new mongoose.Schema({
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true,
    },
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    weight: { type: Number, required: true },
    dimensions: { type: String, required: false },
    status: {
        type: String,
        enum: ['pending', 'in-transit', 'delivered', 'cancelled'],
        default: 'pending',
    },
    trackingNumber: {
        type: String,
        unique: true,
        required: true
    },
    estimatedDeliveryDate: {
        type: Date
    },
    trackingHistory: [locationUpdateSchema],
    currentLocation: {
        type: String
    }
}, { timestamps: true });

// Generate tracking number before saving
shipmentSchema.pre('save', async function(next) {
    if (!this.trackingNumber) {
        // Generate a unique tracking number (e.g., SHP-YYYYMMDD-XXXX)
        const date = new Date().toISOString().slice(0,10).replace(/-/g,'');
        const random = Math.floor(1000 + Math.random() * 9000);
        this.trackingNumber = `SHP-${date}-${random}`;
    }
    next();
});

module.exports = mongoose.model('Shipment', shipmentSchema);
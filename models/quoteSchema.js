const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    volume: {
        type: Number,
        required: true
    },
    dimensions: {
        height: { type: Number, required: true },
        width: { type: Number, required: true },
        length: { type: Number, required: true }
    },
    container : {
        type: String,
        enum: ['20ft standard','40ft standard', '40ft high cube'],
        
    },
    incoterm: {
        type: String,
        enum: ['FOB','CIF', 'EXW', 'DDP', 'DDU'],
        required: true
    },
    mode: {
        type: String,
        enum: ['sea freight','air freight','land freight'],
        required: true
    },
    status: {
        type: String,
        enum: ['requested', 'approved', 'rejected', 'delivered', 'in transit'],
        default: 'requested'
    },
     serviceLevel : {
        type: String,
        enum: ['standard', 'express', 'premuim'],
        
    },

     reqDelivery: {
        type: Date,

    },
    readyDate: {
        type: Date,

    },


    
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Quote', quoteSchema);

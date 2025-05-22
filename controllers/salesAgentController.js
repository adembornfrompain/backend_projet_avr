const User = require('../models/usersSchema');
const Users = require('../models/usersSchema'); // Assuming users are also stored in the usersSchema
const Lead = require('../models/leadSchema.js'); // Corrected from usersSchema to leadSchema
const Quote = require('../models/quoteSchema');
const Shipment = require('../models/shipmentSchema');
const users = require('../models/usersSchema');

// Get all leads
module.exports.getAllLeads = async (req, res) => {
    try {
        const leads = await Lead.find(); // Removed incorrect role filter
        res.status(200).json(leads);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get lead by ID
module.exports.getLeadById = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id).select('-password');
        if (!lead) {
            return res.status(404).json({ message: 'Lead not found' });
        }
        res.status(200).json(lead);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Create a new lead
module.exports.createLead = async (req, res) => {
    try {
        const { name, last, email, phone } = req.body;

        // Check if lead already exists
        const existingLead = await Lead.findOne({ email });
        if (existingLead) {
            return res.status(400).json({ message: 'Lead already exists' });
        }

        const lead = new Lead({
            name,
            last,
            email,
            phone,
            role: 'lead'
        });

        await lead.save();
        res.status(201).json({ message: 'Lead created successfully', lead });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update lead
module.exports.updateLead = async (req, res) => {
    try {
        const { name, last, email, phone, status } = req.body;
        const leadId = req.params.id;

        const lead = await Lead.findById(leadId);
        if (!lead) {
            return res.status(404).json({ message: 'Lead not found' });
        }

        // Update fields   
        if (name) lead.name = name;
        if (last) lead.last = last;
        if (email) lead.email = email;
        if (phone) lead.phone = phone;
        if (status !== undefined) lead.status = status;

        await lead.save();
        res.status(200).json({ message: 'Lead updated successfully', lead });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete lead
module.exports.deleteLead = async (req, res) => {
    try {
        const leadId = req.params.id;

        const lead = await Lead.findById(leadId);
        if (!lead) {
            return res.status(404).json({ message: 'Lead not found' });
        }

        await lead.deleteOne();
        res.status(200).json({ message: 'Lead deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all clients
module.exports.getAllClients = async (req, res) => {
    try {
        const clients = await users.find({ role: 'client' }).select('-password');
        res.status(200).json(users); // Corrected from users to clients
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all quotes
module.exports.getAllQuotes = async (req, res) => {
    try {
        const quotes = await Quote.find();
        res.status(200).json(quotes);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Approve quote
module.exports.approveQuote = async (req, res) => {
    try {
        const { id } = req.params;
        const quote = await Quote.findById(id);
        if (!quote) {
            return res.status(404).json({ message: 'Quote not found' });
        }

        quote.status = 'approved';
        await quote.save();
        res.status(200).json({ message: 'Quote approved successfully', quote });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Reject quote
module.exports.rejectQuote = async (req, res) => {
    try {
        const { id } = req.params;
        const quote = await Quote.findById(id);
        if (!quote) {
            return res.status(404).json({ message: 'Quote not found' });
        }

        quote.status = 'rejected';
        await quote.save();
        res.status(200).json({ message: 'Quote rejected successfully', quote });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Search client by ID
module.exports.searchClientById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'ID parameter is required' });
        }

        const client = await users.findOne({ role: 'client', _id: id }).select('-password');
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }

        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};



const authorizeSalesAgent = (req, res, next) => {
    if (req.user.role !== 'salesAgent') {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};
const jwt = require("jsonwebtoken");
const userModel = require("../models/usersSchema");

const getTokenFromRequest = (req) => {
    return req.cookies?.jwt_token || null;
};

const requireAuthUser = (req, res, next) => {
    const token = getTokenFromRequest(req);

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.error("Token is not valid", err.message);
                return res.status(400).json({ message: 'Token is not valid' });
            } else {
                req.user = await userModel.findById(decodedToken.id);
                next();
            }
        });
    } else {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
};

// Base authentication middleware
const authenticate = async (req, res, next) => {
    try {
        const token = getTokenFromRequest(req);
        if (!token) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

// Role-specific middleware
const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
    }
    next();
};

const isManager = (req, res, next) => {
    if (req.user.role !== 'manager') {
        return res.status(403).json({ message: 'Manager access required' });
    }
    next();
};

const isClient = (req, res, next) => {
    if (req.user.role !== 'client') {
        return res.status(403).json({ message: 'Client access required' });
    }
    next();
};

const isSalesAgent = (req, res, next) => {
    if (req.user.role !== 'salesAgent') {
        return res.status(403).json({ message: 'Sales Agent access required' });
    }
    next();
};

const isFinancialOfficer = (req, res, next) => {
    if (req.user.role !== 'financialOfficer') {
        return res.status(403).json({ message: 'Financial Officer access required' });
    }
    next();
};

const isOperationalOfficer = (req, res, next) => {
    if (req.user.role !== 'operationalOfficer') {
        return res.status(403).json({ message: 'Operational Officer access required' });
    }
    next();
};

// Combined role middleware
const hasRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    };
};

module.exports = {
    requireAuthUser,
    authenticate,
    isAdmin,
    isManager,
    isClient,
    isSalesAgent,
    isFinancialOfficer,
    isOperationalOfficer,
    hasRole
};

"use strict";
const jwt = require('jsonwebtoken');
const User = require('../modules/user/model');
const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token)
            return res.status(401).json({ success: false, message: 'No token provided' });
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        const user = await User.findById(decoded.id).select('-password');
        if (!user)
            return res.status(401).json({ success: false, message: 'User not found' });
        req.user = user;
        next();
    }
    catch (err) {
        res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
};
const adminAuth = async (req, res, next) => {
    await auth(req, res, () => {
        if (req.user?.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Admin access required' });
        }
        next();
    });
};
module.exports = { auth, adminAuth };

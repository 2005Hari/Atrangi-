const requireRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return res.status(401).json({ error: 'Unauthorized: No role found.' });
        }

        if (allowedRoles.includes(req.user.role)) {
            next();
        } else {
            res.status(403).json({ error: 'Forbidden: Insufficient permissions.' });
        }
    };
};

module.exports = requireRole;

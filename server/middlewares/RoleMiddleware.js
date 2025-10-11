
// to check the role 
function roleMiddleware(requiredRoles) {
    return function (req, res, next) {
        if (!req.userInfo || !requiredRoles.includes(req.userInfo.role)) {
            return res.status(403).json({
                message: 'Access denied! Insufficient rights.'
            });
        }
        next();
    };
}

module.exports = roleMiddleware;
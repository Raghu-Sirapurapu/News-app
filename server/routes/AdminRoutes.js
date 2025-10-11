const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/AuthMiddleware');
const roleMiddleware = require('../middlewares/RoleMiddleware');
const {
    getPendingNews,
    getApprovedNews,
    approveNews,
    rejectNews,
    getAllUsers,
    makeAdmin,
    removeAdmin,
    removeSuperAdmin,
    deleteUser
} = require('../controllers/AdminController');

// Authenticate all
router.use(authMiddleware);

// Newsletter management : accessible by admin and super admin
router.get('/:id/dashboard',roleMiddleware(['admin','superadmin']), (req, res) => {
    res.json({ message: 'Admin page' });
});

router.get('/news/pending', roleMiddleware(['admin', 'superadmin']), getPendingNews);
router.get('/news/approved', roleMiddleware(['admin', 'superadmin']), getApprovedNews);
router.put('/news/:id/approve', roleMiddleware(['admin', 'superadmin']), approveNews);
router.delete('/news/:id', roleMiddleware(['admin', 'superadmin']), rejectNews);
 
// User Management : Only by super admin
router.get('/users', roleMiddleware(['superadmin']), getAllUsers);
router.put('/users/:id/make-admin', roleMiddleware(['superadmin']), makeAdmin);
router.put('/users/:id/make-superadmin', roleMiddleware(['superadmin']), makeAdmin); // new route for superadmin
router.put('/users/:id/remove-admin', roleMiddleware(['superadmin']), removeAdmin);
router.put('/users/:id/remove-superadmin', roleMiddleware(['superadmin']), removeSuperAdmin);
router.delete('/users/:id', roleMiddleware(['superadmin']), deleteUser);

module.exports = router;

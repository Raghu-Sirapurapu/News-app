const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/AuthMiddleware');
const uploadMiddleware = require('../middlewares/UploadMiddleware');
const {
  getAllNewsletters,
  getNewsletterById,
  createNewsletter,
  updateNewsletter,
  deleteNewsletter,
  getMySubmissions
} = require('../controllers/NewsLetterControllers');

router.get('/', getAllNewsletters);             // GET all newsletters
router.get('/:id', getNewsletterById);          // GET newsletter by ID
router.post('/upload', authMiddleware,uploadMiddleware.array('media', 10),createNewsletter);             // POST a new newsletter
router.put('/update/:id', authMiddleware,uploadMiddleware.array('media', 10),updateNewsletter);           // PUT to update
router.delete('/delete/:id',authMiddleware, deleteNewsletter);        // DELETE newsletter
router.get('/my-submissions/:id', authMiddleware, getMySubmissions);

module.exports = router;

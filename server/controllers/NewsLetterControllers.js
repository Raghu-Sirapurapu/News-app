const Newsletter = require('../models/NewsLetter');
const {
  uploadToCloudinary,
  deleteFromCloudinary
} = require('../helpers/CloudinaryHelper');
const fs = require('fs');


const getAllNewsletters = async (req, res) => {
  try {
    const newsletters = await Newsletter.find({ status: 'approved' }).sort({ date: -1 });
    res.json(newsletters);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const getNewsletterById = async (req, res) => {
  try {
    const newsletter = await Newsletter.findById(req.params.id);
    if (!newsletter) return res.status(404).json({ message: 'Not Found' });
    res.json(newsletter);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const createNewsletter = async (req, res) => {
  try {
    const { title, date, content, department } = req.body;

    let media = [];

    //If user uploaded a image
    if (req.files && req.files.length > 0) {
      // Upload to Cloudinary
      for (const file of req.files) {
        const result = await uploadToCloudinary(file.buffer, file.mimetype);
        media.push({
          url: result.url,
          cloudinary_id: result.publicId,
          type: result.type // 'image' or 'video'
        });
        
      }
    }


    const newPost = new Newsletter({
      title,
      date,
      content,
      department,
      user: req.userInfo.userId,
      email: req.userInfo.email,
      media
    });

    await newPost.save();
    res.status(201).json(newPost);

  } catch (error) {
    res.status(400).json({ message: 'Invalid Data', error: error.message });
  }
};

const updateNewsletter = async (req, res) => {
  try {
    const newsletterId = req.params.id;
    const userId = req.userInfo.userId;

    const newsletter = await Newsletter.findById(newsletterId);
    if (!newsletter) return res.status(404).json({ message: 'Newsletter not found' });

    if (newsletter.user.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    let updateFields = {
      title: req.body.title,
      content: req.body.content,
      date: req.body.date,
      department:req.body.department
    };

    let existingMedia = [];
    if (req.body.existingMedia) {
      try {
        existingMedia = JSON.parse(req.body.existingMedia);
      } catch {
        return res.status(400).json({ message: 'Invalid existing media format' });
      }
    }

    let newMedia = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await uploadToCloudinary(file.path, file.mimetype);
        newMedia.push({
          url: result.url,
          cloudinary_id: result.publicId,
          type: result.type,
        });
        
      }
    }
    updateFields.media = [...existingMedia, ...newMedia];

    const updated = await Newsletter.findByIdAndUpdate(newsletterId, updateFields, { new: true });

    res.status(200).json({ message: 'Newsletter updated', updated });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: 'Update failed', error });
  }
};


const deleteNewsletter = async (req, res) => {
  try {
    const id = req.params.id;
    const newsletter = await Newsletter.findById(id);
    if (!newsletter) {
      return res.status(404).json({ message: 'Newsletter not found' });
    }

    // Delete image from Cloudinary if it exists
    if (newsletter.media && newsletter.media.length > 0) {
      for (const m of newsletter.media) {
        await deleteFromCloudinary(m.cloudinary_id);
      }
    }
    await Newsletter.findByIdAndDelete(id);


    res.status(200).json({ message: 'Newsletter deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Deletion Failed', error: error.message });
  }
};

const getMySubmissions = async (req, res) => {
  try {
    const userId = req.params.id;

    const myNewsletters = await Newsletter.find({ user: userId }).sort({ date: -1 });
    res.json(myNewsletters);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch submissions', error: error.message });
  }
};





module.exports = {
  getAllNewsletters,
  getNewsletterById,
  createNewsletter,
  updateNewsletter,
  deleteNewsletter,
  getMySubmissions
};

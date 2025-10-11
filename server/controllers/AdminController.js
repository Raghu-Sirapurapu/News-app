const NewsLetter = require('../models/NewsLetter');
const User = require('../models/User');
const {deleteFromCloudinary} =require('../helpers/CloudinaryHelper')
// 1. Get all pending newsletters
const getPendingNews = async (req, res) => {
  try {
    const { role, department} = req.userInfo;
    const query = { status : 'pending'};
    if( role === 'admin'){
      query.department = department;
    }
    const pendingNews = await NewsLetter.find(query).populate('user', 'email');
    res.json(pendingNews);
  } catch (err) {
    console.error('Error fetching pending news:', err);
    res.status(500).json({ message: 'Failed to get pending news', error: err.message });
  }
};

// 2. Get approved newsletters
const getApprovedNews = async (req, res) => {
  try {
    const { role, department } = req.userInfo;
    const query = { status: 'approved' };
    if (role === 'admin') {
      query.department = department;
    }
    const approvedNews = await NewsLetter.find(query).populate('user', 'email');
    res.json(approvedNews);
  } catch (err) {
    console.error('Error fetching approved news:', err);
    res.status(500).json({ message: 'Failed to get approved news', error: err.message });
  }
};

// 3. Approve a newsletter
const approveNews = async (req, res) => {
  try {
    const newsId = req.params.id;
    const user = req.userInfo;
    
    const newsletter = await NewsLetter.findById(newsId);
    if(!newsletter){
      return res.status(404).json({
        message : 'Newsletter not found'
      });
    }

    //If user is admin, restrict approval to thier department only
    if(user.role === 'admin' && user.department !== newsletter.department){
      return res.status(403).json({
        message : 'Can only approve news for own department'
      });
    }

    newsletter.status = 'approved';
    await newsletter.save();

    res.json({ message: 'News approved', updated: newsletter });
  } catch (err) {
    console.error('Error approving news:', err);
    res.status(500).json({ message: 'Failed to approve news', error: err.message });
  }
};

// 4. Reject/Delete newsletter
const rejectNews = async (req, res) => {
  try {
    const newsId = req.params.id;
    const user = req.userInfo;

    const newsletterToDelete = await NewsLetter.findById(newsId);
    if (!newsletterToDelete) {
      return res.status(404).json({ message: 'Newsletter not found' });
    }
    //Restrict to department admin or super admin
    if(user.role === 'admin' && user.department !== newsletterToDelete.department){
      return res.status(403).json({message : 'Can only reject news of your own department'});
    }

    // Delete media from Cloudinary if it exists
    if (newsletterToDelete.media) {
      for (const media of newsletterToDelete.media) {
        if (media.cloudinary_id) {
          await deleteFromCloudinary(media.cloudinary_id);
        }
      }
    }

    // Delete newsletter from DB
    await NewsLetter.findByIdAndDelete(newsId);

    res.json({ message: 'News rejected and deleted' });
  } catch (err) {
    console.error('Error rejecting news:', err);
    res.status(500).json({ message: 'Failed to reject news', error: err.message });
  }
};

// 5. Get all users
const getAllUsers = async (req, res) => {
  try {
    const currentUserId = req.userInfo.userId;

    // Find all users except the currently logged in user
    const users = await User.find({ _id: { $ne: currentUserId } });

    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Failed to get users', error: err.message });
  }
};

// 6. Make admin
const makeAdmin = async (req, res) => {
  try {
    const userId = req.params.id;

    //Expect role and optional department in req body
    const { role, department} = req.body;
    
    //validate role
    if(!['admin', 'superadmin'].includes(role)){
       return res.status(400).json({
        message : 'Invalid role specified'
       });
    }

    //For admins , ensure department is provided 
    if (role === 'admin' && !department){
      return res.status(400).json({
        message : 'Department is required for admin role'
      });
    }

    //For superadmin, ignore department (set null)
    const updateData = {
      role,
      department: role === 'superadmin' ? null : department
    }

    const updated = await User.findByIdAndUpdate(userId, updateData, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: `User set as ${role}`, updated });
  } catch (err) {
    console.error('Error making user admin/superadmin:', err);
    res.status(500).json({ message: 'Failed to make change user role', error: err.message });
  }
};

// 7. Remove admin
const removeAdmin = async (req, res) => {
  try {
    const userId = req.params.id;
    const updated = await User.findByIdAndUpdate(userId, { role: 'user' }, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'Admin rights removed', updated });
  } catch (err) {
    console.error('Error removing admin rights:', err);
    res.status(500).json({ message: 'Failed to remove admin rights', error: err.message });
  }
};

const removeSuperAdmin = async (req, res) => {
  try {
    const userId = req.params.id;
    const updated = await User.findByIdAndUpdate(userId, { role: 'user'}, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: ' Super admin rights removed', updated });
  } catch (err) {
    console.error('Error removing super admin rights:', err);
    res.status(500).json({ message: 'Failed to remove super admin rights', error: err.message });
  }
};

// 8. Delete user
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deleted = await User.findByIdAndDelete(userId);
    if (!deleted) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ message: 'Failed to delete user', error: err.message });
  }
};

module.exports = {
  getPendingNews,
  getApprovedNews,
  approveNews,
  rejectNews,
  getAllUsers,
  makeAdmin,
  removeAdmin,
  removeSuperAdmin,
  deleteUser,
};

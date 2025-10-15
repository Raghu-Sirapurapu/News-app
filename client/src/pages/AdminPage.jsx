import React, { useEffect, useState } from 'react';
import NewsGrid from '../components/AdminDashboard/NewsGrid';
import UserGrid from '../components/AdminDashboard/UserGrid';
import ConfirmModal from '../components/ConfirmModal';
import Spinner from '../components/Spinner';
import Navbar from '../components/NavBar';
import {
  getPendingNews,
  getApprovedNews,
  getAllUsers,
  approveNews,
  rejectNews,
  makeAdmin,
  removeAdmin,
  removeSuperAdmin,
  deleteUser,
} from '../api/admin';
import { toast } from 'react-toastify';
import { getAuthUser } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const departments = [
    'CSE', 'ECE', 'MECH', 'EEE', 'CIVIL',
    'PE&PCE', 'MATHS', 'MANAGEMENT STUDIES', 'PHYSICS',
    'CHEMISTRY', 'HSS', 'LIBRARY'
  ]; // Use your departments

const AdminDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = getAuthUser();
  const userRole = user ? user.role : null;

  const [activeTab, setActiveTab] = useState('pending');
  const [pendingNews, setPendingNews] = useState([]);
  const [approvedNews, setApprovedNews] = useState([]);
  const [users, setUsers] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  const [userRoleTab, setUserRoleTab] = useState('normal');
  const [adminSearchTerm, setAdminSearchTerm] = useState('');
  const [adminDepartmentFilter, setAdminDepartmentFilter] = useState('');
  const [normalSearchTerm, setNormalSearchTerm] = useState('');
  const [normalDepartmentFilter, setNormalDepartmentFilter] = useState('');

  const [pendingSearchTerm, setPendingSearchTerm] = useState('');
  const [pendingDepartmentFilter, setPendingDepartmentFilter] = useState('');

  const [approvedSearchTerm, setApprovedSearchTerm] = useState('');
  const [approvedDepartmentFilter, setApprovedDepartmentFilter] = useState('');


  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [confirmAction, setConfirmAction] = useState({ type: '', id: null });
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const [buttonLoadingIds, setButtonLoadingIds] = useState(new Set());
  const addLoading = (id) => setButtonLoadingIds(prev => new Set(prev).add(id));
  const removeLoading = (id) => setButtonLoadingIds(prev => {
    const newSet = new Set(prev);
    newSet.delete(id);
    return newSet;
  });
  const isLoading = (id) => buttonLoadingIds.has(id);

  // Split users by role
  const normalUsers = users.filter(u => u.role === 'user');
  const admins = users.filter(u => u.role === 'admin');
  const superadmins = users.filter(u => u.role === 'superadmin');

  // Search and filter users
  const displayedNormalUsers = normalUsers.filter(u =>
    u.email.toLowerCase().includes(normalSearchTerm.toLowerCase()) && 
    (normalDepartmentFilter === '' || u.department === normalDepartmentFilter)
  );

  const displayedAdmins = admins.filter(admin =>
    admin.email.toLowerCase().includes(adminSearchTerm.toLowerCase()) &&
    (adminDepartmentFilter === '' || admin.department === adminDepartmentFilter)
  );

  useEffect(() => {
    if (!token || !user || (userRole !== 'admin' && userRole !== 'superadmin')) {
      navigate('/login');
      return;
    }
    const fetchData = async () => {
      setPageLoading(true);
      try {
        const pending = await getPendingNews(token);
        const approved = await getApprovedNews(token);
        setPendingNews(pending.data);
        setApprovedNews(approved.data);
        if (userRole === 'superadmin') {
          const allUsers = await getAllUsers(token);
          setUsers(allUsers.data);
        }
      } catch (err) {
        toast.error('Failed to fetch admin data');
      } finally {
        setPageLoading(false);
      }
    };
    fetchData();
  }, [token, navigate, userRole]);

  // User management actions
  const handleMakeAdmin = (id) => {
    setConfirmMessage('Select department to promote user as Admin.');
    setConfirmAction({ type: 'make-admin', id });
    setConfirmOpen(true);
  };
  const handleMakeSuperadmin = (id) => {
    setConfirmMessage('Are you sure you want to promote this user to Superadmin?');
    setConfirmAction({ type: 'make-superadmin', id });
    setConfirmOpen(true);
  };
  const handleRemoveAdmin = async (id) => {
    const loadingKey = `removeadmin-${id}`;
    addLoading(loadingKey);
    try {
      await removeAdmin(id, token);
      toast.success('Admin rights removed');
      await updateUsers();
    } catch (err) {
      toast.error('Failed to remove admin');
    } finally {
      removeLoading(loadingKey);
    }
  };

  const handleRemoveSuperadmin = async (id) => {
    setConfirmMessage('Are you sure you want to remove superadmin privileges from this user?');
    setConfirmAction({ type: 'remove-superadmin', id });
    setConfirmOpen(true);
  };

  const handleDeleteUser = (id) => {
    setConfirmMessage('Are you sure you want to delete the user?');
    setConfirmAction({ type: 'delete-user', id });
    setConfirmOpen(true);
  };

  const filteredPendingNews = pendingNews.filter(news => {
    // Search by title or content
    const matchesSearch = news.title.toLowerCase().includes(pendingSearchTerm.toLowerCase()) ||
      news.content.toLowerCase().includes(pendingSearchTerm.toLowerCase());

    // Department filter
    const matchesDepartment = pendingDepartmentFilter === '' || news.department === pendingDepartmentFilter ;

    return matchesSearch && matchesDepartment;
  });

  const filteredApprovedNews = approvedNews.filter(news => {
    const matchesSearch = news.title.toLowerCase().includes(approvedSearchTerm.toLowerCase()) ||
      news.content.toLowerCase().includes(approvedSearchTerm.toLowerCase());

    const matchesDepartment = approvedDepartmentFilter === '' || news.department === approvedDepartmentFilter ;

    return matchesSearch && matchesDepartment;
  });


  // News handlers
  const handleApprove = async (id) => {
    const loadingKey = `approve-${id}`;
    addLoading(loadingKey);
    try {
      await approveNews(id, token);
      toast.success('News approved');
      setPendingNews(prev => prev.filter((item) => item._id !== id));
    } catch (err) {
      toast.error('Failed to approve news');
    } finally {
      removeLoading(loadingKey);
    }
  };
  const handleReject = async (id) => {
    setConfirmMessage('Are you sure you want to reject this newsletter?');
    setConfirmAction({ type: 'reject-news', id });
    setConfirmOpen(true);
  };
  const handleDeleteNewsletter = async (id) => {
    setConfirmMessage('Are you sure you want to delete this newsletter?');
    setConfirmAction({ type: 'delete-news', id });
    setConfirmOpen(true);
  };

  // Modal confirm handler
  const handleModalConfirm = async () => {
    setConfirmOpen(false);
    if (confirmAction.type === 'remove-superadmin') {
      const loadingKey = `removesuperadmin-${confirmAction.id}`;
      addLoading(loadingKey);
      try {
        await removeSuperAdmin(confirmAction.id, token);
        toast.success('Removed superadmin privileges');
        await updateUsers();
      } catch (err) {
        toast.error('Failed to remove superadmin');
      } finally {
        removeLoading(loadingKey);
      }
    }
    else if (confirmAction.type === 'make-superadmin') {
      addLoading(`makesuperadmin-${confirmAction.id}`);
      try {
        await makeAdmin(confirmAction.id, 'superadmin', null, token);
        toast.success('User promoted to Superadmin');
        await updateUsers();
      } catch (err) {
        toast.error('Failed to promote as Superadmin');
      } finally {
        removeLoading(`makesuperadmin-${confirmAction.id}`);
      }
    }
    else if (confirmAction.type === 'make-admin') {
      if (!selectedDepartment) {
        toast.error('Please select a department!');
        setConfirmOpen(true);
        return;
      }
      addLoading(`makeadmin-${confirmAction.id}`);
      try {
        await makeAdmin(confirmAction.id, 'admin', selectedDepartment, token);
        toast.success(`User promoted as Admin of ${selectedDepartment}`);
        await updateUsers();
      } catch (err) {
        toast.error('Failed to promote as Admin');
      } finally {
        removeLoading(`makeadmin-${confirmAction.id}`);
        setSelectedDepartment('');
      }
    }
    else if (confirmAction.type === 'delete-user') {
      addLoading(`delete-user-${confirmAction.id}`);
      try {
        await deleteUser(confirmAction.id, token);
        toast.success('User deleted');
        await updateUsers();
      } catch (err) {
        toast.error('Failed to delete user');
      } finally {
        removeLoading(`delete-user-${confirmAction.id}`);
      }
    }
    else if (confirmAction.type === 'delete-news') {
      await doDeleteNewsletter(confirmAction.id);
    }
    else if (confirmAction.type === 'reject-news') {
      await doReject(confirmAction.id);
    }
    setConfirmAction({ type: '', id: null });
    setSelectedDepartment('');
  };

  const updateUsers = async () => {
    if (userRole === 'superadmin') {
      try {
        const res = await getAllUsers(token);
        setUsers(res.data);
      } catch (err) {
        toast.error('Failed to update users');
      }
    }
  };
  const doReject = async (id) => {
    const loadingKey = `reject-${id}`;
    addLoading(loadingKey);
    try {
      await rejectNews(id, token);
      toast.success('News rejected');
      setPendingNews(prev => prev.filter((item) => item._id !== id));
    } catch (err) {
      toast.error('Failed to reject news');
    } finally {
      removeLoading(loadingKey);
    }
  };
  const doDeleteNewsletter = async (id) => {
    const loadingKey = `delete-news-${id}`;
    addLoading(loadingKey);
    try {
      await rejectNews(id, token);
      setApprovedNews(prev => prev.filter((item) => item._id !== id));
      toast.success('Newsletter deleted');
    } catch (err) {
      toast.error('Failed to delete newsletter');
    } finally {
      removeLoading(loadingKey);
    }
  };

  const renderLoadingButton = ({ id, keyPrefix, onClick, children, className }) => {
    const loadingKey = `${keyPrefix}-${id}`;
    return (
      <button
        key={loadingKey}
        disabled={isLoading(loadingKey)}
        onClick={onClick}
        className={`relative cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 ${className || ''}`}
        type="button"
      >
        {isLoading(loadingKey) ? (
          <div className="flex justify-center items-center">
            <Spinner size={20} color="#fff" />
          </div>
        ) : children}
      </button>
    );
  };

  if (pageLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FAFAFA]">
        <Navbar/>
        <Spinner/>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      <Navbar />
      <ConfirmModal
        isOpen={confirmOpen}
        message={confirmMessage}
        onCancel={() => { setConfirmOpen(false); setSelectedDepartment(''); }}
        onConfirm={handleModalConfirm}
      >
        {confirmAction.type === 'make-admin' && (
          <select
            value={selectedDepartment}
            onChange={e => setSelectedDepartment(e.target.value)}
            className="w-full mt-3 p-2 rounded  border-1 border-gray-300"
          >
            <option value="" className='bg-white'>Select Department</option>
            {departments.map(dep => (
              <>
                <hr />
                <option key={dep} value={dep} className='bg-white'>{dep}</option>
              </>
            ))}
          </select>
        )}
      </ConfirmModal>

      <div className="mt-28 px-4 sm:px-8">
        <div className="flex flex-row justify-start md:justify-center gap-3 mb-8  sm:px-4 overflow-x-auto ">
          <button
            className={` flex-shrink-0 px-4 py-2 rounded-lg font-semibold cursor-pointer  border border-gray-300 text-black transition-colors hover:bg-gray-600 hover:text-white ${activeTab === 'pending'
              ? 'bg-gray-600 text-white'
              : 'bg-gray-100 text-gray-900'
              }`}
            onClick={() => setActiveTab('pending')}
          >Pending News</button>
          <button
            className={`flex-shrink-0 px-4 py-2 rounded-lg font-semibold cursor-pointer  border border-gray-300 text-black transition-colors hover:bg-gray-600 hover:text-white ${activeTab === 'approved'
             ? 'bg-gray-600 text-white'
              : 'bg-gray-100 text-gray-900'
              }`}
            onClick={() => setActiveTab('approved')}
          >Approved News</button>
          {userRole === 'superadmin' && (
            <>
              <button
                className={`flex-shrink-0 px-4 py-2 rounded-lg font-semibold cursor-pointer border border-gray-300 text-black transition-colors hover:bg-gray-600 hover:text-white ${activeTab === 'normal'
                  ? 'bg-gray-600 text-white'
              : 'bg-gray-100 text-gray-900'
                  }`}
                onClick={() => setActiveTab('normal')}
              >
                Normal Users
              </button>
              <button
                className={`flex-shrink-0 px-4 py-2 rounded-lg font-semibold cursor-pointer border border-gray-300 text-black transition-colors hover:bg-gray-600 hover:text-white ${activeTab === 'admin'
                  ? 'bg-gray-600 text-white'
              : 'bg-gray-100 text-gray-900'
                  }`}
                onClick={() => setActiveTab('admin')}
              >
                Admins
              </button>
              <button
                className={`flex-shrink-0 px-4 py-2 rounded-lg font-semibold cursor-pointer border border-gray-300 text-black transition-colors hover:bg-gray-600 hover:text-white ${activeTab === 'superadmin'
                  ? 'bg-gray-600 text-white'
              : 'bg-gray-100 text-gray-900'
                  }`}
                onClick={() => setActiveTab('superadmin')}
              >
                Superadmins
              </button>
            </>
          )}
        </div>

        {activeTab === 'pending' && (
          <>
            {userRole === 'superadmin' && (
              <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                <input
                  type="text"
                  placeholder="Search pending news"
                  className="w-full px-4 py-2 border border-[#E0E0E0] rounded-md bg-white text-[#1A1A1A] placeholder-[#B0B0B0] focus:outline-none focus:ring-1 focus:ring-black"
                  value={pendingSearchTerm}
                  onChange={e => setPendingSearchTerm(e.target.value)}
                />
                <select
                  className="w-full px-4 py-2 border border-[#E0E0E0] rounded-md bg-white text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-black"
                  value={pendingDepartmentFilter}
                  onChange={e => setPendingDepartmentFilter(e.target.value)}
                >
                  <option value="">All Departments</option>
                  {departments.map(dep => (
                    <option key={dep} value={dep}>{dep}</option>
                  ))}
                </select>
              </div>
            )}
            <NewsGrid
              newsList={filteredPendingNews}
              showActions={true}
              showDelete={false}
              handleApprove={handleApprove}
              handleReject={handleReject}
              handleDeleteNewsletter={handleDeleteNewsletter}
              isLoading={isLoading}
            />
          </>
        )}

        {activeTab === 'approved' && (
          <>
            {userRole === 'superadmin' && (
              <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                <input
                  type="text"
                  placeholder="Search Approved News"
                  className="w-full px-4 py-2 border border-[#E0E0E0] rounded-md bg-white text-[#1A1A1A] placeholder-[#B0B0B0] focus:outline-none focus:ring-1 focus:ring-black"
                  value={approvedSearchTerm}
                  onChange={e => setApprovedSearchTerm(e.target.value)}
                />
                <select
                  className="w-full px-4 py-2 border border-[#E0E0E0] rounded-md bg-white text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-black"
                  value={approvedDepartmentFilter}
                  onChange={e => setApprovedDepartmentFilter(e.target.value)}
                >
                  <option value="">All Departments</option>
                  {departments.map(dep => (
                    <option key={dep} value={dep}>{dep}</option>
                  ))}
                </select>
              </div>
            )}
            <NewsGrid
              newsList={filteredApprovedNews}
              showActions={false}
              showDelete={true}
              handleApprove={handleApprove}
              handleReject={handleReject}
              handleDeleteNewsletter={handleDeleteNewsletter}
              isLoading={isLoading}
            />
          </>
        )}



        {/* Render users directly below news tabs as separate sections (only if superadmin) */}
        {userRole === 'superadmin' && (
          <div className="space-y-16 mt-12 w-full mx-auto ">

            {/* Normal Users Section */}
            {activeTab === 'normal' && (
              <section>
                <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                  <input
                    type="text"
                    placeholder="Search by email"
                    className="w-full px-4 py-2 border border-[#E0E0E0] rounded-md bg-white text-[#1A1A1A] placeholder-[#B0B0B0] focus:outline-none focus:ring-1 focus:ring-black"
                    value={normalSearchTerm}
                    onChange={e => setNormalSearchTerm(e.target.value)}
                  />
                  <select
                    value={normalDepartmentFilter}
                    onChange={e => setNormalDepartmentFilter(e.target.value)}
                    className="w-full px-4 py-2 border border-[#E0E0E0] rounded-md bg-white text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-black"
                  >
                    <option value="">All Departments</option>
                    {departments.map(dep => (
                      <option key={dep} value={dep}>{dep}</option>
                    ))}
                  </select>
                </div>
                <UserGrid
                  users={displayedNormalUsers}
                  renderLoadingButton={renderLoadingButton}
                  handleMakeAdmin={handleMakeAdmin}
                  handleMakeSuperadmin={handleMakeSuperadmin}
                  handleRemoveAdmin={handleRemoveAdmin}
                  handleDeleteUser={handleDeleteUser}
                  isLoading={isLoading}
                  isNormalUser
                /> 
              </section>
            )}

            {/* Admins Section */}
            {activeTab === 'admin' && (
              <section>
                <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                  <input
                    type="text"
                    placeholder="Search by email"
                    className="w-full px-4 py-2 border border-[#E0E0E0] rounded-md bg-white text-[#1A1A1A] placeholder-[#B0B0B0] focus:outline-none focus:ring-1 focus:ring-black"
                    value={adminSearchTerm}
                    onChange={e => setAdminSearchTerm(e.target.value)}
                  />
                  <select
                    value={adminDepartmentFilter}
                    onChange={e => setAdminDepartmentFilter(e.target.value)}
                    className="w-full px-4 py-2 border border-[#E0E0E0] rounded-md bg-white text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-black"
                  >
                    <option value="">All Departments</option>
                    {departments.map(dep => (
                      <option key={dep} value={dep}>{dep}</option>
                    ))}
                  </select>
                </div>
                <UserGrid
                  users={displayedAdmins}
                  renderLoadingButton={renderLoadingButton}
                  handleMakeAdmin={handleMakeAdmin}
                  handleMakeSuperadmin={handleMakeSuperadmin}
                  handleRemoveAdmin={handleRemoveAdmin}
                  handleDeleteUser={handleDeleteUser}
                  isLoading={isLoading}
                />
              </section>
            )}

            {/* Superadmins Section */}
            {activeTab === 'superadmin' && (
              <section>
                <UserGrid
                  users={superadmins}
                  renderLoadingButton={renderLoadingButton}
                  handleMakeAdmin={handleMakeAdmin}
                  handleMakeSuperadmin={handleMakeSuperadmin}
                  handleRemoveAdmin={handleRemoveAdmin}
                  handleDeleteUser={handleDeleteUser}
                  handleRemoveSuperadmin={handleRemoveSuperadmin}
                  isLoading={isLoading}
                />
              </section>
            )}

          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;

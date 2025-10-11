import React, { useEffect, useState } from 'react';
import Navbar from '../components/NavBar';
import {
  getMySubmissions,
  deleteNewsletter,
} from '../api/newsletter';
import { getAuthUser } from '../utils/auth';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import SubmissionCard from '../components/SubmissionCard';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../components/ConfirmModal';

const MySubmissionsPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null); // Track which card is being deleted
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);

  const token = localStorage.getItem('token');
  const user = getAuthUser();
  const userId = user?.userId;
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !userId) {
      setLoading(false);
      return;
    }
    getMySubmissions(token, userId)
      .then((res) => setSubmissions(res.data))
      .catch(() => toast.error('Failed to fetch your submissions'))
      .finally(() => setLoading(false));
  }, [token, userId]);

  // Delete with spinner
  const handleDelete = (id) => {
    setSelectedDeleteId(id);
    setIsModalOpen(true);
  };
  const confirmDelete = async () => {
    if (!selectedDeleteId) return;

    setDeletingId(selectedDeleteId);
    setIsModalOpen(false);
    try {
      await deleteNewsletter(selectedDeleteId, token);
      setSubmissions((prev) =>
        prev.filter((item) => item._id !== selectedDeleteId)
      );
      toast.success('Newsletter deleted successfully');
    } catch (err) {
      toast.error('Failed to delete newsletter');
    } finally {
      setDeletingId(null);
      setSelectedDeleteId(null);
    }
  };



  // Edit: navigate to the edit form page
  const handleEditNavigate = (id) => {
    navigate(`/my-submissions/edit/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <Navbar/>
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <ConfirmModal
        isOpen={isModalOpen}
        message="Are you sure you want to delete this newsletter?"
        onConfirm={confirmDelete}
        onCancel={() => {
          setIsModalOpen(false);
          setSelectedDeleteId(null);
        }}
      />
      <div className="min-h-screen p-6 bg-[#FAFAFA]">
        <h2 className="text-3xl font-extrabold text-black text-center mb-8 mt-20">My Submissions</h2>
        {submissions.length === 0 ? (
          <p className="text-center text-black">
            You have not submitted any newsletters yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {submissions.map((news) => (
              <SubmissionCard
                key={news._id}
                submission={news}
                onDelete={handleDelete}
                onEditNavigate={handleEditNavigate}
                deleting={deletingId === news._id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MySubmissionsPage;

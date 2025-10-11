import React, { useEffect, useState } from 'react';
import Navbar from '../components/NavBar';
import MultipleFileUpload from '../components/MultipleFileUpload';
import { getNewsletterById, updateNewsletter } from '../api/newsletter';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';

const EditSubmissionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const departments = ['CSE', 'ECE', 'MECH', 'EEE', 'CIVIL'];
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');
  const [department, setDepartment] = useState('');
  const [newFiles, setNewFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [existingMedia, setExistingMedia] = useState([]);

  useEffect(() => {
    const fetchNewsletter = async () => {
      try {
        const res = await getNewsletterById(id);
        const data = res.data;
        setTitle(data.title || '');
        setContent(data.content || '');
        setDate(data.date ? data.date.slice(0, 10) : '');
        setDepartment(data.department || '');
        setPreviews(
          (data.media || []).map((item) => ({
            url: item.url,
            type: item.type,
          }))
        );
        setExistingMedia((data.media || []).map((item) => ({
          url: item.url,
          type: item.type
        })));

      } catch (error) {
        toast.error('Failed to load newsletter data');
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };
    fetchNewsletter();
  }, [id, navigate]);

  const handleFilesSelect = (files) => {
    setNewFiles((prevFiles) => {
      const map = new Map();
      prevFiles.forEach((f) => map.set(f.name + f.size, f));
      files.forEach((f) => {
        if (!map.has(f.name + f.size)) {
          map.set(f.name + f.size, f);
        }
      });
      return Array.from(map.values());
    });

    const newPreviews = files.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type,
    }));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  useEffect(() => {
    return () => {
      previews.forEach((preview) => {
        if (preview.url.startsWith('blob:')) URL.revokeObjectURL(preview.url);
      });
    };
  }, [previews]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('date', date);
      formData.append('department',department);
      newFiles.forEach((file) => formData.append('media', file));

      const token = localStorage.getItem('token');
      formData.append('existingMedia', JSON.stringify(existingMedia));

      await updateNewsletter(id, formData, token);

      toast.success('Newsletter updated successfully');
      navigate(`/newsletters/${id}`);
    } catch (error) {
      toast.error('Failed to update newsletter');
    } finally {
      setUpdateLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <Spinner size={48} color="#4cc0ff" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4 py-12 sm:py-16">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-white rounded-2xl p-6 sm:p-12 space-y-5 mt-6 border border-gray-500"
        >
          <h2 className="text-3xl font-extrabold text-black text-center mb-4">
            Edit Newsletter
          </h2>

          <div>
            <label className="block text-black font-semibold mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-[#41577] rounded-lg bg-[#FAFAFA] text-gray-700 "
              placeholder="Enter title"
              required
            />
          </div>

          <div>
            <label className="block text-black  font-semibold mb-2">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-3 border border-[#41577] rounded-lg bg-[#FAFAFA] text-gray-700 h-40 resize-none"
              placeholder="Write content"
              required
            />
          </div>

          {/* Date Input */}
          <div>
            <label className="block text-black font-semibold mb-2">Date</label>
            <div className="relative">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 border border-[#415a77] bg-[#FAFAFA] text-gray-700 rounded-lg  focus:outline-none focus:ring-1 focus:ring-black placeholder-[#778da9] appearance-none pr-12"
                required
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10m-10 4h6M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"
                  />
                </svg>
              </div>
            </div>
          </div>
          {/* Department Dropdown */}
          <div>
            <label className="block text-black font-semibold mb-2">Department</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-4 py-3 border border-[#415a77] bg-[#FAFAFA] text-gray-700 rounded-lg ] focus:outline-none focus:ring-1 focus:ring-black"
              required
            >
              <option value="" disabled>
                Select Department
              </option>
              {departments.map(dep => (
                <option key={dep} value={dep}>{dep}</option>
              ))}
            </select>
          </div>

          <MultipleFileUpload
            onFilesSelect={handleFilesSelect}
            initialPreviews={previews}
            onRemoveExistingMedia={(removedUrl) => {
              setExistingMedia((prev) => prev.filter((item) => item.url !== removedUrl));
            }}
          />

          <div className="text-center flex justify-center gap-4 mt-6">
            <button
              type="submit"
              disabled={updateLoading}
              className={`bg-gradient-to-r from-[#4890ff] to-[#4cc0ff] text-white rounded-2xl px-6 py-3 font-semibold text-lg transition duration-300 ${updateLoading ? 'opacity-60 cursor-not-allowed' : 'hover:brightness-110'
                }`}
            >
              {updateLoading ? <Spinner size={28} color="#fff" /> : 'Update'}
            </button>
            <button
              type="button"
              onClick={() => navigate(`/my-submissions/${id}`)}
              className="bg-gray-600 text-white rounded-2xl px-6 py-3 font-semibold text-lg hover:bg-gray-700 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSubmissionPage;

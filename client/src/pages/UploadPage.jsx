import React, { useState } from 'react';
import Navbar from '../components/NavBar';
import { createNewsletter } from '../api/newsletter';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import MultipleFileUpload from '../components/MultipleFileUpload';
const departments = [
  'UNIVERSITY', 'CSE', 'ECE', 'MECH', 'EEE', 'CIVIL',
  'PE&PCE', 'MATHS', 'MANAGEMENT STUDIES', 'PHYSICS',
  'CHEMISTRY', 'HSS', 'LIBRARY'
];
const UploadPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);
  const [date, setDate] = useState('');
  const [department, setDepartment] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFilesSelect = (selectedFiles) => {
    setFiles(selectedFiles);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('date', date);
    formData.append('department', department);

    files.forEach(file => {
      formData.append('media', file); // match backend multer key!
    });

    try {
      const token = localStorage.getItem('token');
      const response = await createNewsletter(formData, token);
      toast.success('News uploaded successfully!');
      navigate('/');
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4 py-12 sm:py-16">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl border border-gray-800 bg-white rounded-2xl p-6 sm:p-12 space-y-4 mt-6"
        >
          <h2 className="text-3xl font-extrabold text-black text-center mb-4">
            Upload News
          </h2>

          {/* Title */}
          <div>
            <label className="block text-black font-semibold mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-[#415a77] bg-[#FAFAFA] rounded-lg text-black focus:outline-none focus:ring-1 focus:ring-black placeholder-[#778da9]"
              placeholder="Enter news title"
              required
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-black font-semibold mb-2">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-3 h-40 border border-[#415a77] bg-[#FAFAFA] rounded-lg resize-none text-black focus:outline-none focus:ring-1 focus:ring-black placeholder-[#778da9]"
              placeholder="Write your news content here..."
              required
            ></textarea>
          </div>

          {/* Date Input */}
          <div>
            <label className="block text-black font-semibold mb-2">Date</label>
            <div className="relative">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 border border-[#415a77] bg-[#FAFAFA] rounded-lg text-black focus:outline-none focus:ring-1 focus:ring-black placeholder-[#778da9] appearance-none pr-12"
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
              className="w-full px-4 py-3 border border-[#415a77] bg-[#FAFAFA] rounded-lg text-black focus:outline-none focus:ring-1 focus:ring-black"
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


          {/* Optional Image Upload Component */}
          <MultipleFileUpload onFilesSelect={handleFilesSelect} />

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className={`bg-gray-800 text-white hover:bg-gray-700  px-8 py-3 rounded-lg font-semibold 
    text-lg transition-colors cursor-pointer ${loading ? "opacity-60 cursor-not-allowed" : "hover:from-[#FAFAFA] hover:to-[#4895ef]"}`}
            >
              {loading ? <Spinner /> : "Submit"}
            </button>


          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadPage;

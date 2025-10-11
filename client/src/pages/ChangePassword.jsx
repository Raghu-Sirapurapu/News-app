import React, { useState } from 'react';
import Navbar from '../components/NavBar';
import { changePassword } from '../api/auth';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);  
  const [showPassword2, setShowPassword2] = useState(false);  
  const [showPassword3, setShowPassword3] = useState(false);  

  const togglePasswordVisibility1 = () => {
    setShowPassword1(prev => !prev);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2(prev => !prev);
  };
  const togglePasswordVisibility3 = () => {
    setShowPassword3(prev => !prev);
  };


  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();

    // Validation
    if (newPassword !== confirmPassword) {
      toast.error('New password and confirm password do not match');
      return;
    }

    setSubmissionLoading(true);
    try {
      const res = await changePassword({ oldPassword, newPassword });
      toast.success(res.data?.message || 'Password changed successfully');

      // Optional: redirect after few seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to change password');
    } finally {
      setSubmissionLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4 py-12 sm:py-16 mt-20 md:mt-10">
        <div className="bg-white border border-gray-800 rounded-2xl max-w-md w-full p-6 sm:p-16 shadow-md shadow-black">
          <h2 className="text-3xl font-extrabold text-black text-center mb-8">
            Change Password
          </h2>

          <form onSubmit={handleChangePassword} className="space-y-5">
            {/* Old Password */}
            <div className='relative'>

                <input
                type={showPassword1 ? 'text' : 'password'}
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full px-5 py-4 rounded-lg bg-[#FAFAFA] border border-[#415a77] text-black placeholder-[#778da9] focus:outline-none focus:ring-1 focus:ring-black transition"
                required
                />
                <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black cursor-pointer"
                onClick={togglePasswordVisibility1}
                tabIndex={-1}
                aria-label={showPassword1 ? 'Hide password' : 'Show password'}
              >
                {showPassword1 ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            </div>

            {/* New Password */}
            <div className='relative'>

            <input
              type={showPassword2 ? 'text' : 'password'}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-5 py-4 rounded-lg bg-[#FAFAFA] border border-[#415a77] text-black placeholder-[#778da9] focus:outline-none focus:ring-1 focus:ring-black transition"
              required
            />
            <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black cursor-pointer"
                onClick={togglePasswordVisibility2}
                tabIndex={-1}
                aria-label={showPassword2 ? 'Hide password' : 'Show password'}
              >
                {showPassword2 ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            </div>

            {/* Confirm Password */}
            <div className='relative'>

            <input
              type={showPassword3 ? 'text' : 'password'}
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-5 py-4 rounded-lg bg-[#FAFAFA] border border-[#415a77] text-black placeholder-[#778da9] focus:outline-none focus:ring-1 focus:ring-black transition"
              required
            />
            <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black cursor-pointer"
                onClick={togglePasswordVisibility3}
                tabIndex={-1}
                aria-label={showPassword3 ? 'Hide password' : 'Show password'}
              >
                {showPassword3 ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submissionLoading}
              className={`w-full bg-gray-800 text-white hover:bg-gray-700 font-semibold py-4 rounded-lg cursor-pointer transition-colors text-lg ${
                submissionLoading ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            >
              {submissionLoading ? <Spinner /> : 'Change Password'}
            </button>

            {/* Forgot Password Link */}
            <div className="mt-2 text-center text-sm text-black">
              <p>
                Forgot your password?{' '}
                <a
                  href="/forgot-password"
                  className="text-blue-500 hover:underline hover:text-blue-400 transition"
                >
                  Reset here
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;

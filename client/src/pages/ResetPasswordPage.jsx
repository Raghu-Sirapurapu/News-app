import React, { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../api/auth';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

const ResetPasswordPage = () => {

  //get token and send as request to verify the user
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [submissionLoading, setSubmissionLoading] = useState(false);

  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setSubmissionLoading(true);
    try {
      await resetPassword(token, { password });
      toast.success('Password reset successful!');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Reset failed');
    } finally {
      setSubmissionLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      <div className="flex-col flex items-center justify-center px-4 py-12 sm:py-16 mt-20 md:mt-10 space-y-8">
        <h1 className='font-semibold text-4xl'>JNTUK-NEWS</h1>
        <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-16 shadow-md shadow-black">
          <h2 className="text-3xl font-semibold text-black text-center mb-8">
            Reset Password
          </h2>
          <form onSubmit={handleReset} className="space-y-6">
            <input
              type="password"
              placeholder="New Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 rounded-lg bg-[#FAFAFA] border border-[#415a77] text-black placeholder-[#778da9] focus:outline-none focus:ring-1 focus:ring-black transition"
              required
            />
            <button
              type="submit"
              disabled={submissionLoading}
              className={`w-full bg-gray-800 text-white font-semibold py-4 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors text-lg ${submissionLoading ? "opacity-60 cursor-not-allowed" : "hover:from-[#4cc9f0] hover:to-[#4895ef]"}`}
            >
              {submissionLoading ? <Spinner /> : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;

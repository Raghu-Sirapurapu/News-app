import React, { useState } from 'react';
import Navbar from '../components/NavBar';
import { forgotPassword } from '../api/auth';
import { toast } from 'react-toastify'; 
import Spinner from '../components/Spinner';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [submissionLoading, setSubmissionLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setSubmissionLoading(true);
    try {
      const res = await forgotPassword({ email });
      toast.success('Email sent succesfully!')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send reset link');
    }finally{
      setSubmissionLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4 py-12 sm:py-16 mt-20 md:mt-10">
        <div className="bg-white border border-gray-800 rounded-2xl max-w-md w-full p-6 sm:p-16 shadow-md shadow-black">
          <h2 className="text-3xl font-extrabold text-black text-center mb-8">
            Forgot Password
          </h2>

          <form onSubmit={handleForgotPassword} className="space-y-5">
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 rounded-lg bg-[#FAFAFA] border border-[#415a77] text-black placeholder-[#778da9] focus:outline-none focus:ring-1 focus:ring-black transition"
              required
            />

            <button
              type="submit"
              disabled={submissionLoading}
              className={`w-full bg-gray-800 text-white hover:bg-gray-700  font-semibold py-4 rounded-lg  cursor-pointer transition-colors text-lg ${submissionLoading ? "opacity-60 cursor-not-allowed" : "hover:from-[#4cc9f0] hover:to-[#4895ef]"}`}
            >
              {submissionLoading ? <Spinner /> : "Send Reset Link"}
            </button>

            <div className="mt-2 text-center text-sm text-black">
              <p>
                Remember your password?{' '}
                <a
                  href="/login"
                  className="text-blue-500 hover:underline hover:text-blue-400 transition"
                >
                  Login
                </a>
              </p>
            </div>
          </form>

        
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

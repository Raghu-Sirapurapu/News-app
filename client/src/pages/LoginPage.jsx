import React, { useState } from 'react';
import Navbar from '../components/NavBar';
import { loginUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';  
import Spinner from '../components/Spinner';
import { Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submissionLoading,setSubmissionLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    setSubmissionLoading(true);
    try {
      const res = await loginUser({ email, password });
      localStorage.setItem('token', res.data.token);
      toast.success('Login successful!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }finally{
      setSubmissionLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4 py-12 sm:py-16 mt-20 md:mt-10">
        <div className="bg-white border border-gray-800 rounded-2xl max-w-md w-full p-6 sm:p-16 shadow-md shadow-black">
          <h2 className="text-4xl font-extrabold text-black text-center mb-10">
            Login
          </h2>
          <form onSubmit={handleLogin} className="space-y-5">
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 rounded-lg bg-[#FAFAFA] border border-[#415a77] text-black placeholder-[#778da9] focus:outline-none focus:ring-1 focus:ring-black transition"
              required
            />
            <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 rounded-lg bg-[#FAFAFA] border border-[#415a77] text-black placeholder-[#778da9] focus:outline-none focus:ring-1 focus:ring-black transition"
              required
            />
             <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black cursor-pointer"
                onClick={togglePasswordVisibility}
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            </div>
            <button
              type="submit"
              disabled={submissionLoading}
              className={`w-full bg-gray-800 text-white font-semibold py-4 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors text-lg ${submissionLoading ? "opacity-60 cursor-not-allowed" : "hover:from-[#4cc9f0] hover:to-[#4895ef]"}`}
            >
              {submissionLoading ? <Spinner /> : "Login"}
            </button>
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
              <p className="mt-5">
                Don't have an account?{' '}
                <a
                  href="/register"
                  className="text-blue-500 hover:underline hover:text-blue-400 transition"
                >
                  Register
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

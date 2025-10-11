import React, { useState } from 'react';
import Navbar from '../components/NavBar';
import { registerUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { Eye, EyeOff } from 'lucide-react';
const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [department, setDepartment] = useState('');
const departments = [
    'CSE', 'ECE', 'MECH', 'EEE', 'CIVIL',
    'PE&PCE', 'MATHS', 'MANAGEMENT STUDIES', 'PHYSICS',
    'CHEMISTRY', 'HSS', 'LIBRARY'
  ];
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    setSubmissionLoading(true);
    try {
      await registerUser({ email, password, department });
      toast.success('Registration successful!');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setSubmissionLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4 py-12 sm:py-16 mt-20 md:mt-10">
        <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-16 shadow-md shadow-black">
          <h2 className="text-3xl font-extrabold text-black text-center mb-8">
            Register
          </h2>
          <form onSubmit={handleRegister} className="space-y-5">
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
            <div>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-5 py-4 border border-[#415a77] bg-[#FAFAFA] rounded-lg text-black focus:outline-none focus:ring-1 focus:ring-black"
              >
                <option value="" disabled>
                  Select Department
                </option>
                {departments.map(dep => (
                  <option key={dep} value={dep}>{dep}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              disabled={submissionLoading}
              className={`w-full bg-gray-800 text-white font-semibold py-4 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors text-lg ${submissionLoading ? "opacity-60 cursor-not-allowed" : "hover:from-[#4cc9f0] hover:to-[#4895ef]"}`}
            >
              {submissionLoading ? <Spinner /> : "Register"}
            </button>
            <div className="mt-2 text-center text-sm text-black">
              <p>
                Already have an account?{' '}
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

export default RegisterPage;

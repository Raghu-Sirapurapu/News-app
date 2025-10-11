import React, { useEffect, useState } from 'react';
import { getAllNewsletters } from '../api/newsletter';
import Navbar from '../components/NavBar';
import Spinner from '../components/Spinner';
import NewsletterList from '../components/NewsletterList';
import DepartmentDetails from '../components/DepartmentDetails';
import { ChevronRight, X } from 'lucide-react';

const NewslettersPage = () => {
  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPanel, setShowPanel] = useState(false);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  const departments = [
    'CSE', 'ECE', 'MECH', 'EEE', 'CIVIL',
    'PE&PCE', 'MATHS', 'MANAGEMENT STUDIES', 'PHYSICS',
    'CHEMISTRY', 'HSS', 'LIBRARY'
  ];

  useEffect(() => {
    const fetchNewsletters = async () => {
      setLoading(true);
      try {
        const response = await getAllNewsletters();
        setNewsletters(response.data);
      } catch (error) {
        console.error('Error fetching newsletters:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsletters();
  }, []);

  const filteredNewsletters = newsletters.filter(
    (news) =>
      (news.title.toLowerCase().includes(search.toLowerCase()) ||
        news.content.toLowerCase().includes(search.toLowerCase())) &&
      (departmentFilter === '' || news.department === departmentFilter)
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <Navbar />
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen p-4 sm:p-6 bg-[#FAFAFA] relative">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-6 mt-20 text-center font-playfair">
          ALL NEWSLETTERS
        </h1>

        {/* 🔍 Search + Filter */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="🔍 Search newsletters..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border border-black rounded-md bg-white text-black placeholder-[#778a99] focus:outline-none focus:ring-1 focus:ring-black"
          />
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="w-full px-4 py-2 border border-[#415a77] rounded-md bg-white text-black focus:outline-none focus:ring-1 focus:ring-black"
          >
            <option value="">All Departments</option>
            {departments.map((dep) => (
              <option key={dep} value={dep}>
                {dep}
              </option>
            ))}
          </select>
        </div>

        {/* ✅ Conditional layout rendering */}
        <div
          className={`grid gap-6 ${
            departmentFilter ? 'lg:grid-cols-5' : 'lg:grid-cols-5'
          }`}
        >
          {/* 📰 News Section */}
          <div
            className={`${
              departmentFilter ? 'lg:col-span-3' : 'lg:col-span-5'
            }`}
          >
            <NewsletterList newsletters={filteredNewsletters} options={options} cols = {`${
              departmentFilter ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5'
            }`}/>
          </div>

          {/* 🏫 Department Details Panel - Desktop */}
          {departmentFilter && (
            <div className="hidden lg:block lg:col-span-2">
              <DepartmentDetails department={departmentFilter} />
            </div>
          )}
        </div>

        {/* 📱 Mobile/Tablet Department Button */}
        {departmentFilter && (
          <button
            onClick={() => setShowPanel(true)}
            className="lg:hidden fixed bottom-6 right-6 bg-gray-200 text-black rounded-full p-3 shadow-lg  transition"
          >
            <ChevronRight size={28} />
          </button>
        )}

        {/* 📱 Slide-in Department Panel */}
        {showPanel && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-end z-50">
            <div className="bg-white w-11/12 sm:w-2/3 md:w-1/2 h-full shadow-lg p-4 overflow-y-auto transform transition-transform duration-300">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-black">
                  {departmentFilter} Department
                </h2>
                <button
                  onClick={() => setShowPanel(false)}
                  className="text-gray-700 hover:text-black"
                >
                  <X size={24} />
                </button>
              </div>
              <DepartmentDetails department={departmentFilter} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewslettersPage;

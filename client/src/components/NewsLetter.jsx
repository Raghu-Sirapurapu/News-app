import React, { useEffect, useState } from 'react';
import { getAllNewsletters } from '../api/newsletter';
import Navbar from '../components/NavBar';
import NewsletterList from '../components/NewsletterList';

const Newsletters = () => {
  const [newsletters, setNewsletters] = useState([]);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        const response = await getAllNewsletters();
        setNewsletters(response.data.slice(0, 20));
      } catch (error) {
        console.error('Error fetching newsletters:', error);
      }
    };

    fetchNewsletters();
  }, []);

  return (
    <section className="pb-6 px-4 md:px-8 bg-[#FAFAFA]">
      <h2 className="text-2xl sm:text-3xl font-semibold text-black text-center mb-8">
        Latest Newsletters
      </h2>
      <NewsletterList newsletters={newsletters} options={options} cols = {"grid-cols-1 md:grid-cols-2 lg:grid-cols-5"}/>
    </section>
  );
};

export default Newsletters;

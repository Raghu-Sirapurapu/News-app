import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/NavBar';
import { getNewsletterById } from '../api/newsletter';
import Spinner from '../components/Spinner';

const NewsletterDataPage = () => {
  const { id } = useParams();
  const [newsletter, setNewsletter] = useState(null);
  const [loading, setLoading] = useState(true);

  // Slider state: current media index
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchNewsletter = async () => {
      setLoading(true);
      try {
        const response = await getNewsletterById(id);
        setNewsletter(response.data);
        setCurrentIndex(0); // reset slider on newsletter change
      } catch (error) {
        console.error('Failed to fetch newsletter:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsletter();
  }, [id]);

  const formattedDate = newsletter?.date
    ? new Date(newsletter.date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Unknown date';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <Navbar/>
        <Spinner/>
      </div>
    );
  }

  if (!newsletter) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] text-black">
        <p>Newsletter not found.</p>
      </div>
    );
  }

  // Helper functions for slider navigation
  const mediaItems = newsletter.media || [];

  const hasMedia = mediaItems.length > 0;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? mediaItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === mediaItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Navbar />
      <main className="max-w-5xl mx-auto p-6 pt-20 sm:px-10">
        <article className="bg-white rounded-lg shadow-md p-6 sm:p-10">
          <h2 className="text-lg sm:text-2xl font-semibold mb-4 text-black drop-shadow-sm">
            {newsletter.title}
          </h2>
          <p className="text-sm sm:text-base text-black mb-6">on {formattedDate}</p>

          {/* Media slider: show if media exists */}
          {hasMedia && (
            <section className="relative w-full h-64 sm:h-96 mb-8 rounded overflow-hidden  bg-white">
              {/* Display current media */}
              {mediaItems[currentIndex].type === 'video' ? (
                <video
                  key={mediaItems[currentIndex].url}
                  src={mediaItems[currentIndex].url}
                  controls
                  className="absolute inset-0 w-full h-full object-contain"
                />
              ) : (
                <img
                  key={mediaItems[currentIndex].url}
                  src={mediaItems[currentIndex].url}
                  alt={`${newsletter.title} media ${currentIndex + 1}`}
                  className="absolute inset-0 w-full h-full object-contain object-center"
                />
              )}

              {/* Slider controls */}
              {mediaItems.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-[#4cc9f0aa] rounded-full p-2 hover:bg-[#4cc9f0cc] transition"
                    aria-label="Previous media"
                  >
                    &#8592;
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#4cc9f0aa] rounded-full p-2 hover:bg-[#4cc9f0cc] transition"
                    aria-label="Next media"
                  >
                    &#8594;
                  </button>

                  {/* Indicator */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-[#4cc9f0aa] text-[#0d1b2a] rounded-full px-3 py-1 text-xs font-semibold select-none">
                    {currentIndex + 1} / {mediaItems.length}
                  </div>
                </>
              )}
            </section>
          )}


          <section className="prose max-w-none text-black leading-relaxed whitespace-pre-wrap overflow-scroll">
            {newsletter.content}
          </section>
        </article>
      </main>
    </div>
  );
};

export default NewsletterDataPage;

// src/components/NewsletterList.js
import React from 'react';
import { Link } from 'react-router-dom';
import { bgimage } from '../assets/assets';

const NewsletterList = ({ newsletters, options, cols }) => { 
  return (
    <div className= {`grid ${cols} gap-6  mx-auto`} >
            {newsletters.map((news) => (
              <Link
                key={news._id} 
                to={`/newsletters/${news._id}`}
                className="group block bg-white border border-gray-600 rounded-lg shadow-md shadow-gray-500 hover:shadow-lg hover:scale-105 transition-transform transform duration-300 overflow-hidden"
                style={{ minHeight: '350px', maxHeight: '350px' }}
              >
                <div className="h-[180px] w-full bg-white flex items-center justify-center overflow-hidden rounded-t-lg">
                  {news.media && news.media.length > 0 ? (
                    news.media[0].type === 'video' ? (
                      <video
                        src={news.media[0].url}
                        className="object-cover w-full h-full"
                        controls
                        muted
                        loop
                        playsInline
                      />
                    ) : (
                      <img
                        src={news.media[0].url}
                        alt={news.title}
                        className="object-cover w-full h-full"
                      />
                    )
                  ) : (
                    <img
                      src= {
                        bgimage
                      }
                      
                      alt="Default background"
                      className="object-cover w-full h-full"
                    />
                  )} 
                </div>
                <div className="pt-5 pl-5 pr-5  flex flex-col h-[170px]">
                  <div className="text-sm text-black mb-2 flex justify-between">
                    <span>{new Date(news.date).toLocaleDateString('en-US', options)}</span>
                    <span className="capitalize">{news.department}</span>
                  </div>
    
                  <h3 className="text-xl font-semibold text-black mb-2  line-clamp-1 ">
                    {news.title}
                  </h3>
                  <p className="text-black   line-clamp-3">
                    {news.content && news.content.slice(0, 200)}...
                  </p>
                </div>
              </Link>
            ))}
          </div>
  );
};

export default NewsletterList;

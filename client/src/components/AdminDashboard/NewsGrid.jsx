import React from 'react';
import { useNavigate } from 'react-router-dom';
import { bgimage } from '../../assets/assets';
import Spinner from '../Spinner';

const NewsGrid = ({
  newsList,
  showActions,
  showDelete,
  handleApprove,
  handleReject,
  handleDeleteNewsletter,
  isLoading
}) => {
  const navigate = useNavigate();

   const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {newsList.length ? newsList.map((item) => (
        <article
          key={item._id}
          onClick={() => navigate(`/newsletters/${item._id}`)}
          className="cursor-pointer rounded-xl border border-gray-300 bg-white p-5 transition duration-300 hover:scale-105 shadow-lg  flex flex-col"
          style={{ height: '350px', minWidth: 0 }}
        >
          <div className="h-[175px] w-full overflow-hidden rounded-lg bg-white flex items-center justify-center">
            {item.media && item.media.length ? (
              item.media[0].type === 'video' ? (
                <video
                  src={item.media[0].url}
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  onClick={e => e.stopPropagation()}
                />
              ) : (
                <img
                  src={item.media[0].url}
                  className="w-full h-full object-cover"
                  alt={item.title}
                  onClick={e => e.stopPropagation()}
                />
              )
            ) : (
              <img
                src={bgimage}
                className="w-full h-full object-cover"
                alt="Sample preview"
              />
            )}
          </div>
          <h3
            className="mt-4 text-lg font-semibold text-black line-clamp-2 flex-shrink-0"
            style={{ minHeight: '3rem' }}>
            {item.title}
          </h3>
          <div className="mt-2 text- text-sm">
            <div className="text-sm text- mb-2 flex justify-between">
              <span>{new Date(item.date).toLocaleDateString('en-US', options)}</span>
              <span className="capitalize">{item.department}</span>
            </div>
            <p>Submitted by: {item.email}</p>
          </div>
          {showActions && (
            <div className="mt-3 flex gap-2">
              <button onClick={e => { e.stopPropagation(); handleApprove(item._id); }}
                disabled={isLoading(`approve-${item._id}`)}
                className="w-[110px] cursor-pointer bg-gray-600 text-white rounded py-2 font-semibold transition hover:brightness-120 disabled:opacity-50"
              >
                {isLoading(`approve-${item._id}`) ? <Spinner size={16} /> : 'Approve'}
              </button>
              <button onClick={e => { e.stopPropagation(); handleReject(item._id); }}
                disabled={isLoading(`reject-${item._id}`)}
                className="w-[110px] cursor-pointer bg-red-600 text-white rounded py-2 font-semibold transition hover:brightness-120 disabled:opacity-50"
              >
                {isLoading(`reject-${item._id}`) ? <Spinner size={16} /> : 'Reject'}
              </button>
            </div>
          )}
          {showDelete && (
            <button onClick={e => { e.stopPropagation(); handleDeleteNewsletter(item._id); }}
              disabled={isLoading(`delete-news-${item._id}`)}
              className="mt-3 w-[110px] cursor-pointer bg-red-600 text-white rounded py-2 font-semibold transition hover:brightness-120 disabled:opacity-50">
              {isLoading(`delete-news-${item._id}`) ? <Spinner size={16} /> : 'Delete'}
            </button>
          )}
        </article>
      )) : (
        <p className="text-black text-center col-span-full">No news available.</p>
      )}
    </div>
  );
};

export default NewsGrid;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { bgimage } from '../assets/assets';
const SubmissionCard = ({
  submission,
  onDelete,
  onEditNavigate,
  deleting,
}) => {
  const navigate = useNavigate();

  const statusColor =
    submission.status === 'approved'
      ? 'text-green-600'
      : submission.status === 'pending'
        ? 'text-yellow-600'
        : 'text-red-600';

  // Navigate to detail page for the card (except when clicking edit/delete)
  const handleCardClick = () => {
    navigate(`/newsletters/${submission._id}`);
  };

  // Avoid link navigation when clicking edit/delete
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={handleCardClick}
      className="group block rounded-lg shadow-md bg-white border border-gray-400 overflow-hidden hover:shadow-lg hover:scale-105 transition-transform duration-300 min-h-[350px] cursor-pointer"
      style={{ minHeight: '330px', maxHeight: '350px' }}
    >
      <div className="h-[180px] w-full bg-white flex items-center justify-center overflow-hidden rounded-t-lg">
        {submission.media && submission.media.length > 0 ? (
          submission.media[0].type === 'video' ? (
            <video
              src={submission.media[0].url}
              className="object-cover w-full h-full"
              controls
              muted
              loop
              playsInline
            />
          ) : (
            <img
              src={submission.media[0].url}
              alt={submission.title}
              className="object-cover w-full h-full"
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
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="text-black">
            {submission.date ? submission.date.slice(0, 10) : ''}
          </span>
          <span className={`font-semibold capitalize ${statusColor}`}>
            {submission.status}
          </span>
        </div>
        <h3 className="text-lg font-bold text-black mb-3 line-clamp-2 font-sans">
          {submission.title}
        </h3>
        {submission.status === 'pending' && (
          <div className="flex gap-2 mt-auto">
            <button
              onClick={(e) => {
                stopPropagation(e);
                onEditNavigate(submission._id);
              }}
              className="bg-gray-700 text-white px-3 py-1 rounded font-semibold hover:bg-gray-600 transition"
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                stopPropagation(e);
                onDelete(submission._id);
              }}
              disabled={deleting}
              className="bg-red-600 text-white px-3 py-1 rounded font-semibold hover:bg-red-700 transition flex items-center gap-2"
            >
              {deleting ? <Spinner size={15} color="white" /> : "Delete"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmissionCard;

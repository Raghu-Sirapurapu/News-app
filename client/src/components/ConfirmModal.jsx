// ConfirmModal.jsx
import React from 'react';

const ConfirmModal = ({ isOpen, message, onConfirm, onCancel, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.34)] backdrop-blur-xs flex items-center justify-center z-50">
      <div className="bg-gray-200 rounded-lg p-6 max-w-sm w-full">
        <p className="text-black mb-6">{message}</p>
        {/* Render child elements here: */}
        {children}
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-700 text-white cursor-pointer hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-gray-700 text-white cursor-pointer hover:bg-gray-600 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

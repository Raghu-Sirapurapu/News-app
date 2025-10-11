import React, { useState, useRef, useEffect } from "react";

const MultipleFileUpload = ({ onFilesSelect, initialPreviews = [], onRemoveExistingMedia = () => { }, }) => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState(initialPreviews); // Include initialPreviews
  const [initialized, setInitialized] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    // Ensure we only initialize once with initialPreviews
    if (!initialized && initialPreviews.length > 0) {
      setPreviews(initialPreviews);
      setInitialized(true);
    }
  }, [initialPreviews, initialized]);

  const handleChange = (e) => {
    const newFiles = Array.from(e.target.files);

    const existingFilesMap = new Map(files.map(f => [f.name + f.size, f]));
    newFiles.forEach(file => {
      const key = file.name + file.size;
      if (!existingFilesMap.has(key)) {
        existingFilesMap.set(key, file);
      }
    });

    const updatedFiles = Array.from(existingFilesMap.values());
    setFiles(updatedFiles);
    onFilesSelect(updatedFiles);

    const newPreviews = newFiles.map(file => ({
      url: URL.createObjectURL(file),
      type: file.type
    }));
    setPreviews(prev => [...prev, ...newPreviews]);

    if (inputRef.current) inputRef.current.value = "";
  };

  const handleRemoveFile = (index) => {
    const filePreviews = previews[index];

    // If it's a new file, remove from files
    if (filePreviews.url.startsWith("blob:")) {
      setFiles(prevFiles => {
        const newFiles = [...prevFiles];
        newFiles.splice(index - initialPreviews.length, 1);
        onFilesSelect(newFiles);
        return newFiles;
      });

      URL.revokeObjectURL(filePreviews.url);
    } else {
      // ✅ Removing an existing file — notify parent
      onRemoveExistingMedia(filePreviews.url);
    }

    setPreviews(prev => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };

  const handleClear = () => {
    previews.forEach(preview => {
      if (preview.url.startsWith("blob:")) {
        URL.revokeObjectURL(preview.url);
      }
    });
    setFiles([]);
    setPreviews(initialPreviews); // Reset to initial
    setInitialized(true); // Prevent reinitializing on rerender
    onFilesSelect([]);
    if (inputRef.current) inputRef.current.value = "";
  };

  useEffect(() => {
    return () => {
      previews.forEach(preview => {
        if (preview.url.startsWith("blob:")) {
          URL.revokeObjectURL(preview.url);
        }
      });
    };
  }, [previews]);

  return (
    <div className="mb-6 relative">
      <label className="block text-black font-semibold mb-2">
        Upload Images or Videos
      </label>

      <input
        ref={inputRef}
        id="media-upload"
        type="file"
        accept="image/*,video/*"
        multiple
        onChange={handleChange}
        className="absolute opacity-0 w-0 h-0"
      />

      <label
        htmlFor="media-upload"
        className="relative flex items-center justify-between cursor-pointer rounded-lg border border-[#415a77]
          px-4 py-2 bg-[#FAFAFA] text-black select-none"
      >
        <span>
          {files.length === 0 && initialPreviews.length === 0
            ? "No files chosen"
            : `${previews.length} file${previews.length > 1 ? "s" : ""} selected`}
        </span>
        <span className="ml-2 font-semibold text-black">
          Browse
        </span>
      </label>

      {previews.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-4">
          {previews.map((preview, idx) => (
            <div key={idx} className="relative group">
              {preview.type.startsWith("image") ? (
                <img
                  src={preview.url}
                  alt={`Preview ${idx + 1}`}
                  className="w-full h-32 object-cover rounded-lg border border-[#4cc9f030]"
                  style={{ filter: "drop-shadow(0 0 8px rgba(76,201,240,0.3))" }}
                />
              ) : (
                <video
                  src={preview.url}
                  controls
                  className="w-full h-32 object-cover rounded-lg border border-[#4cc9f030]"
                />
              )}
              <button
                type="button"
                onClick={() => handleRemoveFile(idx)}
                className="absolute top-1 right-1 bg-red-500 rounded-full text-white p-0.5 text-xs cursor-pointer opacity-80 hover:opacity-100"
                title="Remove file"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleClear}
            className="col-span-full mt-2 text-red-600 hover:underline text-sm cursor-pointer"
          >
            ❌ Cancel All Files
          </button>
        </div>
      )}
    </div>
  );
};

export default MultipleFileUpload;

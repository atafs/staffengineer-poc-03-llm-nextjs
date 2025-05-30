// src/components/DocumentUpload.tsx
import { useState } from "react";

interface DocumentUploadProps {
  setFile: (file: File | null) => void;
  isLoading: boolean;
}

function DocumentUpload({ setFile, isLoading }: DocumentUploadProps) {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFile(file);
    } else {
      setFileName(null);
      setFile(null);
    }
  };

  return (
    <div className="bg-gray-600 p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-2">Upload Legal Document</h2>
      <div className="flex items-center space-x-4">
        <label
          htmlFor="file-upload"
          className="inline-block bg-black px-4 py-2 border border-black rounded-md text-white cursor-pointer hover:bg-gray-800 transition-colors"
        >
          Upload Document
          <input
            id="file-upload"
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileChange}
            className="hidden"
            disabled={isLoading}
          />
        </label>
        <span className="text-black">{fileName || "No file loaded"}</span>
        {fileName && (
          <button
            onClick={() => {
              setFileName(null);
              setFile(null);
            }}
            className="text-red-500 hover:text-red-700"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

export default DocumentUpload;

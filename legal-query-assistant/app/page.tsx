"use client";

import { useState } from "react";
import QueryInput from "../components/QueryInput";
import DocumentUpload from "../components/DocumentUpload";
import ResponseDisplay from "../components/ResponseDisplay";
import { LegalResponse } from "../types";

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [legalResponse, setLegalResponse] = useState<LegalResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!query || !file) return;

    setIsLoading(true);
    console.log(`Submitting query: ${query}`);
    console.log(`Submitting file: ${file.name}`);

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, fileName: file.name }),
      });
      const data = await response.json();
      console.log("API response:", data);
      setLegalResponse(data);
      setQuery("");
      setFile(null);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-400 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-4xl bg-black shadow-lg rounded-lg p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-center">
          Legal Query Assistant
        </h1>
        <div className="space-y-4 sm:space-y-6">
          <QueryInput query={query} setQuery={setQuery} isLoading={isLoading} />
          <DocumentUpload setFile={setFile} isLoading={isLoading} />
          <button
            onClick={handleSubmit}
            disabled={!query || !file || isLoading}
            className="w-full sm:w-auto mt-2 sm:mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isLoading ? "Processing..." : "Submit Request"}
          </button>
          {legalResponse && <ResponseDisplay response={legalResponse} />}
        </div>
      </div>
    </div>
  );
}

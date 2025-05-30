// src/components/QueryInput.tsx
import { useState } from "react";

interface QueryInputProps {
  query: string;
  setQuery: (query: string) => void;
  isLoading: boolean;
}

function QueryInput({ query, setQuery, isLoading }: QueryInputProps) {
  return (
    <div className="bg-gray-600 p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-2">Legal Query</h2>
      <textarea
        className="w-full bg-black p-2 border rounded-md"
        rows={4}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter your legal query..."
        disabled={isLoading}
      />
    </div>
  );
}

export default QueryInput;

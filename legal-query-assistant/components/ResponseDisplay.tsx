// src/components/ResponseDisplay.tsx
interface ResponseDisplayProps {
  response: { queryResponse: string; summary: string } | null;
}

function ResponseDisplay({ response }: ResponseDisplayProps) {
  if (!response) return null;

  return (
    <div className="bg-gray-600  p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-2">AI Response</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Query Response</h3>
          <p className="text-black">{response.queryResponse}</p>
        </div>
        <div>
          <h3 className="text-lg font-medium">Document Summary</h3>
          <p className="text-black">{response.summary}</p>
        </div>
      </div>
    </div>
  );
}

export default ResponseDisplay;

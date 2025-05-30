import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { query, fileName } = await request.json();

  // Simulate 2-second AI processing delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = {
    queryResponse: `Analysis of query: "${query}". This is a mock legal response based on the provided input.`,
    summary: `Summary of ${fileName}: This is a mock summary of the uploaded document.`,
  };

  return NextResponse.json(response);
}

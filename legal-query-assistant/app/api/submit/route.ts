import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { query, fileName } = await request.json();

  try {
    const grokResponse = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "grok-3-mini", // Cheapest model
        messages: [
          {
            role: "user",
            content: `Legal query: ${query}\nDocument uploaded: ${fileName}`,
          },
        ],
        max_tokens: 500, // Limit output to control costs
      }),
    });

    if (!grokResponse.ok) {
      throw new Error(`API request failed with status ${grokResponse.status}`);
    }

    const data = await grokResponse.json();
    const responseContent =
      data.choices?.[0]?.message?.content || "No response";

    return NextResponse.json({
      queryResponse: responseContent,
      summary: `Summary of ${fileName}: ${responseContent.slice(0, 200)}...`, // Mock summary for testing
    });
  } catch (error) {
    console.error("Grok API error:", error);
    return NextResponse.json({ error: "API request failed" }, { status: 500 });
  }
}

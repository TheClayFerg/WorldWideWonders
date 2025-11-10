import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const { location } = await req.json();

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful geography assistant for a GeoGuessr-style game. Give short, fun hints about the player's location without revealing the answer. Make it sound conversational and playful.",
      },
      {
        role: "user",
        content: `The player is looking at this location: ${location}. Give one short, fun hint.`,
      },
    ],
  });

  const reply = completion.choices[0].message.content.trim();

  return new Response(JSON.stringify({ reply }), {
    headers: { "Content-Type": "application/json" },
  });
}
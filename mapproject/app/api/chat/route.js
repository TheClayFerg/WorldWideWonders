import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
    const { location } = await req.json();

    const prompt = `
  You are a helpful geography assistant for a GeoGuessr-style game.
  The player is looking at this location: ${location}.
  Give a short, fun hint that helps the player guess the country or landmark,
  but don’t reveal the exact answer.
  Make it sound conversational and playful.
  `;

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini", 
        messages: [
            { role: "system", content: "You give playful geography hints for GeoGuessr players." },
            { role: "user", content: prompt },
        ],
    });

    const reply = completion.choices[0].message.content;
    return new Response(JSON.stringify({ reply }), {
        headers: { "Content-Type": "application/json" },
    });
}

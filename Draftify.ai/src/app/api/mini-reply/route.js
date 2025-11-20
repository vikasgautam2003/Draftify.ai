import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { message } = await req.json();

    const llamaPrompt = `
        You are an elegant, friendly AI assistant. 
        Your style: warm, classy, polite, and always under 15 words.
        No code. No emojis unless it fits naturally.
        Offer short waiter-like responses.

        User said: "${message}"

        Respond in a charming short sentence:
        `;

    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: "Elegant assistant for short replies." },
          { role: "user", content: llamaPrompt }
        ],
        temperature: 0.7,
        max_tokens: 50,
      }),
    });

    const data = await groqRes.json();

    const reply = data.choices?.[0]?.message?.content || "Certainly, give me a moment.";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Mini Reply API Error:", err);
    return NextResponse.json({ reply: "One moment, please…" });
  }
}

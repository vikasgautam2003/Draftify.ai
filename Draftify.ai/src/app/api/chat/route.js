// import { GoogleGenerativeAI } from "@google/generative-ai";

// export const maxDuration = 60;

// export async function POST(req) {
//   try {
//     const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);
//     const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

//     const { prompt } = await req.json();

//     const systemPrompt = `
//       You are an expert React developer.
//       Your goal is to generate a SINGLE React component based on the user's request.
      
//       RULES:
//       1. ONLY return the code. Do not explain. Do not say "Here is the code".
//       2. Use 'lucide-react' for icons.
//       3. Use 'tailwindcss' for styling.
//       4. The component must be the default export.
//       5. Do not import external libraries besides 'lucide-react' and standard React hooks.
//     `;

//     const result = await model.generateContentStream(`${systemPrompt}\n\nUser Request: ${prompt}`);

//     const stream = new ReadableStream({
//       async start(controller) {
//         const encoder = new TextEncoder();
//         try {
//           for await (const chunk of result.stream) {
//             const chunkText = chunk.text();
//             if (chunkText) controller.enqueue(encoder.encode(chunkText));
//           }
//         } catch (err) {
//           controller.error(err);
//         } finally {
//           controller.close();
//         }
//       },
//     });

//     return new Response(stream, {
//       headers: { "Content-Type": "text/plain; charset=utf-8" },
//     });

//   } catch (error) {
//     return new Response(JSON.stringify({ error: error.message }), { status: 500 });
//   }
// }




// import { GoogleGenerativeAI } from "@google/generative-ai";

// export const maxDuration = 60;

// export async function POST(req) {
//   try {
//     const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);
//     const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

//     const { messages } = await req.json();

//     const systemPrompt = `
//       You are an expert React developer.
//       Your goal is to generate a SINGLE React component based on the user's request.
      
//       RULES:
//       1. ONLY return the code. Do not explain. Do not say "Here is the code".
//       2. Use 'lucide-react' for icons.
//       3. Use 'tailwindcss' for styling.
//       4. The component must be the default export.
//       5. Do not import external libraries besides 'lucide-react' and standard React hooks.
//       6. If the user asks to "change" or "fix" something, output the COMPLETE updated code, not just the diff.
//     `;

//     const conversationHistory = messages
//       .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
//       .join("\n\n");

//     const finalPrompt = `${systemPrompt}\n\nHistory:\n${conversationHistory}\n\nAssistant (Output Code Only):`;

//     const result = await model.generateContentStream(finalPrompt);

//     const stream = new ReadableStream({
//       async start(controller) {
//         const encoder = new TextEncoder();
//         try {
//           for await (const chunk of result.stream) {
//             const chunkText = chunk.text();
//             if (chunkText) controller.enqueue(encoder.encode(chunkText));
//           }
//         } catch (err) {
//           controller.error(err);
//         } finally {
//           controller.close();
//         }
//       },
//     });

//     return new Response(stream, {
//       headers: { "Content-Type": "text/plain; charset=utf-8" },
//     });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: error.message }), { status: 500 });
//   }
// }



// import { GoogleGenerativeAI } from "@google/generative-ai";

// export const maxDuration = 60;

// export async function POST(req) {
//   try {
//     // 1. Parse the request body
//     const body = await req.json();
    
//     // 2. Handle both cases: 'messages' (Phase 3) or 'prompt' (Phase 2)
//     // This makes the backend robust regardless of which frontend you are using.
//     let userRequest = "";
    
//     if (body.messages && Array.isArray(body.messages)) {
//       // Extract the last message content from the history
//       const lastMessage = body.messages[body.messages.length - 1];
//       userRequest = lastMessage.content;
      
//       // Optional: You can append previous context here if you want full memory
//       // const fullHistory = body.messages.map(m => `${m.role}: ${m.content}`).join('\n');
//     } else if (body.prompt) {
//       userRequest = body.prompt;
//     } else {
//       throw new Error("Invalid request body: Missing 'messages' or 'prompt'");
//     }

//     // 3. Initialize Google Client
//     const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);
//     const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

//     // 4. System Prompt
//     const systemPrompt = `
//       You are an expert React developer.
//       Your goal is to generate a SINGLE React component based on the user's request.
      
//       AVAILABLE LIBRARIES:
//       - lucide-react (icons): import { Home } from 'lucide-react'
//       - recharts (charts): import { LineChart, XAxis, ... } from 'recharts'
//       - framer-motion (animation): import { motion } from 'framer-motion'
//       - tailwindcss (styling): use className="..."
      
//       RULES:
//       1. ONLY return the code. Do not explain.
//       2. The component must be the default export.
//       3. ALWAYS imports libraries at the top.
//       4. If the user request is "undefined", generate a cool "Welcome to AI Builder" dashboard component.
//     `;

    
//     const result = await model.generateContentStream(`${systemPrompt}\n\nUser Request: ${userRequest}`);

//     // 6. Create Web Stream
//     const stream = new ReadableStream({
//       async start(controller) {
//         const encoder = new TextEncoder();
//         try {
//           for await (const chunk of result.stream) {
//             const chunkText = chunk.text();
//             if (chunkText) {
//               controller.enqueue(encoder.encode(chunkText));
//             }
//           }
//         } catch (err) {
//           console.error("Stream Error:", err);
//           controller.error(err);
//         } finally {
//           controller.close();
//         }
//       },
//     });

//     return new Response(stream, {
//       headers: { "Content-Type": "text/plain; charset=utf-8" },
//     });

//   } catch (error) {
//     console.error("API Error:", error);
//     return new Response(JSON.stringify({ error: error.message }), { status: 500 });
//   }
// }










import { GoogleGenerativeAI } from "@google/generative-ai";
import { SYSTEM_PROMPT } from "@/lib/system-prompt";

export const maxDuration = 60;

export async function POST(req) {
  try {
    const body = await req.json();
    let userRequest = "";
    
    if (body.messages && Array.isArray(body.messages)) {
      const lastMessage = body.messages[body.messages.length - 1];
      userRequest = lastMessage.content;
    } else if (body.prompt) {
      userRequest = body.prompt;
    } else {
      throw new Error("Invalid request body: Missing 'messages' or 'prompt'");
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

//     const systemPrompt = `
// You are an elite senior React engineer with mastery in modern UI development.
// You generate a SINGLE complete React component based strictly on the user's request.

// Your output must follow these strict requirements:

// GENERAL RULES:
// - Output ONLY code. No explanation. No markdown. No formatting blocks.
// - The component must be a valid React functional component.
// - The component must be the default export.
// - All required imports must be included at the top.
// - Code must be clean, efficient, modern, and production-ready.

// STYLING:
// - Use TailwindCSS utility classes for all styling.
// - Use clean spacing, alignment, flex/grid layouts when appropriate.
// - Always ensure mobile responsiveness unless user explicitly says otherwise.
// - Prefer modern UI patterns (glassmorphism, gradients, shadows, cards) when relevant.

// ICONS:
// - Use lucide-react icons when the user references buttons, alerts, UI elements, dashboards, menus, etc.
// - Import only the icons you use.

// ANIMATIONS:
// - Use framer-motion (motion.div, motion.button, variants) when the user requests animation, transitions, or dynamic UI.

// CHARTS:
// - Use Recharts for any requested graphs, charts, dashboards, or analytics UI.
// - Ensure chart container is responsive.
// - Import only required Recharts components.

// COMPONENT QUALITY:
// - Must be fully self-contained and runnable inside a Sandpack React environment.
// - No external libraries except:
//   - lucide-react
//   - framer-motion
//   - recharts
//   - tailwindcss (via className)
// - Never use libraries not explicitly allowed.
// - If the user asks for state interactions, use React hooks (useState, useEffect).
// - If the user asks for animations, apply smooth framer-motion transitions.
// - If the user asks for charts, construct a clean data array and responsive chart.

// EDGE CASE:
// - If the user provides an undefined or empty request, generate a beautiful futuristic "Welcome to Draftify.ai" dashboard component with animations and icons.

// REMINDER:
// Your final output must always be a SINGLE complete React component with clean, consistent code.
//     `;

    const result = await model.generateContentStream(
      `${SYSTEM_PROMPT}\n\nUser Request: ${userRequest}`
    );

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) controller.enqueue(encoder.encode(text));
          }
        } catch (err) {
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

"use client";

import { useState, useEffect, useRef } from "react";
import { Box, Loader2 } from "lucide-react";

import ChatSidebar from "../components/ChatSidebar";
import CodePlayground from "../components/CodePlayground";

const DEFAULT_CODE = `import { Sparkles } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-950 text-white px-6 text-center">
      
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="text-indigo-400" size={30} />
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          Draftify.ai
        </h1>
      </div>

      <p className="text-neutral-400 max-w-lg text-lg leading-relaxed">
        Your AI-powered workspace for generating clean, beautiful, production-ready React components.
      </p>

      <p className="text-xs text-neutral-600 mt-12">
        Powered by React • Tailwind • Shadcn • Lucide • Groq • Gemini
      </p>

    </div>
  );
}
`;

export default function Gen() {   // ← renamed component
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [streamingCode, setStreamingCode] = useState(DEFAULT_CODE);
  const [previewCode, setPreviewCode] = useState(DEFAULT_CODE);

  const [activeTab, setActiveTab] = useState("preview");
  const [fullscreen, setFullscreen] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const historyForApi = [...messages, userMessage];

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setActiveTab("code");
    setStreamingCode("// Initializing AI...\n");

    try {
      const miniReplyRes = await fetch("/api/mini-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const miniReplyData = await miniReplyRes.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: miniReplyData.reply },
      ]);

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: historyForApi }),
      });

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let accumulatedCode = "";

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          accumulatedCode += chunk;

          const cleanChunk = accumulatedCode
            .replace(/```jsx|```javascript|```js|```/g, "")
            .trim();

          setStreamingCode(cleanChunk || "// Waiting for code...");
        }
      }

      const finalCleanCode = accumulatedCode
        .replace(/```jsx|```javascript|```js|```/g, "")
        .trim();

      setPreviewCode(finalCleanCode);
      setStreamingCode(finalCleanCode);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Here is your component. Preview is ready ✔️",
        },
      ]);
    } catch (error) {
      console.error("Streaming error:", error);
      setStreamingCode(`// Error: ${error.message}`);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong." },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleTabClick(tab) {
    if (tab === "preview" && isLoading) return;
    setActiveTab(tab);
  }

  return (
    <div
      className={`h-screen flex flex-col bg-neutral-950 text-white ${
        fullscreen ? "overflow-hidden" : ""
      }`}
    >
      {!fullscreen && (
        <header className="h-14 border-b border-neutral-800 flex items-center px-6 gap-3 bg-neutral-900/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/20">
            <Box size={18} className="text-white" />
          </div>
          <span className="font-semibold tracking-tight">
            Draftify.ai{" "}
            <span className="text-neutral-500 font-normal ml-2 text-sm">
              First Edition
            </span>
          </span>
          <div className="ml-auto flex items-center gap-2 text-xs text-neutral-400 font-mono">
            {isLoading ? (
              <span className="text-blue-400 flex items-center gap-2">
                <Loader2 size={12} className="animate-spin" />
                Generating code...
              </span>
            ) : (
              <span>Ready</span>
            )}
          </div>
        </header>
      )}

      <div
        className={`flex-1 flex ${
          fullscreen ? "fixed inset-0 z-50 bg-black" : "overflow-hidden"
        }`}
      >
        {!fullscreen && (
          <ChatSidebar
            messages={messages}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
            handleSubmit={handleSubmit}
            messagesEndRef={messagesEndRef}
          />
        )}

        <CodePlayground
          previewCode={previewCode}
          streamingCode={streamingCode}
          activeTab={activeTab}
          handleTabClick={handleTabClick}
          isLoading={isLoading}
          fullscreen={fullscreen}
          setFullscreen={setFullscreen}
        />
      </div>
    </div>
  );
}

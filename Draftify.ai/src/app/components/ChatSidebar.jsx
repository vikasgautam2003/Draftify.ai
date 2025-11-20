import { User, Sparkles, Loader2, Send } from "lucide-react";

export default function ChatSidebar({
  messages,
  input,
  setInput,
  isLoading,
  handleSubmit,
  messagesEndRef,
}) {
  return (
    <div className="w-[380px] min-w-[320px] flex flex-col border-r border-neutral-800 bg-neutral-900/60 backdrop-blur">
      <div className="h-12 border-b border-neutral-800 flex items-center px-4 gap-2 text-xs text-neutral-400">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span>Chat</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.length === 0 && (
          <div className="text-center text-neutral-500 mt-10 text-sm">
            <p>Describe a component you want to build.</p>
            <p className="mt-1 text-xs opacity-70">
              e.g. &quot;A glassmorphism login card with error state&quot;
            </p>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex gap-3 ${
              msg.role === "user" ? "flex-row-reverse" : ""
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                msg.role === "user"
                  ? "bg-white text-black"
                  : "bg-blue-600 text-white"
              }`}
            >
              {msg.role === "user" ? (
                <User size={16} />
              ) : (
                <Sparkles size={16} />
              )}
            </div>
            <div
              className={`px-3 py-2 rounded-2xl text-xs sm:text-sm max-w-[75%] break-words ${
                msg.role === "user"
                  ? "bg-white text-black"
                  : "bg-neutral-800 text-gray-100"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 border-t border-neutral-800 bg-neutral-900">
        <form onSubmit={handleSubmit} className="flex gap-2 items-center">
          <input
            className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/60 placeholder:text-neutral-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your component..."
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Send size={16} />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

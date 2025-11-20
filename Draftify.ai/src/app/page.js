





// "use client";

// import { useState, useEffect, useRef } from "react";
// import {
//   SandpackProvider,
//   SandpackLayout,
//   SandpackPreview,
//   SandpackCodeEditor,
// } from "@codesandbox/sandpack-react";
// import { Box, Send, Play, Loader2, Eye, Code, Maximize2, X } from "lucide-react";

// const DEFAULT_CODE = `import { Play } from 'lucide-react';

// export default function App() {
//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-white text-black">
//       <h1 className="text-3xl font-bold mb-4">Ready to Build</h1>
//       <p className="text-gray-500">Enter a prompt to generate a component...</p>
//       <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded flex gap-2 items-center hover:bg-blue-700 transition-colors">
//         <Play size={16} /> Demo Button
//       </button>
//     </div>
//   );
// }`;

// export default function Home() {
//   const [input, setInput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [streamingCode, setStreamingCode] = useState(DEFAULT_CODE);
//   const [previewCode, setPreviewCode] = useState(DEFAULT_CODE);
//   const [activeTab, setActiveTab] = useState("preview");
//   const [fullscreen, setFullscreen] = useState(false);

//   const codeViewRef = useRef(null);
//   useEffect(() => {
//     if (codeViewRef.current) {
//       codeViewRef.current.scrollTop = codeViewRef.current.scrollHeight;
//     }
//   }, [streamingCode]);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     if (!input.trim()) return;

//     setIsLoading(true);
//     const newMessages = [...messages, { role: "user", content: input }];
//     setMessages(newMessages);
//     setStreamingCode("// AI is thinking...");

//     try {
//       const response = await fetch("/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ messages: newMessages }),
//       });

//       if (!response.body) throw new Error("No response body");

//       const reader = response.body.getReader();
//       const decoder = new TextDecoder();
//       let done = false;
//       let accumulatedCode = "";

//       while (!done) {
//         const { value, done: finished } = await reader.read();
//         done = finished;

//         if (value) {
//           const chunk = decoder.decode(value, { stream: true });
//           accumulatedCode += chunk;

//           const cleanChunk = accumulatedCode
//             .replace(/```jsx/g, "")
//             .replace(/```javascript/g, "")
//             .replace(/```js/g, "")
//             .replace(/```/g, "")
//             .trim();

//           setStreamingCode(cleanChunk);
//         }
//       }

//       const finalCleanCode = accumulatedCode
//         .replace(/```jsx/g, "")
//         .replace(/```javascript/g, "")
//         .replace(/```js/g, "")
//         .replace(/```/g, "")
//         .trim();

//       setMessages((prev) => [...prev, { role: "assistant", content: finalCleanCode }]);
//       setPreviewCode(finalCleanCode);
//     } catch (error) {
//       setStreamingCode(`// Error: ${error.message}`);
//     } finally {
//       setIsLoading(false);
//       setInput("");
//     }
//   }

//   return (
//     <div className={`h-screen flex flex-col bg-neutral-950 text-white ${fullscreen ? "overflow-hidden" : ""}`}>
//       {!fullscreen && (
//         <header className="h-14 border-b border-neutral-800 flex items-center px-6 gap-3 bg-neutral-900/50 backdrop-blur-sm sticky top-0 z-10">
//           <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/20">
//             <Box size={18} className="text-white" />
//           </div>
//           <span className="font-semibold tracking-tight">
//             Draftify.ai <span className="text-neutral-500 font-normal ml-2 text-sm">Raw Edition</span>
//           </span>
//           {isLoading && (
//             <div className="ml-auto flex items-center gap-2 text-xs text-blue-400 animate-pulse">
//               <Loader2 size={14} className="animate-spin" />
//               Generating...
//             </div>
//           )}
//         </header>
//       )}

//       <div className={`flex-1 flex ${fullscreen ? "fixed inset-0 z-50 bg-black" : "overflow-hidden"}`}>
//         {!fullscreen && (
//           <div className="w-1/3 border-r border-neutral-800 bg-neutral-900/50 flex flex-col p-4 gap-4 min-w-[350px]">
//             <div className="flex-1 bg-neutral-950 rounded-xl border border-neutral-800 p-4 overflow-hidden flex flex-col shadow-inner">
//               <div className="flex justify-between items-center mb-2 border-b border-neutral-800 pb-2">
//                 <p className="text-neutral-500 text-xs font-mono flex items-center gap-2">
//                   <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
//                   Code Stream
//                 </p>
//               </div>

//               <div ref={codeViewRef} className="flex-1 overflow-auto custom-scrollbar">
//                 <pre className="text-xs text-green-400 font-mono whitespace-pre-wrap leading-relaxed">
//                   {streamingCode}
//                   {isLoading && (
//                     <span className="animate-pulse inline-block w-2 h-4 bg-green-400 ml-1 align-middle"></span>
//                   )}
//                 </pre>
//               </div>
//             </div>

//             <form
//               onSubmit={handleSubmit}
//               className="flex gap-2 bg-neutral-950 p-1.5 rounded-xl border border-neutral-800 shadow-2xl"
//             >
//               <input
//                 className="flex-1 bg-transparent border-none px-3 py-2 text-sm focus:outline-none text-white placeholder:text-neutral-600"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 placeholder="e.g. A red login card..."
//                 disabled={isLoading}
//               />
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-10 h-10 bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-900/20"
//               >
//                 <Send size={18} />
//               </button>
//             </form>
//           </div>
//         )}

//         <div className="flex-1 bg-neutral-950 flex flex-col h-full relative">
//           <SandpackProvider
//             template="react"
//             theme="dark"
//             files={{ "/App.js": previewCode }}
//             customSetup={{
//               dependencies: {
//                 "lucide-react": "latest",
//                 "recharts": "2.9.0",
//                 "framer-motion": "10.16.4",
//                 "clsx": "latest",
//                 "tailwind-merge": "latest",
//               },
//             }}
//             options={{
//               externalResources: ["https://cdn.tailwindcss.com"],
//               classes: {
//                 "sp-wrapper": "h-full",
//                 "sp-layout": "h-full",
//                 "sp-stack": "h-full",
//               },
//             }}
//             style={{ height: "100%" }}
//           >
//             <SandpackLayout
//               style={{
//                 height: "100%",
//                 border: "none",
//                 borderRadius: 0,
//                 display: "flex",
//                 flexDirection: "column",
//               }}
//             >
//               <div className="w-full bg-neutral-900 border-b border-neutral-800 p-2 flex items-center justify-between shrink-0">
//                 <div className="flex gap-1 bg-black/20 p-1 rounded-lg">
//                   <button
//                     onClick={() => setActiveTab("preview")}
//                     className={`px-3 py-1 text-xs font-medium rounded-md transition-all flex items-center gap-2 ${
//                       activeTab === "preview"
//                         ? "bg-neutral-800 text-white shadow-sm"
//                         : "text-neutral-400 hover:text-white"
//                     }`}
//                   >
//                     <Eye size={14} /> Preview
//                   </button>
//                   <button
//                     onClick={() => setActiveTab("code")}
//                     className={`px-3 py-1 text-xs font-medium rounded-md transition-all flex items-center gap-2 ${
//                       activeTab === "code"
//                         ? "bg-neutral-800 text-white shadow-sm"
//                         : "text-neutral-400 hover:text-white"
//                     }`}
//                   >
//                     <Code size={14} /> Editor
//                   </button>
//                 </div>

//                 <button
//                   onClick={() => setFullscreen(!fullscreen)}
//                   className="px-3 py-1 text-xs flex items-center gap-2 rounded-md bg-neutral-800 text-white"
//                 >
//                   {fullscreen ? <X size={14} /> : <Maximize2 size={14} />}
//                   {fullscreen ? "Exit" : "Preview Mode"}
//                 </button>
//               </div>

//               <div className="flex-1 relative bg-white">
//                 <div
//                   className={`absolute inset-0 ${
//                     activeTab === "preview" ? "opacity-100 z-10" : "opacity-0 z-0"
//                   }`}
//                 >
//                   <SandpackPreview
//                     style={{ height: "100%" }}
//                     showOpenInCodeSandbox={false}
//                     showRefreshButton={false}
//                   />
//                 </div>

//                 <div
//                   className={`absolute inset-0 ${
//                     activeTab === "code" ? "opacity-100 z-10" : "opacity-0 z-0"
//                   }`}
//                 >
//                   <SandpackCodeEditor
//                     style={{ height: "100%" }}
//                     showTabs={false}
//                     showLineNumbers={true}
//                     showInlineErrors={true}
//                     wrapContent
//                   />
//                 </div>
//               </div>
//             </SandpackLayout>
//           </SandpackProvider>
//         </div>
//       </div>
//     </div>
//   );
// }





// "use client";

// import { useState, useEffect, useRef } from "react";
// import {
//   SandpackProvider,
//   SandpackLayout,
//   SandpackPreview,
//   SandpackCodeEditor,
// } from "@codesandbox/sandpack-react";
// import {
//   Box,
//   Send,
//   Play,
//   Loader2,
//   Eye,
//   Code,
//   Maximize2,
//   X,
//   User,
//   Sparkles,
// } from "lucide-react";

// const DEFAULT_CODE = `import { Play } from 'lucide-react';

// export default function App() {
//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-white text-black">
//       <h1 className="text-3xl font-bold mb-4">Ready to Build</h1>
//       <p className="text-gray-500">Enter a prompt to generate a component...</p>
//       <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded flex gap-2 items-center hover:bg-blue-700 transition-colors">
//         <Play size={16} /> Demo Button
//       </button>
//     </div>
//   );
// }`;

// export default function Home() {
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const [streamingCode, setStreamingCode] = useState(DEFAULT_CODE);
//   const [previewCode, setPreviewCode] = useState(DEFAULT_CODE);

//   const [activeTab, setActiveTab] = useState("preview");
//   const [fullscreen, setFullscreen] = useState(false);

//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     if (!input.trim()) return;

//     const userMessage = { role: "user", content: input };
//     const historyForApi = [...messages, userMessage];

//     setMessages((prev) => [
//       ...prev,
//       userMessage,
//       { role: "assistant", content: "Sure! Generating that for you..." },
//     ]);

//     setInput("");
//     setIsLoading(true);
//     setActiveTab("code");
//     setStreamingCode("// Initializing AI...\n");

//     try {
//       const response = await fetch("/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ messages: historyForApi }),
//       });

//       if (!response.body) throw new Error("No response body");

//       const reader = response.body.getReader();
//       const decoder = new TextDecoder();
//       let done = false;
//       let accumulatedCode = "";

//       while (!done) {
//         const { value, done: doneReading } = await reader.read();
//         done = doneReading;

//         if (value) {
//           const chunk = decoder.decode(value, { stream: true });
//           accumulatedCode += chunk;

//           const cleanChunk = accumulatedCode
//             .replace(/```jsx/g, "")
//             .replace(/```javascript/g, "")
//             .replace(/```js/g, "")
//             .replace(/```/g, "")
//             .trim();

//           setStreamingCode(cleanChunk || "// Waiting for code...");
//         }
//       }

//       const finalCleanCode = accumulatedCode
//         .replace(/```jsx/g, "")
//         .replace(/```javascript/g, "")
//         .replace(/```js/g, "")
//         .replace(/```/g, "")
//         .trim();

//       if (finalCleanCode) {
//         setPreviewCode(finalCleanCode);
//         setStreamingCode(finalCleanCode);
//       }

//       setMessages((prev) => {
//         if (prev.length === 0) return prev;
//         const withoutThinking = prev.slice(0, -1);
//         return [
//           ...withoutThinking,
//           { role: "assistant", content: "Here is your component. Preview is ready ✅" },
//         ];
//       });
//     } catch (error) {
//       console.error("Streaming error:", error);
//       setStreamingCode(`// Error: ${error.message}`);
//       setMessages((prev) => [
//         ...prev,
//         { role: "assistant", content: "Sorry, something went wrong." },
//       ]);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   function handleTabClick(tab) {
//     if (tab === "preview" && isLoading) return;
//     setActiveTab(tab);
//   }

//   return (
//     <div
//       className={`h-screen flex flex-col bg-neutral-950 text-white ${
//         fullscreen ? "overflow-hidden" : ""
//       }`}
//     >
//       {!fullscreen && (
//         <header className="h-14 border-b border-neutral-800 flex items-center px-6 gap-3 bg-neutral-900/50 backdrop-blur-sm sticky top-0 z-10">
//           <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/20">
//             <Box size={18} className="text-white" />
//           </div>
//           <span className="font-semibold tracking-tight">
//             Draftify.ai{" "}
//             <span className="text-neutral-500 font-normal ml-2 text-sm">
//               Raw Edition
//             </span>
//           </span>
//           <div className="ml-auto flex items-center gap-2 text-xs text-neutral-400 font-mono">
//             {isLoading ? (
//               <span className="text-blue-400 flex items-center gap-2">
//                 <Loader2 size={12} className="animate-spin" />
//                 Generating code...
//               </span>
//             ) : (
//               <span>Ready</span>
//             )}
//           </div>
//         </header>
//       )}

//       <div
//         className={`flex-1 flex ${
//           fullscreen ? "fixed inset-0 z-50 bg-black" : "overflow-hidden"
//         }`}
//       >
//         {!fullscreen && (
//           <div className="w-[380px] min-w-[320px] flex flex-col border-r border-neutral-800 bg-neutral-900/60 backdrop-blur">
//             <div className="h-12 border-b border-neutral-800 flex items-center px-4 gap-2 text-xs text-neutral-400">
//               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
//               <span>Chat</span>
//             </div>

//             <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
//               {messages.length === 0 && (
//                 <div className="text-center text-neutral-500 mt-10 text-sm">
//                   <p>Describe a component you want to build.</p>
//                   <p className="mt-1 text-xs opacity-70">
//                     e.g. &quot;A glassmorphism login card with error state&quot;
//                   </p>
//                 </div>
//               )}

//               {messages.map((msg, idx) => (
//                 <div
//                   key={idx}
//                   className={`flex gap-3 ${
//                     msg.role === "user" ? "flex-row-reverse" : ""
//                   }`}
//                 >
//                   <div
//                     className={`w-8 h-8 rounded-full flex items-center justify-center ${
//                       msg.role === "user"
//                         ? "bg-white text-black"
//                         : "bg-blue-600 text-white"
//                     }`}
//                   >
//                     {msg.role === "user" ? (
//                       <User size={16} />
//                     ) : (
//                       <Sparkles size={16} />
//                     )}
//                   </div>
//                   <div
//                     className={`px-3 py-2 rounded-2xl text-xs sm:text-sm max-w-[75%] break-words ${
//                       msg.role === "user"
//                         ? "bg-white text-black"
//                         : "bg-neutral-800 text-gray-100"
//                     }`}
//                   >
//                     {msg.content}
//                   </div>
//                 </div>
//               ))}
//               <div ref={messagesEndRef} />
//             </div>

//             <div className="p-3 border-t border-neutral-800 bg-neutral-900">
//               <form onSubmit={handleSubmit} className="flex gap-2 items-center">
//                 <input
//                   className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/60 placeholder:text-neutral-500"
//                   value={input}
//                   onChange={(e) => setInput(e.target.value)}
//                   placeholder="Describe your component..."
//                   disabled={isLoading}
//                 />
//                 <button
//                   type="submit"
//                   disabled={isLoading || !input.trim()}
//                   className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//                 >
//                   {isLoading ? (
//                     <Loader2 size={16} className="animate-spin" />
//                   ) : (
//                     <Send size={16} />
//                   )}
//                 </button>
//               </form>
//             </div>
//           </div>
//         )}

//         <div className="flex-1 bg-neutral-950 flex flex-col h-full relative">
//           <SandpackProvider
//             template="react"
//             theme="dark"
//             files={{ "/App.js": previewCode }}
//             customSetup={{
//               dependencies: {
//                 "lucide-react": "latest",
//                 "recharts": "2.9.0",
//                 "framer-motion": "10.16.4",
//                 "clsx": "latest",
//                 "tailwind-merge": "latest",
//               },
//             }}
//             options={{
//               externalResources: ["https://cdn.tailwindcss.com"],
//               classes: {
//                 "sp-wrapper": "h-full",
//                 "sp-layout": "h-full",
//                 "sp-stack": "h-full",
//               },
//             }}
//             style={{ height: "100%" }}
//           >
//             <SandpackLayout
//               style={{
//                 height: "100%",
//                 border: "none",
//                 borderRadius: 0,
//                 display: "flex",
//                 flexDirection: "column",
//               }}
//             >
//               <div className="w-full bg-neutral-900 border-b border-neutral-800 p-2 flex items-center justify-between shrink-0">
//                 <div className="flex gap-1 bg-black/30 p-1 rounded-lg">
//                   <button
//                     onClick={() => handleTabClick("preview")}
//                     disabled={isLoading}
//                     className={`px-3 py-1 text-xs font-medium rounded-md flex items-center gap-2 transition-all ${
//                       activeTab === "preview"
//                         ? "bg-neutral-800 text-white shadow-sm"
//                         : "text-neutral-400 hover:text-white"
//                     } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
//                   >
//                     {isLoading ? <Loader2 size={12} className="animate-spin" /> : <Eye size={14} />}
//                     Preview
//                   </button>
//                   <button
//                     onClick={() => handleTabClick("code")}
//                     className={`px-3 py-1 text-xs font-medium rounded-md flex items-center gap-2 transition-all ${
//                       activeTab === "code"
//                         ? "bg-neutral-800 text-white shadow-sm"
//                         : "text-neutral-400 hover:text-white"
//                     }`}
//                   >
//                     <Code size={14} />
//                     Code
//                   </button>
//                 </div>

//                 <button
//                   onClick={() => setFullscreen((f) => !f)}
//                   className="px-3 py-1 text-xs flex items-center gap-2 rounded-md bg-neutral-800 text-white"
//                 >
//                   {fullscreen ? <X size={14} /> : <Maximize2 size={14} />}
//                   {fullscreen ? "Exit" : "Preview Mode"}
//                 </button>
//               </div>

//               <div className="flex-1 relative bg-white">
//                 <div
//                   className={`absolute inset-0 transition-opacity duration-200 ${
//                     activeTab === "preview"
//                       ? "opacity-100 pointer-events-auto"
//                       : "opacity-0 pointer-events-none"
//                   }`}
//                 >
//                   <SandpackPreview
//                     style={{ height: "100%" }}
//                     showOpenInCodeSandbox={false}
//                     showRefreshButton={false}
//                   />
//                 </div>

//                 <div
//                   className={`absolute inset-0 transition-opacity duration-200 ${
//                     activeTab === "code"
//                       ? "opacity-100 pointer-events-auto"
//                       : "opacity-0 pointer-events-none"
//                   }`}
//                 >
//                   {isLoading ? (
//                     <div className="h-full overflow-auto p-4 bg-neutral-950 text-green-400 font-mono text-xs sm:text-sm">
//                       <pre className="whitespace-pre-wrap">
//                         {streamingCode}
//                         <span className="animate-pulse inline-block w-2 h-4 bg-green-400 ml-1 align-middle" />
//                       </pre>
//                     </div>
//                   ) : (
//                     <SandpackCodeEditor
//                       style={{ height: "100%" }}
//                       showTabs={false}
//                       showLineNumbers={true}
//                       showInlineErrors={true}
//                       wrapContent
//                     />
//                   )}
//                 </div>
//               </div>
//             </SandpackLayout>
//           </SandpackProvider>
//         </div>
//       </div>
//     </div>
//   );
// }









// "use client";

// import { useState, useEffect, useRef } from "react";
// import { Box, Loader2 } from "lucide-react";

// import ChatSidebar from "./components/ChatSidebar";
// import CodePlayground from "./components/CodePlayground";
// import CodeValidatorModal from "./components/CodeValidatorModal";

// const DEFAULT_CODE = `import { Play } from 'lucide-react';

// export default function App() {
//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-white text-black">
//       <h1 className="text-3xl font-bold mb-4">Ready to Build</h1>
//       <p className="text-gray-500">Enter a prompt to generate a component...</p>
//       <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded flex gap-2 items-center hover:bg-blue-700 transition-colors">
//         <Play size={16} /> Demo Button
//       </button>
//     </div>
//   );
// }`;

// export default function Home() {
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const [isValidating, setIsValidating] = useState(false);


//   const [streamingCode, setStreamingCode] = useState(DEFAULT_CODE);
//   const [previewCode, setPreviewCode] = useState(DEFAULT_CODE);

//   const [activeTab, setActiveTab] = useState("preview");
//   const [fullscreen, setFullscreen] = useState(false);

//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

 
   


//   async function handleSubmit(e) {
//   e.preventDefault();
//   if (!input.trim()) return;

//   const userMessage = { role: "user", content: input };
//   const historyForApi = [...messages, userMessage];

//   setMessages((prev) => [...prev, userMessage]);
//   setInput("");
//   setIsLoading(true);
//   setActiveTab("code");
//   setStreamingCode("// Initializing AI...\n");

//   try {
    
//     const miniReplyRes = await fetch("/api/mini-reply", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ message: input }),
//     });

//     const miniReplyData = await miniReplyRes.json();

//     setMessages((prev) => [
//       ...prev,
//       { role: "assistant", content: miniReplyData.reply },
//     ]);

   
//     const response = await fetch("/api/chat", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ messages: historyForApi }),
//     });

//     if (!response.body) throw new Error("No response body");

//     const reader = response.body.getReader();
//     const decoder = new TextDecoder();
//     let done = false;
//     let accumulatedCode = "";

//     while (!done) {
//       const { value, done: doneReading } = await reader.read();
//       done = doneReading;

//       if (value) {
//         const chunk = decoder.decode(value, { stream: true });
//         accumulatedCode += chunk;

//         const cleanChunk = accumulatedCode
//           .replace(/```jsx/g, "")
//           .replace(/```javascript/g, "")
//           .replace(/```js/g, "")
//           .replace(/```/g, "")
//           .trim();

//         setStreamingCode(cleanChunk || "// Waiting for code...");
//       }
//     }

//     const finalCleanCode = accumulatedCode
//       .replace(/```jsx/g, "")
//       .replace(/```javascript/g, "")
//       .replace(/```js/g, "")
//       .replace(/```/g, "")
//       .trim();

//     if (finalCleanCode) {
//       setPreviewCode(finalCleanCode);
//       setStreamingCode(finalCleanCode);
//     }

//     setMessages((prev) => [
//       ...prev,
//       {
//         role: "assistant",
//         content: "Here is your component. Preview is ready ✔️",
//       },
//     ]);
//   } catch (error) {
//     console.error("Streaming error:", error);
//     setStreamingCode(`// Error: ${error.message}`);
//     setMessages((prev) => [
//       ...prev,
//       { role: "assistant", content: "Sorry, something went wrong." },
//     ]);
//   } finally {
//     setIsLoading(false);
//   }
// }











//   function handleTabClick(tab) {
//     if (tab === "preview" && isLoading) return;
//     setActiveTab(tab);
//   }

//   return (
//     <div
//       className={`h-screen flex flex-col bg-neutral-950 text-white ${
//         fullscreen ? "overflow-hidden" : ""
//       }`}
//     >
//       {!fullscreen && (
//         <header className="h-14 border-b border-neutral-800 flex items-center px-6 gap-3 bg-neutral-900/50 backdrop-blur-sm sticky top-0 z-10">
//           <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/20">
//             <Box size={18} className="text-white" />
//           </div>
//           <span className="font-semibold tracking-tight">
//             Draftify.ai{" "}
//             <span className="text-neutral-500 font-normal ml-2 text-sm">
//               First Edition
//             </span>
//           </span>
//           <div className="ml-auto flex items-center gap-2 text-xs text-neutral-400 font-mono">
//             {isLoading ? (
//               <span className="text-blue-400 flex items-center gap-2">
//                 <Loader2 size={12} className="animate-spin" />
//                 Generating code...
//               </span>
//             ) : (
//               <span>Ready</span>
//             )}
//           </div>
//         </header>
//       )}

//       <div
//         className={`flex-1 flex ${
//           fullscreen ? "fixed inset-0 z-50 bg-black" : "overflow-hidden"
//         }`}
//       >
//         {!fullscreen && (
//           <ChatSidebar
//             messages={messages}
//             input={input}
//             setInput={setInput}
//             isLoading={isLoading}
//             handleSubmit={handleSubmit}
//             messagesEndRef={messagesEndRef}
//           />
//         )}

//         <CodePlayground
//           previewCode={previewCode}
//           onValidateClick={validateCode}
//           streamingCode={streamingCode}
//           activeTab={activeTab}
//           handleTabClick={handleTabClick}
//           isLoading={isLoading}
//           fullscreen={fullscreen}
//           setFullscreen={setFullscreen}
//         />
       

//       </div>
     
//     </div>

     
//   );
// }






"use client";

import { useState, useEffect, useRef } from "react";
import { Box, Loader2 } from "lucide-react";

import ChatSidebar from "./components/ChatSidebar";
import CodePlayground from "./components/CodePlayground";

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

export default function Home() {
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

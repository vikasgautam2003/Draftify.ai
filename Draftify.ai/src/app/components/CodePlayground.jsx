// import {
//   SandpackProvider,
//   SandpackLayout,
//   SandpackPreview,
//   SandpackCodeEditor,
// } from "@codesandbox/sandpack-react";
// import { Eye, Code, Loader2, Maximize2, X } from "lucide-react";
// import CodeValidatorModal from "./CodeValidatorModal";

// export default function CodePlayground({
//   previewCode,
//   streamingCode,
//   activeTab,
//   errorLines, 
//   handleTabClick,
//   isLoading,
//   fullscreen,
//   setFullscreen,
//   onValidateClick,
// }) {
//   return (
//     <div className="flex-1 bg-neutral-950 flex flex-col h-full relative">
//       <SandpackProvider
//         template="react"
//         theme="dark"
//         files={{ "/App.js": previewCode }}
//         customSetup={{
//           dependencies: {
//             "lucide-react": "latest",
//             recharts: "2.9.0",
//             "framer-motion": "10.16.4",
//             clsx: "latest",
//             "tailwind-merge": "latest",
//           },
//         }}
//         options={{
//           externalResources: ["https://cdn.tailwindcss.com"],
//           classes: {
//             "sp-wrapper": "h-full",
//             "sp-layout": "h-full",
//             "sp-stack": "h-full",
//           },
//         }}
//         style={{ height: "100%" }}
//       >
//         <SandpackLayout
//           style={{
//             height: "100%",
//             border: "none",
//             borderRadius: 0,
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           <div className="w-full bg-neutral-900 border-b border-neutral-800 p-2 flex items-center justify-between shrink-0">
//             <div className="flex gap-1 bg-black/30 p-1 rounded-lg">
//               <button
//                 onClick={() => handleTabClick("preview")}
//                 disabled={isLoading}
//                 className={`px-3 py-1 text-xs font-medium rounded-md flex items-center gap-2 transition-all ${
//                   activeTab === "preview"
//                     ? "bg-neutral-800 text-white shadow-sm"
//                     : "text-neutral-400 hover:text-white"
//                 } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
//               >
//                 {isLoading ? (
//                   <Loader2 size={12} className="animate-spin" />
//                 ) : (
//                   <Eye size={14} />
//                 )}
//                 Preview
//               </button>
//               <button
//                 onClick={() => handleTabClick("code")}
//                 className={`px-3 py-1 text-xs font-medium rounded-md flex items-center gap-2 transition-all ${
//                   activeTab === "code"
//                     ? "bg-neutral-800 text-white shadow-sm"
//                     : "text-neutral-400 hover:text-white"
//                 }`}
//               >
//                 <Code size={14} />
//                 Code
//               </button>
//             </div>

//             <button
//               onClick={() => setFullscreen((f) => !f)}
//               className="px-3 py-1 text-xs flex items-center gap-2 rounded-md bg-neutral-800 text-white"
//             >
//               {fullscreen ? <X size={14} /> : <Maximize2 size={14} />}
//               {fullscreen ? "Exit" : "Preview Mode"}
//             </button>
//           </div>

//           <div className="flex-1 relative bg-white">
//             <div
//               className={`absolute inset-0 transition-opacity duration-200 ${
//                 activeTab === "preview"
//                   ? "opacity-100 pointer-events-auto"
//                   : "opacity-0 pointer-events-none"
//               }`}
//             >
//               <SandpackPreview
//                 style={{ height: "100%" }}
//                 showOpenInCodeSandbox={false}
//                 showRefreshButton={false}
//               />
//             </div>

//             <div
//               className={`absolute inset-0 transition-opacity duration-200 ${
//                 activeTab === "code"
//                   ? "opacity-100 pointer-events-auto"
//                   : "opacity-0 pointer-events-none"
//               }`}
//             >
//               {isLoading ? (
//                 <div className="h-full overflow-auto p-4 bg-neutral-950 text-green-400 font-mono text-xs sm:text-sm">
//                   <pre className="whitespace-pre-wrap">
//                     {streamingCode}
//                     <span className="animate-pulse inline-block w-2 h-4 bg-green-400 ml-1 align-middle" />
//                   </pre>
//                 </div>
//               ) : (
//                 <SandpackCodeEditor
//                   style={{ height: "100%" }}
//                   showTabs={false}
//                   showLineNumbers={true}
//                   showInlineErrors={true}
//                   wrapContent

//                   decorators={
//                       errorLines?.map((line) => ({
//                         line,
//                         className: "bg-red-500/20 border-l-4 border-red-500",
//                       })) || []
//                     }
//                 />
//               )}
//             </div>
//           </div>
//         </SandpackLayout>
//       </SandpackProvider>
//     </div>
//   );
// }















// import {
//   SandpackProvider,
//   SandpackLayout,
//   SandpackPreview,
//   SandpackCodeEditor,
// } from "@codesandbox/sandpack-react";
// import { Eye, Code, Loader2, Maximize2, X } from "lucide-react";

// import { SHADCN_KIT } from "@/lib/ui-kit";

// export default function CodePlayground({
//   previewCode,
//   streamingCode,
//   activeTab,
//   handleTabClick,
//   isLoading,
//   fullscreen,
//   setFullscreen,
// }) {
//   return (
//     <div className="flex-1 bg-neutral-950 flex flex-col h-full relative">
//       <SandpackProvider
//         template="react"
//         theme="dark"
//         files={{ 
//           "/App.js": previewCode,
//           "/components.js": { code: SHADCN_KIT, hidden: true },
             
//          }}
//         customSetup={{
//           dependencies: {
//             "lucide-react": "latest",
//             recharts: "2.9.0",
//             "framer-motion": "10.16.4",
//             clsx: "latest",
//             "tailwind-merge": "latest",
//           },
//         }}
//         options={{
//           externalResources: ["https://cdn.tailwindcss.com"],
//           classes: {
//             "sp-wrapper": "h-full",
//             "sp-layout": "h-full",
//             "sp-stack": "h-full",
//           },
//         }}
//         style={{ height: "100%" }}
//       >
//         <SandpackLayout
//           style={{
//             height: "100%",
//             border: "none",
//             borderRadius: 0,
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
         
//           <div className="w-full bg-neutral-900 border-b border-neutral-800 p-2 flex items-center justify-between shrink-0">
//             <div className="flex gap-1 bg-black/30 p-1 rounded-lg">
           
//               <button
//                 onClick={() => handleTabClick("preview")}
//                 disabled={isLoading}
//                 className={`px-3 py-1 text-xs font-medium rounded-md flex items-center gap-2 transition-all ${
//                   activeTab === "preview"
//                     ? "bg-neutral-800 text-white shadow-sm"
//                     : "text-neutral-400 hover:text-white"
//                 } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
//               >
//                 {isLoading ? (
//                   <Loader2 size={12} className="animate-spin" />
//                 ) : (
//                   <Eye size={14} />
//                 )}
//                 Preview
//               </button>

              
//               <button
//                 onClick={() => handleTabClick("code")}
//                 className={`px-3 py-1 text-xs font-medium rounded-md flex items-center gap-2 transition-all ${
//                   activeTab === "code"
//                     ? "bg-neutral-800 text-white shadow-sm"
//                     : "text-neutral-400 hover:text-white"
//                 }`}
//               >
//                 <Code size={14} />
//                 Code
//               </button>
//             </div>

           
//             <button
//               onClick={() => setFullscreen((f) => !f)}
//               className="px-3 py-1 text-xs flex items-center gap-2 rounded-md bg-neutral-800 text-white"
//             >
//               {fullscreen ? <X size={14} /> : <Maximize2 size={14} />}
//               {fullscreen ? "Exit" : "Preview Mode"}
//             </button>
//           </div>

      
//           <div className="flex-1 relative bg-white">
         
//             <div
//               className={`absolute inset-0 transition-opacity duration-200 ${
//                 activeTab === "preview"
//                   ? "opacity-100 pointer-events-auto"
//                   : "opacity-0 pointer-events-none"
//               }`}
//             >
//               <SandpackPreview
//                 style={{ height: "100%" }}
//                 showOpenInCodeSandbox={false}
//                 showRefreshButton={false}
//               />
//             </div>

            
//             <div
//               className={`absolute inset-0 transition-opacity duration-200 ${
//                 activeTab === "code"
//                   ? "opacity-100 pointer-events-auto"
//                   : "opacity-0 pointer-events-none"
//               }`}
//             >
//               {isLoading ? (
//                 <div className="h-full overflow-auto p-4 bg-neutral-950 text-green-400 font-mono text-xs sm:text-sm">
//                   <pre className="whitespace-pre-wrap">
//                     {streamingCode}
//                     <span className="animate-pulse inline-block w-2 h-4 bg-green-400 ml-1 align-middle" />
//                   </pre>
//                 </div>
//               ) : (
//                 <SandpackCodeEditor
//                   style={{ height: "100%" }}
//                   showTabs={false}
//                   showLineNumbers={true}
//                   showInlineErrors={true}
//                   wrapContent
//                 />
//               )}
//             </div>
//           </div>
//         </SandpackLayout>
//       </SandpackProvider>
//     </div>
//   );
// }





import {
  SandpackProvider,
  SandpackLayout,
  SandpackPreview,
  SandpackCodeEditor,
} from "@codesandbox/sandpack-react";
import { Eye, Code, Loader2, Maximize2, X, Copy, Download, ExternalLink } from "lucide-react";

import JSZip from "jszip";
import { SHADCN_KIT } from "@/lib/ui-kit";
import { useState } from "react";

export default function CodePlayground({
  previewCode,
  streamingCode,
  activeTab,
  handleTabClick,
  isLoading,
  fullscreen,
  setFullscreen,
}) {
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 1500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(previewCode);
    showToast("Copied!");
  };

  const handleDownloadZip = async () => {
    const zip = new JSZip();

    zip.file("App.js", previewCode);
    zip.file("components.js", SHADCN_KIT);

    const zipBlob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(zipBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "draftify-code.zip";
    link.click();
    URL.revokeObjectURL(url);

    showToast("ZIP Downloaded!");
  };

 

  return (
    <div className="flex-1 bg-neutral-950 flex flex-col h-full relative">
      {toast && (
        <div className="fixed top-4 right-4 z-[999] bg-neutral-800 text-white px-4 py-2 rounded-md shadow-lg animate-fade">
          {toast}
        </div>
      )}

      <SandpackProvider
        template="react"
        theme="dark"
        files={{
          "/App.js": previewCode,
          "/components.js": { code: SHADCN_KIT, hidden: true },
        }}
        customSetup={{
          dependencies: {
            "lucide-react": "latest",
            recharts: "2.9.0",
            "framer-motion": "10.16.4",
            clsx: "latest",
            "tailwind-merge": "latest",
          },
        }}
        options={{
          externalResources: ["https://cdn.tailwindcss.com"],
          classes: {
            "sp-wrapper": "h-full",
            "sp-layout": "h-full",
            "sp-stack": "h-full",
          },
        }}
        style={{ height: "100%" }}
      >
        <SandpackLayout
          style={{
            height: "100%",
            border: "none",
            borderRadius: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="w-full bg-neutral-900 border-b border-neutral-800 p-2 flex items-center justify-between shrink-0">
            <div className="flex gap-1 bg-black/30 p-1 rounded-lg">
              <button
                onClick={() => handleTabClick("preview")}
                disabled={isLoading}
                className={`px-3 py-1 text-xs font-medium rounded-md flex items-center gap-2 transition-all ${
                  activeTab === "preview"
                    ? "bg-neutral-800 text-white shadow-sm"
                    : "text-neutral-400 hover:text-white"
                } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isLoading ? (
                  <Loader2 size={12} className="animate-spin" />
                ) : (
                  <Eye size={14} />
                )}
                Preview
              </button>

              <button
                onClick={() => handleTabClick("code")}
                className={`px-3 py-1 text-xs font-medium rounded-md flex items-center gap-2 transition-all ${
                  activeTab === "code"
                    ? "bg-neutral-800 text-white shadow-sm"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                <Code size={14} />
                Code
              </button>
            </div>

            <div className="flex items-center gap-2 mr-3">
              <button
                onClick={handleCopy}
                className="p-2 rounded-md bg-neutral-800 hover:bg-neutral-700 text-white"
              >
                <Copy size={14} />
              </button>

              <button
                onClick={handleDownloadZip}
                className="p-2 rounded-md bg-neutral-800 hover:bg-neutral-700 text-white"
              >
                <Download size={14} />
              </button>

             
            </div>

            <button
              onClick={() => setFullscreen((f) => !f)}
              className="px-3 py-1 text-xs flex items-center gap-2 rounded-md bg-neutral-800 text-white"
            >
              {fullscreen ? <X size={14} /> : <Maximize2 size={14} />}
              {fullscreen ? "Exit" : "Preview Mode"}
            </button>
          </div>

          <div className="flex-1 relative bg-white">
            <div
              className={`absolute inset-0 transition-opacity duration-200 ${
                activeTab === "preview"
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <SandpackPreview
                style={{ height: "100%" }}
                showOpenInCodeSandbox={false}
                showRefreshButton={false}
              />
            </div>

            <div
              className={`absolute inset-0 transition-opacity duration-200 ${
                activeTab === "code"
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              {isLoading ? (
                <div className="h-full overflow-auto p-4 bg-neutral-950 text-green-400 font-mono text-xs sm:text-sm">
                  <pre className="whitespace-pre-wrap">
                    {streamingCode}
                    <span className="animate-pulse inline-block w-2 h-4 bg-green-400 ml-1 align-middle" />
                  </pre>
                </div>
              ) : (
                <SandpackCodeEditor
                  style={{ height: "100%" }}
                  showTabs={false}
                  showLineNumbers={true}
                  showInlineErrors={true}
                  wrapContent
                />
              )}
            </div>
          </div>
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}

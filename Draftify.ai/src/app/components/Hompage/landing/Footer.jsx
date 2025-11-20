import { Cpu } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
            <Cpu className="text-white w-4 h-4" />
          </div>
          <span className="text-white font-bold">Draftify.ai</span>
        </div>

        <p className="text-gray-500 text-sm">© 2025 Draftify Inc.</p>

        <div className="flex gap-6 text-gray-500 text-sm">
          {["Twitter", "GitHub", "Discord"].map((x) => (
            <a key={x} className="hover:text-white">
              {x}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

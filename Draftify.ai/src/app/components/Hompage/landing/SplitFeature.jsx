import Badge from "../ui/Badge";
import Button from "../ui/Button";
import Card from "../ui/Card";
import { CheckCircle2, Sparkles, User } from "lucide-react";

export default function SplitFeature() {
  return (
    <section className="relative py-32 bg-black overflow-hidden">
      
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-indigo-500/20 blur-[140px] opacity-40" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-purple-500/20 blur-[160px] opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 px-6 relative z-10">
        
        <div>
          <Badge>Collaboration</Badge>

          <h2 className="text-5xl font-bold text-white mt-6 leading-tight">
            Collaborate With AI  
            <br />
            As You Build
          </h2>

          <p className="text-gray-300 mt-6 mb-10 text-lg leading-relaxed">
            Draftify lets you discuss features, adjust logic, and iterate on components 
            through a focused conversational workflow designed for real development.
          </p>

          <ul className="space-y-4">
            {[
              "Chat-driven refinement",
              "Instant component adjustments",
              "Clear reasoning and explanations"
            ].map((item) => (
              <li key={item} className="flex gap-3 text-gray-200 text-lg">
                <CheckCircle2 className="text-green-400" /> {item}
              </li>
            ))}
          </ul>

        
        </div>

        <div className="space-y-4">

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center">
              <User size={16} className="text-white/80" />
            </div>

            <Card className="flex-1 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-md">
              <p className="text-gray-200 text-sm leading-relaxed">
                Can you turn this section into a reusable component and make it responsive?
              </p>
              <p className="text-[11px] text-gray-500 mt-2">You • 1m ago</p>
            </Card>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>

            <Card className="flex-1 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-md">
              <p className="text-white text-sm font-medium">Draftify AI</p>
              <p className="text-[11px] text-gray-500 mb-3">Just now</p>

              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Done. I extracted it into a FeatureBlock component, added responsive styles, 
                and refreshed your preview.
              </p>

              <div className="text-xs bg-black/40 p-3 rounded-lg border border-white/5 text-gray-300 space-y-1">
                <p>• Component created</p>
                <p>• Responsive layout added</p>
                <p>• Styles optimized</p>
                <p>• Preview updated</p>
              </div>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
}

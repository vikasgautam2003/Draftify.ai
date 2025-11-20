import Link from "next/link";
import Button from "../ui/Button";

export default function CTA() {
  return (
    <section className="relative py-32 text-center bg-black overflow-hidden">

      <div className="absolute inset-0">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-indigo-600/25 blur-[150px] opacity-50" />
        <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-purple-500/20 blur-[160px] opacity-40" />
      </div>

      <div className="relative z-10">
        <h2 className="text-6xl md:text-7xl font-bold text-white mb-8 leading-tight">
          Ready to build the impossible?
        </h2>

        <p className="text-gray-300 text-xl mb-12 max-w-2xl mx-auto">
          Join thousands of developers accelerating their workflow with Draftify.
        </p>

        <Link href="/gen">
          <Button variant="glow" className="h-16 px-10 text-lg rounded-full">
            Start Building for Free
          </Button>
        </Link>
      </div>
    </section>
  );
}

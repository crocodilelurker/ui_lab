import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Layers, ArrowRight, Code2, Paintbrush } from "lucide-react";

function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-80px)] overflow-hidden">
      {/* Hero Section */}
      <section className="relative flex-1 flex flex-col items-center justify-center text-center px-6 py-20 md:py-32">
        {/* Background gradient blur */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] opacity-50 dark:opacity-20 animate-in fade-in duration-1000" />
        </div>

        <div className="max-w-4xl space-y-8 animate-in slide-in-from-bottom-8 fade-in duration-700">
          <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            Welcome to the Component Lab
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
            Build beautifully, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-purple-600">
              develop interactively.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Discover, customize, and share high-quality React components. Ui Lab is your community-driven playground for modern web development.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg rounded-full shadow-lg hover:shadow-primary/25 transition-all" asChild>
              <Link to="/components">
                Explore Marketplace <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg rounded-full border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800" asChild>
              <Link to="/about">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="bg-white/50 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800 py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center shadow-sm">
              <Layers className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold">Vast Component Library</h3>
            <p className="text-zinc-500 dark:text-zinc-400">Access a growing collection of community-submitted components ready for production.</p>
          </div>

          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center shadow-sm">
              <Paintbrush className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold">Interactive Customization</h3>
            <p className="text-zinc-500 dark:text-zinc-400">Tweak properties and watch the code update in real-time. No more guessing.</p>
          </div>

          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center shadow-sm">
              <Code2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold">Instant Export</h3>
            <p className="text-zinc-500 dark:text-zinc-400">Copy React code with Tailwind classes directly to your clipboard in one click.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

// A simple Badge component for the Home page hero (since we didn't import the Shadcn one directly here, we can define a quick inline one or import it)
function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      {children}
    </span>
  );
}

export default Home;
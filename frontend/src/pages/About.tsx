import { Card, CardContent } from "@/components/ui/card";
import { Layers, Zap, ShieldCheck, Code2 } from "lucide-react";

function About() {
  const features = [
    {
      title: "Interactive Playground",
      description: "Visually manipulate component properties in real-time and watch the code update before your eyes.",
      icon: <Zap className="w-6 h-6 text-amber-500" />,
    },
    {
      title: "Community Driven",
      description: "Submit your own React/Tailwind components and have them approved by admins for the whole community to use.",
      icon: <Layers className="w-6 h-6 text-blue-500" />,
    },
    {
      title: "Enterprise Architecture",
      description: "Built on a robust Spring Boot 3 backend with PostgreSQL and stateless JWT authentication.",
      icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
    },
    {
      title: "Export Ready",
      description: "Copy code directly to your clipboard or download fully functional JSX/TSX files.",
      icon: <Code2 className="w-6 h-6 text-purple-500" />,
    },
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center py-12 px-6">
      <div className="max-w-4xl w-full space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
            <Layers className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">About Ui Lab</h1>
          <p className="text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
            A full-stack, community-driven platform designed to discover, interact with, and customize high-quality React UI components.
          </p>
        </div>

        {/* Mission Section */}
        <Card className="border-none shadow-lg bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl">
          <CardContent className="p-8 md:p-12 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
              Ui Lab goes beyond a static gallery. It features an interactive Component Playground where users can visually manipulate component properties like size, color, and variants in real-time. We aim to bridge the gap between design and development by providing production-ready code that adapts to your needs instantly.
            </p>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default About;

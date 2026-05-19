import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Code2, ExternalLink, Layers, Copy, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LivePreview } from "@/components/LivePreview";
import toast from "react-hot-toast";

interface UIComponent {
  id?: number;
  title: string;
  description?: string;
  reactCode: string;
  status?: string;
}

function ComponentMarketplace() {
  const navigate = useNavigate();
  const [components, setComponents] = useState<UIComponent[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Submit state
  const [submitTitle, setSubmitTitle] = useState("");
  const [submitCode, setSubmitCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);

  useEffect(() => {
    fetchComponents();
  }, []);

  const fetchComponents = async () => {
    try {
      setLoading(true);
      const response = await api.get("/components");
      // Only display approved components or components with no status (backwards compatibility)
      const approvedList = response.data.filter((c: UIComponent) => c.status === "APPROVED" || !c.status);
      setComponents(approvedList);
    } catch (error) {
      console.error("Failed to fetch components", error);
      toast.error("Could not load components. Please ensure you are logged in.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = (code: string) => {
    if (!code) {
       toast.error("No code available to copy.");
       return;
    }
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard!");
  };

  const handleSubmitComponent = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to submit a component.");
      setIsSubmitDialogOpen(false);
      navigate("/login");
      return;
    }

    if (!submitTitle.trim() || !submitCode.trim()) {
      toast.error("Title and React Code are required.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await api.post("/components", {
        title: submitTitle,
        reactCode: submitCode,
        status: "PENDING" // As per README
      });

      if (response.status === 201) {
        toast.success("Component submitted successfully!");
        setIsSubmitDialogOpen(false);
        setSubmitTitle("");
        setSubmitCode("");
        fetchComponents(); // Refresh the list
      }
    } catch (error: any) {
      console.error("Submit error:", error);
      if (error.response?.status === 403) {
        toast.error("Access Denied: Only users with the USER role can submit components.");
      } else {
        toast.error(error.response?.data?.message || "Failed to submit component.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] p-4 md:p-10 bg-zinc-50 dark:bg-zinc-950 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <Badge variant="secondary" className="mb-2 text-primary bg-primary/10 hover:bg-primary/20 border-none">
              Marketplace
            </Badge>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">UI Components</h1>
            <p className="text-base md:text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl">
              Explore our collection of beautiful, reusable components built with Tailwind CSS and React.
            </p>
          </div>
          
          {/* Submit Component Dialog */}
          <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 shrink-0 w-full md:w-auto">
                <Plus className="w-4 h-4" />
                Submit Component
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800">
              <DialogHeader>
                <DialogTitle>Submit a New Component</DialogTitle>
                <DialogDescription>
                  Share your React component with the community. It will be reviewed by admins.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmitComponent} className="space-y-6 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Component Title</Label>
                  <Input 
                    id="title" 
                    placeholder="e.g. Modern Glassmorphism Card" 
                    value={submitTitle}
                    onChange={(e) => setSubmitTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="code">React Code (JSX/TSX)</Label>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">See sample below</span>
                  </div>
                  <Textarea 
                    id="code" 
                    placeholder="Paste your React component code here..." 
                    className="min-h-[150px] font-mono text-xs bg-zinc-50 dark:bg-zinc-900"
                    value={submitCode}
                    onChange={(e) => setSubmitCode(e.target.value)}
                  />
                  <div className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-3 text-xs space-y-1.5">
                    <div className="font-semibold text-zinc-700 dark:text-zinc-300">Expected Format:</div>
                    <pre className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400 overflow-x-auto whitespace-pre-wrap leading-normal">
{`import React from 'react';

export default function MyButton() {
  return (
    <button className="px-4 py-2 bg-primary text-white rounded">
      Click me
    </button>
  );
}`}
                    </pre>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsSubmitDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={submitting}>
                    {submitting ? "Submitting..." : "Submit for Review"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50">
                <CardHeader className="p-0">
                  <Skeleton className="h-48 w-full rounded-none" />
                </CardHeader>
                <CardContent className="p-5 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : components.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl bg-white/30 dark:bg-zinc-900/30 px-4">
            <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4">
              <Layers className="w-8 h-8 text-zinc-400" />
            </div>
            <h3 className="text-xl font-bold">No components found</h3>
            <p className="text-zinc-500 mt-2 max-w-sm">
              We couldn't find any components in the marketplace right now. Be the first to submit one!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {components.map((component) => (
              <Card 
                key={component.id} 
                className="group flex flex-col overflow-hidden border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader className="p-4 pb-0">
                  <LivePreview title={component.title} reactCode={component.reactCode} />
                </CardHeader>
                <CardContent className="p-5 pt-6 flex-1">
                  <CardTitle className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">
                    {component.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 text-zinc-600 dark:text-zinc-400">
                    {component.description || "A beautiful UI component ready to be dropped into your next project."}
                  </CardDescription>
                </CardContent>
                <CardFooter className="p-5 pt-0 flex gap-2 w-full">
                  
                  {/* View Code Dialog */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex-1 gap-2 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                        <Code2 className="w-4 h-4" /> Code
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[700px] bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800">
                      <DialogHeader className="flex flex-row items-center justify-between">
                        <div>
                          <DialogTitle className="text-xl">{component.title}</DialogTitle>
                          <DialogDescription>React component source code</DialogDescription>
                        </div>
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          className="gap-2"
                          onClick={() => handleCopyCode(component.reactCode)}
                        >
                          <Copy className="w-4 h-4" />
                          <span className="hidden sm:inline">Copy Code</span>
                        </Button>
                      </DialogHeader>
                      <div className="mt-4 rounded-md bg-zinc-950 overflow-hidden border border-zinc-800">
                        <div className="flex items-center px-4 py-2 bg-zinc-900 border-b border-zinc-800 text-xs text-zinc-400 font-mono">
                          {component.reactCode.includes("//") && component.reactCode.split("\n")[0].includes(".") 
                            ? component.reactCode.split("\n")[0].split(".").pop()?.trim().toLowerCase() 
                            : component.reactCode.includes("interface ") || component.reactCode.includes("type ") 
                              ? "tsx" 
                              : "jsx"}
                        </div>
                        <ScrollArea className="h-[400px] w-full rounded-md">
                          <pre className="p-4 text-sm font-mono text-zinc-300 whitespace-pre-wrap wrap-break-word">
                            <code>{component.reactCode || "// No code provided"}</code>
                          </pre>
                        </ScrollArea>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button variant="secondary" size="icon" className="shrink-0" title="Live Preview (Coming Soon)">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ComponentMarketplace;

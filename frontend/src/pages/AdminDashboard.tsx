import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LivePreview } from "@/components/LivePreview";
import { Layers, ShieldCheck, Check, Trash2, Code2, Copy, Clock, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface UIComponent {
  id: number;
  title: string;
  description?: string;
  reactCode: string;
  status: string;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [components, setComponents] = useState<UIComponent[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"pending" | "approved">("pending");

  useEffect(() => {
    // Verify user is an Admin
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Access denied. Please log in.");
      navigate("/login");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const rawRole = payload.role || payload.roles || [];
      let isAdmin = false;
      if (typeof rawRole === "string") {
        isAdmin = rawRole === "ROLE_ADMIN";
      } else if (Array.isArray(rawRole)) {
        isAdmin = rawRole.some((r: any) => {
          if (typeof r === "string") return r === "ROLE_ADMIN";
          if (r && typeof r === "object") return r.authority === "ROLE_ADMIN" || r.role === "ROLE_ADMIN";
          return false;
        });
      }
      
      if (!isAdmin) {
        toast.error("Access denied. Admin role required.");
        navigate("/components");
        return;
      }
    } catch (e) {
      toast.error("Invalid session. Please log in.");
      navigate("/login");
      return;
    }

    fetchComponents();
  }, [navigate]);

  const fetchComponents = async () => {
    try {
      setLoading(true);
      const response = await api.get("/components");
      setComponents(response.data);
    } catch (error) {
      console.error("Failed to load components", error);
      toast.error("Failed to fetch components list.");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: number) => {
    try {
      const response = await api.put(`/components/${id}/approve`);
      if (response.status === 200) {
        toast.success("Component approved successfully!");
        fetchComponents();
      }
    } catch (error) {
      console.error("Approval error:", error);
      toast.error("Failed to approve component.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to permanently delete/reject this component?")) {
      return;
    }

    try {
      const response = await api.delete(`/components/${id}`);
      if (response.status === 200) {
        toast.success("Component deleted successfully!");
        fetchComponents();
      }
    } catch (error) {
      console.error("Deletion error:", error);
      toast.error("Failed to delete component.");
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard!");
  };

  const pendingList = components.filter((c) => c.status === "PENDING");
  const approvedList = components.filter((c) => c.status === "APPROVED" || !c.status); // Default to approved if empty

  return (
    <div className="min-h-[calc(100vh-80px)] p-4 md:p-10 bg-zinc-50 dark:bg-zinc-950 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-none shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                Admin Console
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Review Components</h1>
            <p className="text-zinc-500 dark:text-zinc-400">
              Manage submitted user components. Approve them for public viewing or reject/delete.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Total Submitted
              </CardTitle>
              <Layers className="w-4 h-4 text-zinc-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? <Skeleton className="h-8 w-12" /> : components.length}</div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Pending Approvals
              </CardTitle>
              <Clock className="w-4 h-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-500">
                {loading ? <Skeleton className="h-8 w-12" /> : pendingList.length}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Approved Catalog
              </CardTitle>
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 dark:text-green-500">
                {loading ? <Skeleton className="h-8 w-12" /> : approvedList.length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-zinc-200 dark:border-zinc-800">
          <button
            onClick={() => setActiveTab("pending")}
            className={`px-6 py-3 font-semibold text-sm transition-all border-b-2 mb-[2px] ${
              activeTab === "pending"
                ? "border-primary text-zinc-900 dark:text-zinc-50"
                : "border-transparent text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
            }`}
          >
            Pending ({pendingList.length})
          </button>
          <button
            onClick={() => setActiveTab("approved")}
            className={`px-6 py-3 font-semibold text-sm transition-all border-b-2 mb-[2px] ${
              activeTab === "approved"
                ? "border-primary text-zinc-900 dark:text-zinc-50"
                : "border-transparent text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
            }`}
          >
            Approved ({approvedList.length})
          </button>
        </div>

        {/* Components Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 overflow-hidden">
                <CardHeader className="p-0">
                  <Skeleton className="h-48 w-full rounded-none" />
                </CardHeader>
                <CardContent className="p-5 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(activeTab === "pending" ? pendingList : approvedList).length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl bg-white/30 dark:bg-zinc-900/30 px-4">
                <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                  <Layers className="w-8 h-8 text-zinc-400" />
                </div>
                <h3 className="text-xl font-bold">No components found</h3>
                <p className="text-zinc-500 mt-2 max-w-sm">
                  {activeTab === "pending"
                    ? "Hooray! No pending components requiring review right now."
                    : "The approved catalog is currently empty."}
                </p>
              </div>
            ) : (
              (activeTab === "pending" ? pendingList : approvedList).map((component) => (
                <Card
                  key={component.id}
                  className="group flex flex-col overflow-hidden border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader className="p-4 pb-0">
                    <LivePreview title={component.title} reactCode={component.reactCode} />
                  </CardHeader>
                  
                  <CardContent className="p-5 pt-6 flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <CardTitle className="text-xl font-bold line-clamp-1">{component.title}</CardTitle>
                      <Badge
                        variant="secondary"
                        className={`text-[10px] uppercase font-bold border-none shrink-0 ${
                          component.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500"
                            : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500"
                        }`}
                      >
                        {component.status || "APPROVED"}
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {component.description || "A user-submitted component waiting in the moderation pipeline."}
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
                            <DialogDescription>React source code review</DialogDescription>
                          </div>
                          <Button variant="secondary" size="sm" className="gap-2" onClick={() => handleCopyCode(component.reactCode)}>
                            <Copy className="w-4 h-4" />
                            <span>Copy Code</span>
                          </Button>
                        </DialogHeader>
                        <div className="mt-4 rounded-md bg-zinc-950 overflow-hidden border border-zinc-800">
                          <ScrollArea className="h-[400px] w-full rounded-md">
                            <pre className="p-4 text-sm font-mono text-zinc-300 whitespace-pre-wrap wrap-break-word">
                              <code>{component.reactCode || "// No code provided"}</code>
                            </pre>
                          </ScrollArea>
                        </div>
                      </DialogContent>
                    </Dialog>

                    {/* Admin Actions */}
                    {component.status === "PENDING" ? (
                      <>
                        <Button
                          onClick={() => handleApprove(component.id)}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white gap-1"
                          title="Approve Component"
                        >
                          <Check className="w-4 h-4" />
                          Approve
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleDelete(component.id)}
                          className="shrink-0 px-3"
                          title="Reject Component"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(component.id)}
                        className="flex-1 gap-1"
                        title="Delete Component"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

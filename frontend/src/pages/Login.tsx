import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "@/lib/api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/auth/login", { username, password });
      const { token, message } = response.data;
      
      // Store the JWT token
      if (token) {
        localStorage.setItem("token", token);
        toast.success(message || "Login successful!");
        
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

          if (isAdmin) {
            navigate("/admin");
          } else {
            navigate("/components");
          }
        } catch (e) {
          navigate("/components");
        }
      } else {
        toast.error("Authentication failed. No token received.");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data || "Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-950 animate-in fade-in duration-700">
      <Card className="w-full max-w-md shadow-lg border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl">
        <CardHeader className="space-y-1 pb-6">
          <CardTitle className="text-3xl font-bold tracking-tight text-center">Welcome back</CardTitle>
          <CardDescription className="text-center text-zinc-500 dark:text-zinc-400">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input 
                id="username" 
                type="text" 
                placeholder="johndoe" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-zinc-50 dark:bg-zinc-950 border-zinc-300 dark:border-zinc-800 focus-visible:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-sm text-primary hover:underline font-medium">Forgot password?</a>
              </div>
              <Input 
                id="password" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-zinc-50 dark:bg-zinc-950 border-zinc-300 dark:border-zinc-800 focus-visible:ring-primary"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 pt-6">
            <Button type="submit" className="w-full font-semibold transition-all" disabled={loading}>
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Logging in...
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
            <div className="text-sm text-center text-zinc-500 dark:text-zinc-400">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline font-semibold">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default Login;
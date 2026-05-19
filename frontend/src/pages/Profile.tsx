import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Mail, User, ShieldCheck, Activity } from "lucide-react";
import toast from "react-hot-toast";

interface UserProfile {
  id: number;
  username: string;
  email: string;
  role?: string; // Adjust based on your actual DTO from backend
}

function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Fallback to 1 or current user id if no id is provided in URL, 
        // though typically /profile/me or extracting from token is preferred.
        // Assuming /api/users/{id} for this task
        const userId = id || "1"; 
        const response = await api.get(`/users/${userId}`);
        setProfile(response.data);
      } catch (error: any) {
        console.error("Failed to fetch profile", error);
        toast.error("Could not load profile. Make sure you are logged in.");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-950">
        <Card className="w-full max-w-lg shadow-lg">
          <CardHeader className="flex flex-col items-center space-y-4 pb-6">
            <Skeleton className="h-24 w-24 rounded-full" />
            <div className="space-y-2 flex flex-col items-center">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!profile) {
    return null; // or a not found state
  }

  const getInitials = (name: string) => {
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-950 animate-in slide-in-from-bottom-4 duration-700">
      <Card className="w-full max-w-lg shadow-xl border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl relative overflow-hidden">
        {/* Abstract background gradient decoration */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 dark:from-blue-600/30 dark:via-purple-600/30 dark:to-pink-600/30 z-0" />
        
        <CardHeader className="flex flex-col items-center space-y-4 pb-6 relative z-10 pt-16">
          <Avatar className="h-24 w-24 ring-4 ring-white dark:ring-zinc-900 shadow-lg">
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.username}`} alt={profile.username} />
            <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
              {getInitials(profile.username)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex flex-col items-center space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight flex items-center gap-2">
              {profile.username}
              {profile.role === 'ADMIN' && <ShieldCheck className="w-5 h-5 text-blue-500" />}
            </CardTitle>
            <CardDescription className="flex items-center gap-1.5 font-medium">
              <Mail className="w-4 h-4" />
              {profile.email}
            </CardDescription>
          </div>
          
          <div className="flex gap-2 mt-4">
            <Badge variant="secondary" className="font-medium bg-zinc-100 dark:bg-zinc-800">
              <User className="w-3 h-3 mr-1" />
              Member
            </Badge>
            <Badge variant="outline" className="font-medium border-emerald-200 text-emerald-700 dark:border-emerald-800 dark:text-emerald-400">
              <Activity className="w-3 h-3 mr-1" />
              Active
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="relative z-10 space-y-6 pt-6 border-t border-zinc-100 dark:border-zinc-800">
          <div className="grid gap-4">
            <div className="bg-white dark:bg-zinc-950 p-4 rounded-lg border border-zinc-100 dark:border-zinc-800 flex justify-between items-center transition-all hover:border-zinc-300 dark:hover:border-zinc-700">
              <div>
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Account ID</p>
                <p className="font-semibold font-mono text-zinc-900 dark:text-zinc-100">#{profile.id}</p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-zinc-950 p-4 rounded-lg border border-zinc-100 dark:border-zinc-800 transition-all hover:border-zinc-300 dark:hover:border-zinc-700">
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-2">Profile Details</p>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">Username</span>
                  <span className="text-sm font-medium">{profile.username}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">Email</span>
                  <span className="text-sm font-medium">{profile.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">Status</span>
                  <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Verified</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center text-xs text-zinc-400 dark:text-zinc-500 pt-2">
            Profile updates are currently disabled.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Profile;

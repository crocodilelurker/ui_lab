import './App.css';
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import { Link, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import Login from "../pages/Login";
import SignUp from '../pages/SignUp';
import Profile from '../pages/Profile';
import ComponentMarketplace from '../pages/ComponentMarketplace';
import { Toaster } from 'react-hot-toast';
import { Layers, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import About from '../pages/About';
import AdminDashboard from '../pages/AdminDashboard';

// Main layout wrapper
function MainLayout() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  
  let isAdmin = false;
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      console.log("Decoded JWT payload:", payload);
      const rawRole = payload.role || payload.roles || [];
      if (typeof rawRole === "string") {
        isAdmin = rawRole === "ROLE_ADMIN";
      } else if (Array.isArray(rawRole)) {
        isAdmin = rawRole.some((r: any) => {
          if (typeof r === "string") return r === "ROLE_ADMIN";
          if (r && typeof r === "object") return r.authority === "ROLE_ADMIN" || r.role === "ROLE_ADMIN";
          return false;
        });
      }
    } catch (e) {
      // ignore
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans">
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      
      {/* Modern Glassmorphism Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl transition-all">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          {/* Logo / Brand */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Layers className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-400">
              Ui Lab India
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                <NavigationMenuItem>
                  <Link to="/components">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Marketplace
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/about">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      About
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                {isAdmin && (
                  <NavigationMenuItem>
                    <Link to="/admin">
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Admin
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right side Auth / User Actions */}
          <div className="flex items-center space-x-4">
            {token ? (
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" asChild className="hidden sm:flex items-center gap-2">
                  <Link to="/profile/1">
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                </Button>
                <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link to="/signup">Get Started</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full relative">
        {/* Subtle background decoration */}
        <div className="absolute top-0 inset-x-0 h-[500px] bg-linear-to-b from-primary/5 to-transparent pointer-events-none -z-10" />
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile/:id?" element={<Profile />} />
        <Route path="/components" element={<ComponentMarketplace />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

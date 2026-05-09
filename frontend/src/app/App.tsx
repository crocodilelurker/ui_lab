
import './App.css'
import Home from "../pages/Home";
import NotFound from "../pages/NotFound"
import { Link, Outlet, Route, Routes } from 'react-router-dom'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
// we can serve one main layout 
function MainLayout() {
  return (
    <div>
      {/* need to make my nav bar */}
      <div className="flex justify-between px-10 py-4 h-[80px] ">
        {/* left-side */}
        <div className="text-xl font-bold ">
          <Link to="/" className="hover:text-gray-700 cursor-pointer transition-all duration-300">Ui Lab India</Link>
        </div>
        {/* right-side */}
        <div className="text-xl ">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink>Link</NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink>
                  <Link to="/about">About</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
function App() {

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App

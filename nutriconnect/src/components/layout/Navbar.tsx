import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary">NutriConnect</span>
          </Link>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          <Link to="/" className="text-foreground hover:text-primary">
            Home
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-foreground hover:text-primary">
                Dashboard
              </Link>
              <Link to="/meal-plans" className="text-foreground hover:text-primary">
                Meal Plans
              </Link>
              <Link to="/vitals" className="text-foreground hover:text-primary">
                Vitals
              </Link>
              <Link to="/messages" className="text-foreground hover:text-primary">
                Messages
              </Link>
              <Link to="/resources" className="text-foreground hover:text-primary">
                Resources
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User size={16} />
                    {user?.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to="/profile" className="flex w-full">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/settings" className="flex w-full">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link to="/resources" className="text-foreground hover:text-primary">
                Resources
              </Link>
              <Link to="/login" className="text-foreground hover:text-primary">
                Login
              </Link>
              <Link to="/register">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <Link to="/" className="block py-2 text-foreground hover:text-primary" onClick={toggleMenu}>
              Home
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="block py-2 text-foreground hover:text-primary" onClick={toggleMenu}>
                  Dashboard
                </Link>
                <Link to="/meal-plans" className="block py-2 text-foreground hover:text-primary" onClick={toggleMenu}>
                  Meal Plans
                </Link>
                <Link to="/vitals" className="block py-2 text-foreground hover:text-primary" onClick={toggleMenu}>
                  Vitals
                </Link>
                <Link to="/messages" className="block py-2 text-foreground hover:text-primary" onClick={toggleMenu}>
                  Messages
                </Link>
                <Link to="/resources" className="block py-2 text-foreground hover:text-primary" onClick={toggleMenu}>
                  Resources
                </Link>
                <Link to="/profile" className="block py-2 text-foreground hover:text-primary" onClick={toggleMenu}>
                  Profile
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                  className="flex w-full items-center py-2 text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/resources" className="block py-2 text-foreground hover:text-primary" onClick={toggleMenu}>
                  Resources
                </Link>
                <Link to="/login" className="block py-2 text-foreground hover:text-primary" onClick={toggleMenu}>
                  Login
                </Link>
                <Link to="/register" className="block py-2 text-foreground hover:text-primary" onClick={toggleMenu}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

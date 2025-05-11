"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, ShoppingBag, LayoutDashboard, User } from "lucide-react";
import { cn } from "@/lib/utils";
import CartModal from "./cart-modal";
import { signOut, getCurrentUser, AuthUser } from "@/lib/auth";
import { toast } from "sonner";
import { getCartItems } from "@/lib/cart";
import Logo from "./logo";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Header = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUserAndCart();
  }, []);

  const loadUserAndCart = async () => {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
      if (user) {
        const items = await getCartItems();
        setCartItems(items);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setCurrentUser(null);
      setCartItems([]);
      toast.success("Successfully logged out");
      router.push("/");
    } catch (error: any) {
      toast.error(error.message || "Failed to log out");
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white bg-opacity-95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-sm font-medium text-neutral-800 hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-neutral-800 hover:text-primary transition-colors"
            >
              About Us
            </Link>

            {/* Products Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="link"
                  className="text-sm font-medium text-neutral-800 hover:text-primary p-0 h-auto"
                >
                  Products
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-40">
                <DropdownMenuItem asChild>
                  <Link href="/products/textiles">Textiles</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/products/paintings">Paintings</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/contact"
              className="text-sm font-medium text-neutral-800 hover:text-primary transition-colors"
            >
              Contact
            </Link>

            {currentUser?.role === 'artisan' && (
              <Link
                href="/dashboard"
                className="text-sm font-medium text-neutral-800 hover:text-primary transition-colors flex items-center gap-1"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
            )}
          </nav>

          {/* Right side navigation (cart, login, etc.) */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser && (
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:text-primary"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            )}

            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="hover:text-primary">
                    <User className="h-5 w-5 mr-2" />
                    {currentUser.full_name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  {currentUser.role !== 'artisan' && (
                    <DropdownMenuItem asChild>
                      <Link href="/orders">My Orders</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">Login</Link>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="default" className="bg-primary hover:bg-primary/90">
                      Register
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem asChild>
                      <Link href="/register/customer">Customer</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/register/artisan">Artisan</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {currentUser && (
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:text-primary mr-2"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isMenuOpen ? "max-h-96 mt-4" : "max-h-0"
          )}
        >
          <nav className="flex flex-col space-y-4 py-4">
            <Link
              href="/"
              className="text-sm font-medium text-neutral-800 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-neutral-800 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <div className="space-y-2 pl-2">
              <p className="text-sm font-medium text-neutral-800">Products</p>
              <Link
                href="/products/textiles"
                className="text-sm text-neutral-700 hover:text-primary transition-colors block pl-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Textiles
              </Link>
              <Link
                href="/products/paintings"
                className="text-sm text-neutral-700 hover:text-primary transition-colors block pl-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Paintings
              </Link>
            </div>
            <Link
              href="/contact"
              className="text-sm font-medium text-neutral-800 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            {currentUser?.role === 'artisan' && (
              <Link
                href="/dashboard"
                className="text-sm font-medium text-neutral-800 hover:text-primary transition-colors flex items-center gap-1"
                onClick={() => setIsMenuOpen(false)}
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
            )}
            <div className="pt-2 flex flex-col space-y-3">
              {currentUser ? (
                <>
                  {currentUser.role !== 'artisan' && (
                    <Link
                      href="/orders"
                      className="text-sm font-medium text-neutral-800 hover:text-primary transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Orders
                    </Link>
                  )}
                  <Button 
                    variant="ghost" 
                    className="justify-start hover:text-primary"
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" className="justify-start hover:text-primary" asChild>
                    <Link href="/login">Login</Link>
                  </Button>
                  <div className="space-y-2 pl-2">
                    <p className="text-sm font-medium text-neutral-800">Register as</p>
                    <Link
                      href="/register/customer"
                      className="text-sm text-neutral-700 hover:text-primary transition-colors block pl-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Customer
                    </Link>
                    <Link
                      href="/register/artisan"
                      className="text-sm text-neutral-700 hover:text-primary transition-colors block pl-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Artisan
                    </Link>
                  </div>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>

      <CartModal open={isCartOpen} onOpenChange={setIsCartOpen} />
    </header>
  );
};

export default Header;
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Menu, Search, ShoppingCart, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

function Header({ isScrolled, page }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <motion.header
        className={`sticky top-0 z-50 bg-white/80 backdrop-blur-md transition-all duration-300 ${
          isScrolled ? "shadow-md py-2" : "py-4"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Brand Name  */}
          <Link href="/" className="text-2xl font-bold text-primary">
            CourseCloud
          </Link>
          {/* Navigation Content and search */}
          <div className="hidden w-full md:flex justify-center items-center space-x-6">
            <div className="relative group">
              <Input
                className="pl-10 pr-4 py-2 w-more rounded-full border-gray-300 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 transition-all duration-300"
                placeholder="Search for anything you want to learn over or under the clouds"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-primary transition-colors duration-300 w-4 h-4" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* Login / Signup button */}
            {page === "landing" && (
              <Button
                onClick={() => navigate("/login")}
                variant="ghost"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Login / Sign up
              </Button>
            )}
            {/* Add to card button with badge */}
            {page === "Home" && (
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/10 transition-colors relative"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </Button>
            )}
            {page === "Home" && (
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/10 transition-colors relative"
              >
                <Heart className="w-8 h-8" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </Button>
            )}
            {page === "Home" && (
              <Avatar>
                <AvatarImage
                  width={30}
                  height={30}
                  className="rounded-full"
                  src="https://res.cloudinary.com/dtc1xcil8/image/upload/v1730571309/openart-image_z-cDRKP9_1730556373858_raw_rpgts8.jpg"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            )}
            {/* Hamburger for mobile device naviagtion*/}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
        {/* mobile view navigation content */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ ease: [0.17, 0.67, 0.83, 0.67] }}
              className="xl:hidden rounded-b-lg mt-2 p-4"
            >
              <div className="relative mt-2">
                <Input
                  className="pl-10 pr-4 py-2 w-full rounded-full"
                  placeholder="Search for anything"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}

export default Header;

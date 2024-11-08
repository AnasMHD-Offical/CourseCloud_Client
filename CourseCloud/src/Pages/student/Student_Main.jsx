"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  GraduationCap,
  Heart,
  LayoutDashboard,
  LogOut,
  Medal,
  User,
} from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import Header from "@/Components/base/Header";
import Footer from "@/Components/base/Footer";

export default function Student_Main() {
  const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/dashboard/profile", icon: User, label: "Profile" },
    { href: "/dashboard/courses", icon: BookOpen, label: "All courses" },
    { href: "/dashboard/wishlist", icon: Heart, label: "Wishlist" },
    { href: "/dashboard/certificates", icon: Medal, label: "Certificates" },
    { href: "/dashboard/learning", icon: GraduationCap, label: "Learning" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background transition-colors bg-gradient-to-br from-primary/10 via-purple-100 to-blue-50 duration-300">
      
      {/* Header */}
      <Header />
      
      <div className="flex border-t">
      
        {/* Sidebar */}
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="hidden md:flex flex-col w-64 border-r bg-card "
        >
          <ScrollArea className="flex-1 px-3 py-3">
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-800 hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4 text-accent-foreground" />
                  {item.label}
                </Link>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </ScrollArea>
        </motion.div>

        {/* Al subroutes are under the outlets */}
        <Outlet />
      
      </div>
      
      <Footer />
    </div>
  );
}

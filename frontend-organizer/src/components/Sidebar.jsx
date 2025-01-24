import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  Trophy,
  MessageSquare,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  
  const menuItems = [
    { 
      icon: <LayoutDashboard size={20} />, 
      label: 'Overview', 
      path: '/overview'
    },
    { 
      icon: <Users size={20} />, 
      label: 'Teams', 
      path: '/teams'
    },
    { 
        icon: <MessageSquare size={20} />, 
        label: 'Announcements', 
        path: '/announcements'
      },
    // { 
    //   icon: <Trophy size={20} />, 
    //   label: 'Leaderboard', 
    //   path: '/leaderboard'
    // },
    
  ];

  return (
    <div
      className={cn(
        "h-screen bg-white border-r transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Collapse Toggle */}
      <div className="h-16 flex justify-end items-center px-2 border-b">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8"
        >
          {isCollapsed ? (
            <ChevronRight size={18} />
          ) : (
            <ChevronLeft size={18} />
          )}
        </Button>
      </div>
      
      {/* Navigation Items */}
      <nav className="p-2 space-y-2">
        {menuItems.map((item) => (
          <Link key={item.path} to={item.path}>
            <Button
              variant={location.pathname === item.path ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-2",
                isCollapsed && "justify-center px-2"
              )}
            >
              {item.icon}
              {!isCollapsed && <span>{item.label}</span>}
            </Button>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
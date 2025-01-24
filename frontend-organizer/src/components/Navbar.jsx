import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  CalendarCheck, 
  Megaphone, 
  Users, 
  Trophy, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  const navItems = [
    { 
      icon: Home, 
      label: 'Dashboard', 
      path: '/dashboard',
      color: 'text-blue-500' 
    },
    { 
      icon: CalendarCheck, 
      label: 'Hackathon', 
      path: '/overview',
      color: 'text-green-500' 
    },
    { 
      icon: Megaphone, 
      label: 'Announcements', 
      path: '/announcements',
      color: 'text-purple-500' 
    },
    { 
      icon: Users, 
      label: 'Teams', 
      path: '/teams',
      color: 'text-orange-500' 
    },
    { 
      icon: Trophy, 
      label: 'Projects', 
      path: '/projects',
      color: 'text-red-500' 
    }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center">
              <span className="text-2xl font-bold text-gray-800">
                Code
                <span className="text-blue-500">Yatra</span>
              </span> {/* Closing span tag here */}
            </Link>
          </div>

          {/* Navigation Links */}
          {/* <div className="flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-300
                  ${activeTab === item.path 
                    ? `bg-gray-100 ${item.color}` 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'}
                `}
                onClick={() => setActiveTab(item.path)}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </div> */}

          {/* User Profile Section */}
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="hover:bg-gray-100 p-0.5 rounded-full">
                  <Avatar className="border-2 border-transparent hover:border-blue-300 transition-all">
                    <AvatarImage 
                      src="/path/to/profile-image.jpg" 
                      alt="User profile"
                    />
                    <AvatarFallback>H</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Anesh Ghadi</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      hackathon.organizer@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Profile Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-500 focus:text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

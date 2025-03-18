import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  AlertCircle, 
  MapPin, 
  Search, 
  BookOpen, 
  FileText, 
  Video, 
  Users, 
  Settings, 
  Bell 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const Dashboard = () => {
  const dashboardItems = [
    {
      title: "Emergency SOS",
      description: "One-tap emergency alert system",
      icon: <AlertCircle className="h-8 w-8 text-red-500" />,
      link: "/emergency-sos",
      color: "bg-red-100 hover:bg-red-200",
      textColor: "text-red-800"
    },
    {
      title: "Hospital Locator",
      description: "Find nearest hospitals and clinics",
      icon: <MapPin className="h-8 w-8 text-blue-500" />,
      link: "/hospital-locator",
      color: "bg-blue-100 hover:bg-blue-200",
      textColor: "text-blue-800"
    },
    {
      title: "Symptom Checker",
      description: "Check your symptoms and get advice",
      icon: <Search className="h-8 w-8 text-emerald-500" />,
      link: "/symptom-checker",
      color: "bg-emerald-100 hover:bg-emerald-200",
      textColor: "text-emerald-800"
    },
    {
      title: "First Aid Guide",
      description: "Step-by-step emergency instructions",
      icon: <BookOpen className="h-8 w-8 text-amber-500" />,
      link: "/first-aid-guide",
      color: "bg-amber-100 hover:bg-amber-200",
      textColor: "text-amber-800"
    },
    {
      title: "Medical Records",
      description: "Secure storage of your health data",
      icon: <FileText className="h-8 w-8 text-purple-500" />,
      link: "/medical-records",
      color: "bg-purple-100 hover:bg-purple-200",
      textColor: "text-purple-800"
    },
    {
      title: "Live Video Call",
      description: "Connect with medical professionals",
      icon: <Video className="h-8 w-8 text-indigo-500" />,
      link: "/live-video-call",
      color: "bg-indigo-100 hover:bg-indigo-200",
      textColor: "text-indigo-800"
    },
    {
      title: "Community & Volunteers",
      description: "Connect with nearby volunteers",
      icon: <Users className="h-8 w-8 text-teal-500" />,
      link: "/community",
      color: "bg-teal-100 hover:bg-teal-200",
      textColor: "text-teal-800"
    },
    {
      title: "Settings",
      description: "Manage your profile and preferences",
      icon: <Settings className="h-8 w-8 text-gray-500" />,
      link: "/settings",
      color: "bg-gray-100 hover:bg-gray-200",
      textColor: "text-gray-800"
    }
  ];

  const recentAlerts = [
    { 
      title: "Nearby Emergency",
      description: "Car accident reported 0.8 miles away",
      time: "10 mins ago",
      type: "critical" 
    },
    { 
      title: "First Aid Reminder",
      description: "Complete the CPR training module",
      time: "2 hours ago",
      type: "info" 
    },
    { 
      title: "Medical Update",
      description: "Dr. Smith uploaded new test results",
      time: "Yesterday",
      type: "standard" 
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-600">Welcome back, Alex</p>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-4"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                3
              </span>
            </Button>
            <Avatar>
              <AvatarImage src="/api/placeholder/32/32" alt="User" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
          </motion.div>
        </div>

        {/* Quick SOS Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link to="/emergency-sos">
            <Button className="w-full bg-red-600 hover:bg-red-700 p-6 text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3">
              <AlertCircle className="h-6 w-6" />
              Emergency SOS
            </Button>
          </Link>
        </motion.div>

        {/* Main Dashboard Grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {dashboardItems.map((item, index) => (
            <motion.div 
              key={index} 
              variants={item}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Link to={item.link}>
                <Card className={`h-full cursor-pointer transition-all duration-300 border-none shadow hover:shadow-md ${item.color}`}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      {item.icon}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className={`text-lg mb-1 ${item.textColor}`}>{item.title}</CardTitle>
                    <CardDescription className="text-sm">{item.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Alerts */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Card className="border-none shadow">
            <CardHeader>
              <CardTitle>Recent Alerts</CardTitle>
              <CardDescription>Emergency notifications and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAlerts.map((alert, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    className="flex items-start p-3 rounded-lg bg-white border border-gray-100 shadow-sm"
                  >
                    <div className="mr-4">
                      {alert.type === 'critical' && (
                        <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                      )}
                      {alert.type === 'info' && (
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      )}
                      {alert.type === 'standard' && (
                        <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{alert.title}</h4>
                        <span className="text-xs text-gray-500">{alert.time}</span>
                      </div>
                      <p className="text-sm text-gray-600">{alert.description}</p>
                    </div>
                    {alert.type === 'critical' && (
                      <Badge className="ml-2 bg-red-500">Urgent</Badge>
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
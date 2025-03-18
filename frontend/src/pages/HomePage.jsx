import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Heart, Zap, MapPin, FileText, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const HomePage = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Hero Section */}
      <motion.section 
        className="relative py-20 px-4 md:px-8 lg:px-16 flex flex-col items-center justify-center text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-600"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          MediAid
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl mb-8 max-w-2xl font-medium text-gray-700"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Emergency medical assistance when seconds count
        </motion.p>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
            <Link to="/emergency-sos" className="flex items-center gap-2">
              Emergency SOS <Zap className="h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50">
            <Link to="/dashboard" className="flex items-center gap-2">
              Open Dashboard <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        variants={container}
        initial="hidden"
        animate="show"
        className="py-16 px-4 md:px-8 lg:px-16 bg-white"
      >
        <motion.h2 
          variants={item}
          className="text-3xl font-bold text-center mb-12 text-gray-800"
        >
          Life-Saving Features
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Emergency SOS */}
          <motion.div
            variants={item}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <Link to="/emergency-sos">
              <Card className="bg-red-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent>
                  <Zap className="h-12 w-12 text-red-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Emergency SOS</h3>
                  <p className="text-gray-700">One-tap emergency alert system with location sharing</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>

          {/* Hospital Locator */}
          <motion.div
            variants={item}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <Link to="/hospital-locator">
              <Card className="bg-blue-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent>
                  <MapPin className="h-12 w-12 text-blue-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Hospital Locator</h3>
                  <p className="text-gray-700">Find the nearest hospitals with real-time wait times</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>

          {/* Symptom Checker */}
          <motion.div
            variants={item}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <Link to="/symptom-checker">
              <Card className="bg-emerald-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent>
                  <Heart className="h-12 w-12 text-emerald-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Symptom Checker</h3>
                  <p className="text-gray-700">AI-powered symptom analysis and recommendations</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>

          {/* First Aid Guides */}
          <motion.div
            variants={item}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <Link to="/first-aid-guide">
              <Card className="bg-amber-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent>
                  <FileText className="h-12 w-12 text-amber-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">First Aid Guides</h3>
                  <p className="text-gray-700">Step-by-step emergency first aid instructions</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>

          {/* Live Assistance */}
          <motion.div
            variants={item}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <Link to="/community">
              <Card className="bg-purple-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent>
                  <Phone className="h-12 w-12 text-purple-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Live Assistance</h3>
                  <p className="text-gray-700">Connect with medical professionals instantly</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;

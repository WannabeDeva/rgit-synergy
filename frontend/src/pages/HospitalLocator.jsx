import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Phone, Star, Clock, Filter, ChevronDown, ChevronUp, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const HospitalLocator = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [distance, setDistance] = useState([10]);
  const [selectedType, setSelectedType] = useState('all');
  
  const hospitals = [
    {
      id: 1,
      name: "City General Hospital",
      type: "Hospital",
      distance: "1.2 miles",
      address: "123 Main Street, Cityville",
      phone: "555-123-4567",
      rating: 4.8,
      waitTime: "15 min",
      specialties: ["Emergency", "Cardiology", "Neurology"],
      isOpen: true
    },
    {
      id: 2,
      name: "Westside Urgent Care",
      type: "Urgent Care",
      distance: "0.8 miles",
      address: "456 West Avenue, Cityville",
      phone: "555-987-6543",
      rating: 4.5,
      waitTime: "10 min",
      specialties: ["Urgent Care", "Minor Injuries"],
      isOpen: true
    },
    {
      id: 3,
      name: "Eastside Medical Center",
      type: "Hospital",
      distance: "2.3 miles",
      address: "789 East Boulevard, Cityville",
      phone: "555-456-7890",
      rating: 4.2,
      waitTime: "25 min",
      specialties: ["Emergency", "Pediatrics", "Orthopedics"],
      isOpen: true
    },
    {
      id: 4,
      name: "Downtown Walk-in Clinic",
      type: "Clinic",
      distance: "1.5 miles",
      address: "101 Central Avenue, Cityville",
      phone: "555-789-0123",
      rating: 4.0,
      waitTime: "5 min",
      specialties: ["General Medicine", "Vaccinations"],
      isOpen: true
    },
    {
      id: 5,
      name: "North Community Hospital",
      type: "Hospital",
      distance: "3.1 miles",
      address: "202 North Road, Cityville",
      phone: "555-234-5678",
      rating: 4.6,
      waitTime: "20 min",
      specialties: ["Emergency", "Surgery", "Oncology"],
      isOpen: true
    }
  ];
  
  const filteredHospitals = hospitals.filter(hospital => {
    // Filter by search query
    if (searchQuery && !hospital.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by type
    if (selectedType !== 'all' && hospital.type.toLowerCase() !== selectedType) {
      return false;
    }
    
    // Filter by distance
    const hospitalDistance = parseFloat(hospital.distance);
    if (hospitalDistance > distance[0]) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto pt-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800">Hospital Locator</h1>
          <p className="text-gray-600 mt-2">
            Find the nearest medical facilities
          </p>
        </motion.div>

        {/* Search and Filters */}
        <Card className="border-none shadow-md mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search hospitals, clinics..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
                Filters
                {showFilters ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>

            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 pt-4 border-t border-gray-100"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Facility Type</label>
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="hospital">Hospitals</SelectItem>
                        <SelectItem value="urgent care">Urgent Care</SelectItem>
                        <SelectItem value="clinic">Clinics</SelectItem>
                        <SelectItem value="pharmacy">Pharmacies</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Distance: {distance} miles
                    </label>
                    <Slider
                      defaultValue={[10]}
                      max={50}
                      step={1}
                      value={distance}
                      onValueChange={setDistance}
                      className="py-4"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Sort By</label>
                    <Select defaultValue="distance">
                      <SelectTrigger>
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="distance">Distance</SelectItem>
                        <SelectItem value="wait">Wait Time</SelectItem>
                        <SelectItem value="rating">Rating</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* View Modes */}
        <Tabs defaultValue="list" className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="map">Map View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="mt-4">
            <div className="space-y-4">
              {filteredHospitals.length > 0 ? (
                filteredHospitals.map((hospital, index) => (
                  <motion.div
                    key={hospital.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-0">
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold text-lg">{hospital.name}</h3>
                              <div className="flex items-center text-sm text-gray-500 gap-2">
                                <Badge variant="secondary" className="font-normal">
                                  {hospital.type}
                                </Badge>
                                <span className="flex items-center">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {hospital.distance}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center mb-1">
                                <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
                                <span className="font-medium">{hospital.rating}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <Clock className="h-3 w-3 mr-1 text-blue-500" />
                                <span className="text-blue-700 font-medium">{hospital.waitTime} wait</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-3">
                            <div className="flex flex-wrap gap-1 mb-3">
                              {hospital.specialties.map((specialty, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
                            
                            <div className="flex items-center text-sm text-gray-600 mb-2">
                              <MapPin className="h-3 w-3 mr-1" />
                              {hospital.address}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex border-t border-gray-100">
                          <Button variant="ghost" className="flex-1 rounded-none py-3 h-auto text-blue-600">
                            <Phone className="h-4 w-4 mr-2" />
                            Call
                          </Button>
                          <div className="w-px bg-gray-100"></div>
                          <Button variant="ghost" className="flex-1 rounded-none py-3 h-auto text-blue-600">
                            <MapPin className="h-4 w-4 mr-2" />
                            Directions
                          </Button>
                          <div className="w-px bg-gray-100"></div>
                          <Button variant="ghost" className="flex-1 rounded-none py-3 h-auto text-blue-600">
                            <Users className="h-4 w-4 mr-2" />
                            Wait List
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No facilities found matching your criteria.</p>
                  <Button variant="link" onClick={() => {
                    setSearchQuery('');
                    setSelectedType('all');
                    setDistance([10]);
                  }}>
                    Reset filters
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="map" className="mt-4">
            <Card className="border-none shadow-md overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-blue-50 h-96 flex items-center justify-center">
                  <div className="text-center p-4">
                    <MapPin className="h-10 w-10 text-blue-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-3">Map view shows nearby hospitals and clinics</p>
                    <p className="text-sm text-gray-500">Locations are based on your current position</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Filters */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1 text-xs">
            Hospitals
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1 text-xs">
            Urgent Care
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1 text-xs">
            Pediatric
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1 text-xs">
            24/7 Open
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1 text-xs">
            Low Wait Time
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1 text-xs">
            Top Rated
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HospitalLocator;
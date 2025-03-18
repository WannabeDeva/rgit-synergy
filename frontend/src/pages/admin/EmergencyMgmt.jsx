import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  ChevronDown, 
  ChevronUp, 
  Ambulance, 
  CalendarClock, 
  FileText
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AdminNavbar from '@/components/AdminNavbar';

const EmergencyMgmt = () => {
  const [selectedCase, setSelectedCase] = useState(null);
  const [displayMode, setDisplayMode] = useState('active');
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Mock data
  const emergencyCases = [
    { 
      id: 'E-2503', 
      patient: 'John Doe', 
      location: '123 Main St, New York', 
      type: 'Cardiac', 
      time: '5 min ago', 
      severity: 'Critical',
      status: 'Active',
      details: {
        age: 58,
        gender: 'Male',
        contact: '(555) 123-4567',
        medicalHistory: 'Hypertension, Previous MI in 2022',
        notes: 'Patient reported chest pain and shortness of breath before collapsing',
        vitalSigns: {
          heartRate: '118 bpm',
          bloodPressure: '160/95 mmHg',
          oxygenSaturation: '92%'
        }
      }
    },
    { 
      id: 'E-2502', 
      patient: 'Jane Smith', 
      location: '456 Park Ave, Boston', 
      type: 'Trauma', 
      time: '12 min ago', 
      severity: 'High',
      status: 'Active',
      details: {
        age: 34,
        gender: 'Female',
        contact: '(555) 987-6543',
        medicalHistory: 'No significant history',
        notes: 'Vehicle accident, possible head trauma and leg injury',
        vitalSigns: {
          heartRate: '95 bpm',
          bloodPressure: '130/85 mmHg',
          oxygenSaturation: '97%'
        }
      }
    },
    { 
      id: 'E-2501', 
      patient: 'Robert Johnson', 
      location: '789 Oak Dr, Chicago', 
      type: 'Allergic', 
      time: '18 min ago', 
      severity: 'Medium',
      status: 'Active',
      details: {
        age: 42,
        gender: 'Male',
        contact: '(555) 456-7890',
        medicalHistory: 'Known allergies to nuts',
        notes: 'Accidental peanut exposure, showing signs of anaphylaxis',
        vitalSigns: {
          heartRate: '105 bpm',
          bloodPressure: '110/70 mmHg',
          oxygenSaturation: '94%'
        }
      }
    },
    { 
      id: 'E-2500', 
      patient: 'Emily Wilson', 
      location: '321 Elm St, Seattle', 
      type: 'Respiratory', 
      time: '35 min ago', 
      severity: 'High',
      status: 'Resolved',
      details: {
        age: 67,
        gender: 'Female',
        contact: '(555) 234-5678',
        medicalHistory: 'COPD, Asthma',
        notes: 'Severe asthma attack, responded well to emergency treatment',
        vitalSigns: {
          heartRate: '88 bpm',
          bloodPressure: '125/80 mmHg',
          oxygenSaturation: '96%'
        }
      }
    },
  ];

  const filteredCases = emergencyCases.filter(c => 
    displayMode === 'active' ? c.status === 'Active' : c.status === 'Resolved'
  );

  const responders = [
    { id: 'R-001', name: 'Dr. Sarah Johnson', specialty: 'Emergency Medicine', status: 'Available' },
    { id: 'R-002', name: 'Paramedic Team Alpha', specialty: 'Critical Care', status: 'En Route' },
    { id: 'R-003', name: 'Dr. Michael Chen', specialty: 'Trauma Surgery', status: 'Available' },
    { id: 'R-004', name: 'Ambulance Unit 42', specialty: 'Transport', status: 'Available' },
  ];

  return (
    <div>
      <AdminNavbar />
    <div className="p-6 bg-slate-50 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2 text-gray-800">Emergency Management</h1>
        <p className="text-gray-600 mb-6">Track and manage emergency cases</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Case List */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="lg:col-span-1"
        >
          <Card className="bg-white shadow-md h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-gray-800">Emergency Cases</CardTitle>
                <div className="flex gap-2">
                  <Button 
                    variant={displayMode === 'active' ? 'default' : 'outline'} 
                    size="sm" 
                    onClick={() => setDisplayMode('active')}
                  >
                    Active
                  </Button>
                  <Button 
                    variant={displayMode === 'resolved' ? 'default' : 'outline'} 
                    size="sm" 
                    onClick={() => setDisplayMode('resolved')}
                  >
                    Resolved
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search cases..." 
                    className="pl-9"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
                {filteredCases.map((emergency, index) => (
                  <motion.div
                    key={emergency.id}
                    variants={item}
                    onClick={() => setSelectedCase(emergency)}
                    className={`p-4 rounded-lg border cursor-pointer hover:bg-blue-50 transition-colors ${
                      selectedCase?.id === emergency.id ? 'bg-blue-50 border-blue-300' : 'bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-800">{emergency.id}</span>
                          <Badge variant={emergency.severity === 'Critical' ? 'destructive' : 
                            emergency.severity === 'High' ? 'warning' : 'outline'}>
                            {emergency.severity}
                          </Badge>
                        </div>
                        <h3 className="font-medium mt-1">{emergency.patient}</h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span className="truncate">{emergency.location}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">{emergency.time}</div>
                        <div className="mt-1 text-sm font-medium text-blue-600">{emergency.type}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Case Details */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="lg:col-span-2"
        >
          {selectedCase ? (
            <Card className="bg-white shadow-md">
              <CardHeader className="pb-2 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-xl font-bold text-gray-800">
                        Case {selectedCase.id}
                      </CardTitle>
                      <Badge variant={selectedCase.severity === 'Critical' ? 'destructive' : 
                        selectedCase.severity === 'High' ? 'warning' : 'outline'}>
                        {selectedCase.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{selectedCase.type} Emergency</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4 mr-1" /> Contact
                    </Button>
                    <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Ambulance className="h-4 w-4 mr-1" /> Assign Responder
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-4">
                <Tabs defaultValue="details">
                  <TabsList className="mb-4">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="responders">Responders</TabsTrigger>
                    <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="details">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Patient Information</h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                            <User className="h-4 w-4 text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-500">Name</p>
                              <p className="font-medium">{selectedCase.patient}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                            <CalendarClock className="h-4 w-4 text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-500">Age</p>
                              <p className="font-medium">{selectedCase.details.age}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                            <Phone className="h-4 w-4 text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-500">Contact</p>
                              <p className="font-medium">{selectedCase.details.contact}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-500">Location</p>
                              <p className="font-medium">{selectedCase.location}</p>
                            </div>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-semibold mt-6 mb-3">Medical History</h3>
                        <div className="p-3 bg-gray-50 rounded">
                          <p>{selectedCase.details.medicalHistory}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Vital Signs</h3>
                        <div className="grid grid-cols-3 gap-3">
                          <div className="p-3 bg-red-50 rounded text-center">
                            <p className="text-sm text-gray-500">Heart Rate</p>
                            <p className="font-bold text-lg text-red-600">{selectedCase.details.vitalSigns.heartRate}</p>
                          </div>
                          <div className="p-3 bg-blue-50 rounded text-center">
                            <p className="text-sm text-gray-500">Blood Pressure</p>
                            <p className="font-bold text-lg text-blue-600">{selectedCase.details.vitalSigns.bloodPressure}</p>
                          </div>
                          <div className="p-3 bg-green-50 rounded text-center">
                            <p className="text-sm text-gray-500">SpO2</p>
                            <p className="font-bold text-lg text-green-600">{selectedCase.details.vitalSigns.oxygenSaturation}</p>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-semibold mt-6 mb-3">Emergency Notes</h3>
                        <div className="p-3 bg-gray-50 rounded">
                          <p>{selectedCase.details.notes}</p>
                        </div>
                        
                        <h3 className="text-lg font-semibold mt-6 mb-3">Emergency Location</h3>
                        <div className="h-48 bg-gray-100 rounded-md flex items-center justify-center">
                          <p className="text-gray-500">Map view would appear here</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="responders">
                    <div>
                      <div className="flex justify-between mb-4">
                        <h3 className="text-lg font-semibold">Available Responders</h3>
                        <Button variant="outline" size="sm">
                          <User className="h-4 w-4 mr-1" /> Add Responder
                        </Button>
                      </div>
                      
                      <div className="space-y-3">
                        {responders.map((responder) => (
                          <div key={responder.id} className="p-4 border rounded-lg bg-white flex justify-between items-center">
                            <div>
                              <h4 className="font-medium">{responder.name}</h4>
                              <p className="text-sm text-gray-500">{responder.specialty}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant={responder.status === 'Available' ? 'success' : 'outline'}>
                                {responder.status}
                              </Badge>
                              <Button variant="outline" size="sm">Assign</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="timeline">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Event Timeline</h3>
                      <div className="relative pl-6 border-l-2 border-gray-200 space-y-6">
                        <div className="relative">
                          <div className="absolute -left-[22px] bg-red-500 rounded-full h-4 w-4"></div>
                          <div className="mb-1">
                            <span className="text-sm text-gray-500">Today, 10:15 AM</span>
                          </div>
                          <p className="font-medium">Emergency SOS Triggered</p>
                          <p className="text-sm text-gray-600">Patient triggered SOS alert via mobile app</p>
                        </div>
                        <div className="relative">
                          <div className="absolute -left-[22px] bg-blue-500 rounded-full h-4 w-4"></div>
                          <div className="mb-1">
                            <span className="text-sm text-gray-500">Today, 10:17 AM</span>
                          </div>
                          <p className="font-medium">Case Created</p>
                          <p className="text-sm text-gray-600">System automatically created case #{selectedCase.id}</p>
                        </div>
                        <div className="relative">
                          <div className="absolute -left-[22px] bg-amber-500 rounded-full h-4 w-4"></div>
                          <div className="mb-1">
                            <span className="text-sm text-gray-500">Today, 10:20 AM</span>
                          </div>
                          <p className="font-medium">Triage Complete</p>
                          <p className="text-sm text-gray-600">Case classified as {selectedCase.severity} priority</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-white shadow-md h-full">
              <CardContent className="h-full flex items-center justify-center p-12">
                <div className="text-center">
                  <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-600 mb-2">No Case Selected</h3>
                  <p className="text-gray-500 max-w-md">
                    Select an emergency case from the list to view detailed information and manage response.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
    </div>
  );
};

export default EmergencyMgmt;
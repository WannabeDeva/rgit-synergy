import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Loader2, AlertCircle, Plus, ChevronRight, HeartPulse, Brain, Thermometer, ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [currentSymptom, setCurrentSymptom] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(1);
  const [severity, setSeverity] = useState('moderate');
  const [duration, setDuration] = useState('days');

  const commonSymptoms = [
    'Headache', 'Fever', 'Cough', 'Nausea', 
    'Dizziness', 'Fatigue', 'Chest Pain', 'Shortness of Breath',
    'Abdominal Pain', 'Vomiting', 'Sore Throat'
  ];

  const possibleConditions = [
    { 
      name: 'Common Cold', 
      probability: 72, 
      severity: 'Low',
      urgency: 'Non-urgent',
      recommendations: ['Rest', 'Hydration', 'Over-the-counter cold medicine']
    },
    { 
      name: 'Influenza', 
      probability: 56, 
      severity: 'Moderate',
      urgency: 'Monitor',
      recommendations: ['Rest', 'Fluids', 'Acetaminophen for fever', 'Monitor for worsening symptoms']
    },
    { 
      name: 'COVID-19', 
      probability: 31, 
      severity: 'Moderate',
      urgency: 'Medical advice',
      recommendations: ['Isolate', 'Testing recommended', 'Consult healthcare provider']
    }
  ];

  const handleAddSymptom = () => {
    if (currentSymptom && !symptoms.includes(currentSymptom)) {
      setSymptoms([...symptoms, currentSymptom]);
      setCurrentSymptom('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddSymptom();
    }
  };

  const removeSymptom = (symptom) => {
    setSymptoms(symptoms.filter(s => s !== symptom));
  };

  const handleSuggestionClick = (symptom) => {
    if (!symptoms.includes(symptom)) {
      setSymptoms([...symptoms, symptom]);
    }
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setProgress(0);
    
    // Simulate analysis progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          setResult(possibleConditions);
          return 100;
        }
        return prev + 5;
      });
    }, 120);
  };

  const resetChecker = () => {
    setSymptoms([]);
    setCurrentSymptom('');
    setIsAnalyzing(false);
    setResult(null);
    setProgress(0);
    setStep(1);
    setSeverity('moderate');
    setDuration('days');
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch(urgency) {
      case 'Non-urgent': return 'bg-green-100 text-green-800 border-green-200';
      case 'Monitor': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Medical advice': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Seek care': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto pt-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800">Symptom Checker</h1>
          <p className="text-gray-600 mt-2">
            Get quick analysis and guidance for your health concerns
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Symptom Input Column */}
          <div className="md:col-span-2">
            <Card className="border-none shadow-lg bg-white overflow-hidden">
              <CardContent className="p-6">
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">What symptoms are you experiencing?</h2>
                    
                    <div className="flex gap-2 mb-6">
                      <Input
                        value={currentSymptom}
                        onChange={(e) => setCurrentSymptom(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter symptoms..."
                        className="flex-1"
                      />
                      <Button onClick={handleAddSymptom} className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {symptoms.length > 0 ? (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {symptoms.map((symptom, index) => (
                            <Badge 
                              key={index}
                              variant="outline"
                              className="bg-blue-50 text-blue-800 border-blue-200 px-3 py-1 flex items-center gap-1"
                            >
                              {symptom}
                              <button 
                                className="ml-1 h-4 w-4 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center"
                                onClick={() => removeSymptom(symptom)}
                              >
                                <span className="text-xs">×</span>
                              </button>
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 mb-4">Add symptoms to get started</p>
                      )}

                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Common symptoms:</h3>
                        <div className="flex flex-wrap gap-2">
                          {commonSymptoms.map((symptom, index) => (
                            <Badge 
                              key={index}
                              variant="outline"
                              className="bg-gray-100 text-gray-800 hover:bg-blue-50 hover:text-blue-800 cursor-pointer transition-colors"
                              onClick={() => handleSuggestionClick(symptom)}
                            >
                              {symptom}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Additional Information</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-3">How severe are your symptoms?</h3>
                        <RadioGroup value={severity} onValueChange={setSeverity} className="flex flex-col space-y-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="mild" id="mild" />
                            <Label htmlFor="mild">Mild - Noticeable but not interfering with daily activities</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="moderate" id="moderate" />
                            <Label htmlFor="moderate">Moderate - Affecting some daily activities</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="severe" id="severe" />
                            <Label htmlFor="severe">Severe - Significantly impacting daily life</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-3">How long have you been experiencing these symptoms?</h3>
                        <RadioGroup value={duration} onValueChange={setDuration} className="flex flex-col space-y-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="hours" id="hours" />
                            <Label htmlFor="hours">Hours</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="days" id="days" />
                            <Label htmlFor="days">Days</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="weeks" id="weeks" />
                            <Label htmlFor="weeks">Weeks</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="months" id="months" />
                            <Label htmlFor="months">Months or longer</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {isAnalyzing && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-8 text-center"
                  >
                    <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Analyzing your symptoms</h3>
                    <p className="text-gray-500 mb-4">Please wait while our AI processes your information</p>
                    <Progress value={progress} className="h-2" />
                  </motion.div>
                )}

                {result && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold text-gray-800">Possible Conditions</h2>
                      <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                        AI Analysis
                      </Badge>
                    </div>
                    
                    <div className="space-y-4">
                      {result.map((condition, index) => (
                        <Card key={index} className="border border-gray-200">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center mb-2">
                              <h3 className="font-medium text-gray-900">{condition.name}</h3>
                              <div className="flex items-center">
                                <span className="text-sm font-medium text-gray-700 mr-2">
                                  {condition.probability}%
                                </span>
                                <Progress value={condition.probability} className="h-2 w-20" />
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mb-3">
                              <Badge variant="outline" className={getSeverityColor(condition.severity)}>
                                {condition.severity} Severity
                              </Badge>
                              <Badge variant="outline" className={getUrgencyColor(condition.urgency)}>
                                {condition.urgency}
                              </Badge>
                            </div>
                            
                            <div className="mt-3">
                              <h4 className="text-sm font-medium text-gray-700 mb-1">Recommendations:</h4>
                              <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                                {condition.recommendations.map((rec, idx) => (
                                  <li key={idx}>{rec}</li>
                                ))}
                              </ul>
                            </div>
                          </CardContent>
                          <CardFooter className="bg-gray-50 p-3 flex justify-end">
                            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50">
                              Learn More <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}

                      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mt-6">
                        <div className="flex">
                          <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                          <div>
                            <h3 className="text-sm font-medium text-yellow-800">Important Disclaimer</h3>
                            <p className="text-sm text-yellow-700 mt-1">
                              This analysis is not a medical diagnosis. Please consult with a healthcare 
                              professional for proper medical advice.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-3 mt-4">
                        <Button variant="outline" onClick={resetChecker}>
                          Start Over
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          <Phone className="h-4 w-4 mr-2" />
                          Find Healthcare
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </CardContent>

              {!isAnalyzing && !result && (
                <CardFooter className="bg-gray-50 p-4 flex justify-end border-t border-gray-100">
                  {step === 1 && (
                    <Button 
                      onClick={nextStep} 
                      disabled={symptoms.length === 0}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300"
                    >
                      Continue <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  )}
                  
                  {step === 2 && (
                    <Button 
                      onClick={handleAnalyze} 
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Analyze Symptoms <Search className="h-4 w-4 ml-1" />
                    </Button>
                  )}
                </CardFooter>
              )}
            </Card>
          </div>
          
          {/* Info & Resources Column */}
          <div>
            <Card className="border-none shadow-md mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Common Concerns</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ScrollArea className="h-64">
                  <div className="space-y-4 pr-4">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-white rounded-lg border border-gray-200 p-3 cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                          <HeartPulse className="h-4 w-4 text-red-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Chest Pain</h3>
                          <p className="text-sm text-gray-500">
                            Could be heart-related or muscle strain
                          </p>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-white rounded-lg border border-gray-200 p-3 cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <Brain className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Headaches</h3>
                          <p className="text-sm text-gray-500">
                            Types, causes, and when to seek help
                          </p>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-white rounded-lg border border-gray-200 p-3 cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                          <Thermometer className="h-4 w-4 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Fever</h3>
                          <p className="text-sm text-gray-500">
                            When to worry about high temperature
                          </p>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-white rounded-lg border border-gray-200 p-3 cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                          <AlertCircle className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Skin Rashes</h3>
                          <p className="text-sm text-gray-500">
                            Identifying common skin conditions
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Need Immediate Help?</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    If you're experiencing severe symptoms that could be life-threatening, please seek emergency care immediately.
                  </p>
                  
                  <div className="bg-red-50 border border-red-200 rounded-md p-3">
                    <h3 className="text-sm font-medium text-red-800 mb-1">Emergency symptoms include:</h3>
                    <ul className="text-sm text-red-700 list-disc pl-5 space-y-1">
                      <li>Difficulty breathing</li>
                      <li>Severe chest pain</li>
                      <li>Sudden severe headache</li>
                      <li>Uncontrollable bleeding</li>
                      <li>Loss of consciousness</li>
                    </ul>
                  </div>
                  
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    Call Emergency Services
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;
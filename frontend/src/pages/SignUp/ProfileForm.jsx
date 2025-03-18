// ProfileForm.jsx
import React, { useState } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Phone, AlertCircle, Heart, User, IdCard, UserCheck } from 'lucide-react';
import { toast } from 'sonner';

const ProfileForm = () => {
  const { user } = useUser();
  const { getToken } = useAuth();

  const [formData, setFormData] = useState({
    phone: '',
    bloodGroup: '',
    diseases: '',
    emergencyContacts: '',
    aadharDetails: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    // Phone validation
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }
    
    // Blood group validation
    if (!formData.bloodGroup) {
      newErrors.bloodGroup = "Blood group is required";
    }
    
    // Aadhar validation
    if (!formData.aadharDetails) {
      newErrors.aadharDetails = "Aadhar details are required";
    } else if (!/^\d{12}$/.test(formData.aadharDetails)) {
      newErrors.aadharDetails = "Aadhar should be 12 digits";
    }
    
    // Emergency contacts validation
    if (!formData.emergencyContacts) {
      newErrors.emergencyContacts = "At least one emergency contact is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSelectChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form.", {
        description: "Some required fields need your attention."
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const token = await getToken();

      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          clerkUserId: user.id,
          email: user.primaryEmailAddress.emailAddress,
          ...formData,
        }),
      });

      if (response.ok) {
        toast.success("Success!", {
          description: "Your medical profile has been saved successfully."
        });
      } else {
        const errorData = await response.json().catch(() => null);
        toast.error("Submission failed", {
          description: errorData?.message || "Failed to save profile. Please try again."
        });
      }
    } catch (error) {
      toast.error("Connection error", {
        description: "Please check your network and try again."
      });
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="w-full shadow-lg">
        <CardHeader className="bg-slate-50 border-b">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <UserCheck className="h-6 w-6 text-blue-600" />
            Medical Profile
          </CardTitle>
          <CardDescription>
            Please provide your medical details for emergency purposes
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6 pt-6">
            {/* User info display */}
            <div className="bg-blue-50 p-4 rounded-lg flex items-center gap-3">
              <User className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Logged in as:</p>
                <p className="text-sm">{user?.primaryEmailAddress?.emailAddress}</p>
              </div>
            </div>
            
            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> Phone Number
              </Label>
              <Input
                id="phone"
                name="phone"
                placeholder="Enter your 10-digit phone number"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone}</p>
              )}
            </div>
            
            {/* Blood Group */}
            <div className="space-y-2">
              <Label htmlFor="bloodGroup" className="flex items-center gap-2">
                <Heart className="h-4 w-4" /> Blood Group
              </Label>
              <Select 
                name="bloodGroup" 
                value={formData.bloodGroup} 
                onValueChange={(value) => handleSelectChange(value, "bloodGroup")}
              >
                <SelectTrigger className={errors.bloodGroup ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select your blood group" />
                </SelectTrigger>
                <SelectContent>
                  {bloodGroups.map((group) => (
                    <SelectItem key={group} value={group}>{group}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.bloodGroup && (
                <p className="text-sm text-red-500">{errors.bloodGroup}</p>
              )}
            </div>
            
            {/* Diseases */}
            <div className="space-y-2">
              <Label htmlFor="diseases" className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4" /> Medical Conditions
              </Label>
              <Textarea
                id="diseases"
                name="diseases"
                placeholder="List any medical conditions, allergies, or ongoing treatments"
                value={formData.diseases}
                onChange={handleChange}
                className="min-h-24"
              />
            </div>
            
            {/* Emergency Contacts */}
            <div className="space-y-2">
              <Label htmlFor="emergencyContacts" className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> Emergency Contacts
              </Label>
              <Textarea
                id="emergencyContacts"
                name="emergencyContacts"
                placeholder="Name: Relationship: Phone number (one contact per line)"
                value={formData.emergencyContacts}
                onChange={handleChange}
                className={`min-h-24 ${errors.emergencyContacts ? "border-red-500" : ""}`}
              />
              {errors.emergencyContacts && (
                <p className="text-sm text-red-500">{errors.emergencyContacts}</p>
              )}
            </div>
            
            {/* Aadhar Details */}
            <div className="space-y-2">
              <Label htmlFor="aadharDetails" className="flex items-center gap-2">
                <IdCard className="h-4 w-4" /> Aadhar Number
              </Label>
              <Input
                id="aadharDetails"
                name="aadharDetails"
                placeholder="Enter your 12-digit Aadhar number"
                value={formData.aadharDetails}
                onChange={handleChange}
                className={errors.aadharDetails ? "border-red-500" : ""}
                maxLength={12}
              />
              {errors.aadharDetails && (
                <p className="text-sm text-red-500">{errors.aadharDetails}</p>
              )}
            </div>
            
            {/* Privacy Notice */}
            <Alert className="bg-yellow-50 border-yellow-200">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <AlertTitle>Privacy Notice</AlertTitle>
              <AlertDescription className="text-sm">
                Your medical information is stored securely and will only be used in case of emergencies. You can update or delete this information anytime.
              </AlertDescription>
            </Alert>
          </CardContent>
          
          <CardFooter className="flex justify-end gap-3 border-t p-6 bg-slate-50">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setFormData({
                phone: '',
                bloodGroup: '',
                diseases: '',
                emergencyContacts: '',
                aadharDetails: '',
              })}
            >
              Clear
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? "Saving..." : "Save Profile"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ProfileForm;
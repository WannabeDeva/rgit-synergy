import React, { useState } from "react";
import { useSignUp, useUser } from "@clerk/clerk-react"; // Import useUser
import { Loader2 } from "lucide-react"; // Assuming you're using Lucide for icons

const SignUpForm = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { user } = useUser(); // Use the useUser hook to get the authenticated user

  // Form states
  const [phoneInput, setPhoneInput] = useState("");
  const [formattedPhone, setFormattedPhone] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [medicalConditions, setMedicalConditions] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [aadhaar, setAadhaar] = useState("");

  // UI states
  const [currentStep, setCurrentStep] = useState("phone");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle phone input with formatting
  const handlePhoneChange = (e) => {
    const input = e.target.value;
    setPhoneInput(input);

    // Remove all non-digit characters
    const digitsOnly = input.replace(/\D/g, "");

    if (digitsOnly.length === 10) {
      setFormattedPhone(`+91${digitsOnly}`);
      setError("");
    } else {
      setFormattedPhone("");
      if (input && digitsOnly.length !== 10) {
        setError("Please enter a valid 10-digit mobile number");
      } else {
        setError("");
      }
    }
  };

  // Step 1: Create initial signup and request OTP
  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    if (!formattedPhone) {
      setError("Please enter a valid phone number");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Create user with phone number
      await signUp.create({
        phoneNumber: formattedPhone,
      });

      // Start verification
      await signUp.preparePhoneNumberVerification();

      // Move to verification step
      setCurrentStep("verification");
      setSuccessMessage("Verification code sent to your phone");
    } catch (err) {
      console.error("Phone submission error:", err);
      setError(err.message || "Failed to send verification code");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    if (!verificationCode || verificationCode.length < 6) {
      setError("Please enter the 6-digit verification code");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Attempt verification with the code
      await signUp.attemptPhoneNumberVerification({
        code: verificationCode,
      });

      // Activate the session
      const { createdSessionId } = signUp;
      if (createdSessionId) {
        await setActive({ session: createdSessionId });
      }

      // Move to profile completion
      setCurrentStep("profile");
      setSuccessMessage("Phone verified successfully");
    } catch (err) {
      console.error("Verification error:", err);
      setError(err.message || "Invalid verification code");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Complete profile and finalize signup
  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    if (!bloodGroup || !emergencyContact || !aadhaar) {
      setError("Please fill all required fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Retrieve userId from the authenticated user object
      const userId = user?.id;

      if (!userId) {
        throw new Error("User ID is undefined. Make sure verification was successful.");
      }

      console.log("Found userId:", userId);

      // Send additional profile data to the backend
      await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          phoneNumber: formattedPhone,
          bloodGroup,
          medicalConditions,
          emergencyContact,
          aadhaar,
        }),
      });

      setCurrentStep("success");
      setSuccessMessage("Registration completed successfully!");
    } catch (err) {
      console.error("Profile submission error:", err);
      setError(err.message || "Failed to complete registration");
    } finally {
      setLoading(false);
    }
  };

  // Resend verification code
  const handleResendCode = async () => {
    setLoading(true);
    try {
      await signUp.preparePhoneNumberVerification();
      setSuccessMessage("New verification code sent");
    } catch (err) {
      setError(err.message || "Failed to resend code");
    } finally {
      setLoading(false);
    }
  };

  // Show loading state if Clerk is not yet loaded
  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      {currentStep === "phone" && (
        <form onSubmit={handlePhoneSubmit}>
          <h2>Step 1: Enter Your Phone Number</h2>
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneInput}
            onChange={handlePhoneChange}
          />
          {error && <p className="error">{error}</p>}
          {successMessage && <p className="success">{successMessage}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Verification Code"}
          </button>
        </form>
      )}

      {currentStep === "verification" && (
        <form onSubmit={handleVerifyCode}>
          <h2>Step 2: Verify Your Phone</h2>
          <input
            type="text"
            placeholder="Verification Code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          {error && <p className="error">{error}</p>}
          {successMessage && <p className="success">{successMessage}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Verify Code"}
          </button>
          <button type="button" onClick={handleResendCode} disabled={loading}>
            Resend Code
          </button>
        </form>
      )}

      {currentStep === "profile" && (
        <form onSubmit={handleProfileSubmit}>
          <h2>Step 3: Complete Your Profile</h2>
          <input
            type="text"
            placeholder="Blood Group"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
          />
          <input
            type="text"
            placeholder="Medical Conditions"
            value={medicalConditions}
            onChange={(e) => setMedicalConditions(e.target.value)}
          />
          <input
            type="text"
            placeholder="Emergency Contact"
            value={emergencyContact}
            onChange={(e) => setEmergencyContact(e.target.value)}
          />
          <input
            type="text"
            placeholder="Aadhaar Number"
            value={aadhaar}
            onChange={(e) => setAadhaar(e.target.value)}
          />
          {error && <p className="error">{error}</p>}
          {successMessage && <p className="success">{successMessage}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Complete Registration"}
          </button>
        </form>
      )}

      {currentStep === "success" && (
        <div>
          <h2>Registration Successful!</h2>
          <p>{successMessage}</p>
        </div>
      )}
    </div>
  );
};

export default SignUpForm;
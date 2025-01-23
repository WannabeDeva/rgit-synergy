import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

export default function UserAuth() {
  const navigate = useNavigate();

  // State for toggling between Login and Register
  const [isRegister, setIsRegister] = useState(true);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    git: "",
    linkdin: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isRegister) {
      setFormData({ ...formData, [name]: value });
    } else {
      setLoginData({ ...loginData, [name]: value });
    }
  };

  // Handle registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post("/user/SignUP", formData);
      setLoading(false);

      if (response.data.success) {
        setMessage("User registered successfully!");
        navigate("/homepage");
      } else {
        setMessage(response.data.message || "Registration failed.");
      }
    } catch (error) {
      setLoading(false);
      setMessage("An error occurred. Please try again.");
    }
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post("/user/Login", loginData);
      setLoading(false);

      if (response.data.success) {
        setMessage("Login successful!");
        navigate("/homepage");
      } else {
        setMessage(response.data.message || "Login failed.");
      }
    } catch (error) {
      setLoading(false);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          {isRegister ? "Register" : "Login"}
        </h1>
        <p className="mt-2 text-gray-600 text-center">
          {isRegister
            ? "Create your account to get started"
            : "Sign in to your account"}
        </p>

        {/* Toggle Buttons */}
        <div className="flex justify-center space-x-4 mt-4">
          <button
            onClick={() => setIsRegister(true)}
            className={`px-6 py-2.5 rounded-lg ${
              isRegister
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Register
          </button>
          <button
            onClick={() => setIsRegister(false)}
            className={`px-6 py-2.5 rounded-lg ${
              !isRegister
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Login
          </button>
        </div>

        {/* Form */}
        <form
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mt-8"
          onSubmit={isRegister ? handleRegister : handleLogin}
        >
          {isRegister ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500"
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  GitHub Profile
                </label>
                <input
                  type="url"
                  name="git"
                  value={formData.git}
                  onChange={handleChange}
                  className="block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500"
                  placeholder="github.com/username"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  name="linkdin"
                  value={formData.linkdin}
                  onChange={handleChange}
                  className="block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500"
                  placeholder="linkedin.com/in/username"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500"
                  placeholder="********"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleChange}
                  className="block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500"
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                  className="block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500"
                  placeholder="********"
                />
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="reset"
              className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Processing..." : isRegister ? "Register" : "Login"}
            </button>
          </div>
        </form>
        {message && <p className="mt-4 text-center text-red-600">{message}</p>}
      </div>
    </div>
  );
}

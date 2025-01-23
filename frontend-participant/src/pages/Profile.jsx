import React, { useState } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    git: "",
    linkdin: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post("/users/SignUP", formData);
      setLoading(false);

      if (response.data.success) {
        setMessage("User registered successfully!");
        navigate("/dashboard"); // Redirect on success
      } else {
        setMessage(response.data.message || "Registration failed.");
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
          Profile Settings
        </h1>
        <p className="mt-2 text-gray-600 text-center">
          Manage your profile information and preferences
        </p>

        <form
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mt-8"
          onSubmit={handleSubmit}
        >
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
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
        {message && <p className="mt-4 text-center text-red-600">{message}</p>}
      </div>
    </div>
  );
}

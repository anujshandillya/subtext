"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Signup = () => {
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    e.preventDefault();
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // console.log(formData);

    // TODO: Add logic to send form data to the server
    try {

    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-main bg-cover min-h-screen flex items-center justify-center bg-gray-100 font-mono">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-thin mb-6 text-center">
          Login to your account
        </h2>
        <form>
          {/* Email */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
                value={formData.email}
                onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
                value={formData.password}
                onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full font-thin rounded-md hover:bg-green-400 hover:text-black focus:outline-none"
          >
            Login
          </Button>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default Signup;

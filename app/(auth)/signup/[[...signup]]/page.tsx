import { Button } from '@/components/ui/button';
import React, { useState } from 'react';

const Signup = () => {
  // State for form fields

  // Handler for form input changes
  const handleChange = () => {};

  // Handler for form submission
  const handleSubmit = () => {
    // TODO: Add logic to send form data to the server
  };

  return (
    <div className="bg-main bg-cover min-h-screen flex items-center justify-center bg-gray-100 font-mono">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-thin mb-6 text-center">Sign Up for new account</h2>
        <form>
          {/* First Name */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
            //   value={formData.firstName}
            //   onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
            //   value={formData.lastName}
            //   onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
            //   value={formData.email}
            //   onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Username */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
            //   value={formData.username}
            //   onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
            //   value={formData.password}
            //   onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full font-thin rounded-md hover:bg-green-400 hover:text-black focus:outline-none"
          >
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
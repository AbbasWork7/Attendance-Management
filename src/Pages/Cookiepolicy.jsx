// src/components/CookiePolicy.js
import React from 'react';

export default function CookiePolicy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-blue-900 bg-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Cookie Policy</h1>
      <p className="text-sm text-center text-gray-500 mb-10">
        Effective Date: June 19, 2025 | Maintained by: Karyoun Innovations
      </p>

      <div className="prose max-w-none">
        <p className="mb-6">
          This Cookie Policy explains how <strong>Vtraco</strong> ("we", "us", or "our") uses cookies and similar technologies to recognize you when you visit our website or use our application. It explains what these technologies are and why we use them, as well as your rights to control their use.
        </p>

        <h2 className="text-xl font-semibold mb-2">1. What Are Cookies?</h2>
        <p className="mb-6">
          Cookies are small text files stored on your device (computer or mobile) when you visit a website. They help us remember your preferences and improve your user experience. Cookies may collect data such as browser type, operating system, IP address, and device identifiers.
        </p>

        <h2 className="text-xl font-semibold mb-2">2. Types of Cookies We Use</h2>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li><strong>Essential Cookies:</strong> Necessary for the website/app to function (e.g., login access).</li>
          <li><strong>Performance Cookies:</strong> Track user interactions (e.g., popular pages).</li>
          <li><strong>Functionality Cookies:</strong> Remember preferences (e.g., language settings).</li>
          <li><strong>Analytics Cookies:</strong> Used with tools like Google Analytics.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">3. Why We Use Cookies</h2>
        <p className="mb-2">We use cookies to:</p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li>Ensure platform functionality and security</li>
          <li>Improve user experience</li>
          <li>Analyze performance</li>
          <li>Remember login sessions</li>
          <li>Provide anonymized statistics</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">4. Managing Cookies</h2>
        <p className="mb-2">You can control or delete cookies:</p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li>Adjust settings in your browser under "Privacy" or "Security".</li>
          <li>Disabling cookies may limit certain features.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">5. Third-Party Cookies</h2>
        <p className="mb-6">
          Third-party services (e.g., payment gateways) may use their own cookies. These are governed by their respective policies.
        </p>

        <h2 className="text-xl font-semibold mb-2">6. Changes to This Policy</h2>
        <p className="mb-6">
          Updates will be notified via the platform. Continued use implies acceptance.
        </p>

        <h2 className="text-xl font-semibold mb-2">7. Contact Us</h2>
        <p>Email: <a href="mailto:admin@vtraco.com" className="text-blue-600 underline">admin@vtraco.com</a></p>
        <p>Phone: <a href="tel:+917550344823" className="text-blue-600 underline">+91 7550344823</a></p>
      </div>
    </div>
  );
}
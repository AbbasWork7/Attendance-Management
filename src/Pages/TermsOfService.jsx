// src/components/TermsOfService.js
import React from 'react';

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-blue-900 bg-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Terms of Service</h1>
      <p className="text-sm text-center text-gray-500 mb-10">
        Effective Date: June 19, 2025 | Maintained by: Karyoun Innovations
      </p>

      <div className="prose max-w-none">
        <p className="mb-6">
          Welcome to <strong>Vtraco</strong>, an attendance management platform developed and maintained by Karyoun Innovations. These Terms of Service ("Terms") govern your access to and use of our website, mobile application, and services (collectively, the "Service"). By using Vtraco, you agree to be bound by these Terms.
        </p>

        <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
        <p className="mb-6">
          By accessing or using Vtraco, you acknowledge that you have read, understood, and agree to be legally bound by these Terms and our <a href="#" className="text-blue-600 underline">Privacy Policy</a>. If you do not agree, please do not use the Service.
        </p>

        <h2 className="text-xl font-semibold mb-2">2. Eligibility</h2>
        <p className="mb-2">To use Vtraco, you must be:</p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li>At least 18 years old or using the service under the supervision of a legal guardian or institution.</li>
          <li>Authorized by an institution (school/college/company) that uses Vtraco for attendance tracking.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">3. User Account</h2>
        <p className="mb-2">You are responsible for:</p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li>Maintaining the confidentiality of your login credentials.</li>
          <li>All activity that occurs under your account.</li>
          <li>Ensuring the accuracy of your information.</li>
        </ul>
        <p className="mb-6">You agree to notify us immediately of any unauthorized use of your account.</p>

        <h2 className="text-xl font-semibold mb-2">4. Permitted Use</h2>
        <p className="mb-2">You agree to use Vtraco only for lawful purposes and in accordance with these Terms. You must not:</p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li>Use the platform to impersonate any person or entity.</li>
          <li>Interfere with or disrupt the integrity or performance of the Service.</li>
          <li>Attempt to gain unauthorized access to the Service or its systems.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">5. Ownership and Intellectual Property</h2>
        <p className="mb-6">
          All content, software, logos, and technology used on Vtraco are the property of Karyoun Innovations or its licensors and are protected by intellectual property laws. You may not copy, modify, distribute, or create derivative works without our written consent.
        </p>

        <h2 className="text-xl font-semibold mb-2">6. Service Availability</h2>
        <p className="mb-2">We strive to ensure uninterrupted service but do not guarantee 100% uptime. We reserve the right to:</p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li>Modify, suspend, or discontinue the Service (temporarily or permanently).</li>
          <li>Perform scheduled or emergency maintenance.</li>
        </ul>
        <p className="mb-6">We are not liable for any service interruptions or data loss.</p>

        <h2 className="text-xl font-semibold mb-2">7. Fees and Payment</h2>
        <p className="mb-6">
          If applicable, any subscription or usage fees will be clearly communicated. All prices are in INR unless otherwise specified. Refund and cancellation policies are available in our Refund Policy section.
        </p>

        <h2 className="text-xl font-semibold mb-2">8. Data & Privacy</h2>
        <p className="mb-6">
          By using Vtraco, you agree to the collection and use of your data as outlined in our <a href="#" className="text-blue-600 underline">Privacy Policy</a>. We are committed to protecting your data and only use it to enhance the functionality and security of the Service.
        </p>

        <h2 className="text-xl font-semibold mb-2">9. Termination</h2>
        <p className="mb-2">We may suspend or terminate your access to Vtraco if:</p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li>You violate these Terms.</li>
          <li>Required by law or due to a security or operational issue.</li>
        </ul>
        <p className="mb-6">You may terminate your use at any time by deleting your account or contacting us.</p>

        <h2 className="text-xl font-semibold mb-2">10. Limitation of Liability</h2>
        <p className="mb-2">To the maximum extent permitted by law:</p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li>We are not liable for any indirect, incidental, or consequential damages.</li>
          <li>Our total liability for any claims related to the Service is limited to the amount paid by you in the past 12 months.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">11. Indemnity</h2>
        <p className="mb-6">
          You agree to indemnify and hold harmless Karyoun Innovations and its team members, employees, and partners from any claims, damages, or losses resulting from your use of the Service or violation of these Terms.
        </p>

        <h2 className="text-xl font-semibold mb-2">12. Changes to Terms</h2>
        <p className="mb-6">
          We may update these Terms occasionally. Continued use of the Service after changes are posted constitutes your acceptance of the updated Terms.
        </p>

        <h2 className="text-xl font-semibold mb-2">13. Governing Law</h2>
        <p className="mb-6">
          These Terms shall be governed by and interpreted in accordance with the laws of India, with jurisdiction in Tamil Nadu.
        </p>

        <h2 className="text-xl font-semibold mb-2">14. Contact Us</h2>
        <p>Email: <a href="mailto:admin@vtraco.com" className="text-blue-600 underline">admin@vtraco.com</a></p>
        <p>Phone: <a href="tel:+917550344823" className="text-blue-600 underline">+91 7550344823</a></p>
      </div>
    </div>
  );
}
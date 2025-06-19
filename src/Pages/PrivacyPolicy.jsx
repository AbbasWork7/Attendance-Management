import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-blue-900 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
      <p className="text-sm text-center text-gray-500 mb-10">Effective Date: June 19, 2025 | Maintained by: Karyoun Innovations</p>

      <p className="mb-6">
        Welcome to <strong>Vtraco</strong>, an attendance management application developed by <strong>Karyoun Innovations</strong>. This Privacy Policy outlines how we collect, use, store, and protect your personal information.
      </p>

      <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
      <ul className="list-disc list-inside mb-6 space-y-1">
        <li><strong>Personal Information:</strong> Name, phone number, email address, profile photo (if provided), and organization details.</li>
        <li><strong>Usage Data:</strong> IP address, device type, OS, browser type, date/time stamps, and feature usage.</li>
        <li><strong>Location Data:</strong> GPS location (if enabled and required for attendance tracking).</li>
        <li><strong>Biometric Data:</strong> Processed locally (face/fingerprint) and never stored on servers.</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
      <ul className="list-disc list-inside mb-6 space-y-1">
        <li>To provide and improve the Vtraco platform</li>
        <li>Authenticate users and track attendance</li>
        <li>Send notifications via SMS/email</li>
        <li>Respond to support requests</li>
        <li>Comply with laws</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">3. Sharing Your Information</h2>
      <p className="mb-2">We do not sell or rent your data. We only share with:</p>
      <ul className="list-disc list-inside mb-6 space-y-1">
        <li>Authorized Admins (HR/schools)</li>
        <li>Confidential service providers (e.g., SMS/email)</li>
        <li>Legal authorities when required</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">4. Data Storage & Security</h2>
      <ul className="list-disc list-inside mb-6 space-y-1">
        <li>Stored on secure dedicated servers</li>
        <li>Protected via encryption, firewalls, access control</li>
        <li>Access limited to authorized personnel</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">5. Your Rights</h2>
      <ul className="list-disc list-inside mb-6 space-y-1">
        <li>Update/delete profile anytime</li>
        <li>Request data access or deletion via <a href="mailto:admin@vtraco.in" className="text-blue-600 underline">admin@vtraco.com</a></li>
        <li>Disable location in phone settings</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">6. Children’s Privacy</h2>
      <p className="mb-6">
        We don’t collect data from children under 13 without consent. If you believe data was collected by mistake, please contact us.
      </p>

      <h2 className="text-xl font-semibold mb-2">7. Policy Changes</h2>
      <p className="mb-6">
        We may update this policy and notify users via app/email. Continued use means acceptance of changes.
      </p>

      <h2 className="text-xl font-semibold mb-2">8. Contact Us</h2>
      <p>Email: <a href="mailto:admin@vtraco.in" className="text-blue-600 underline">admin@vtraco.com</a></p>
      <p>Phone: <a href="tel:+917550344823" className="text-blue-600 underline">+91 7550344823</a></p>
    </div>
  );
}
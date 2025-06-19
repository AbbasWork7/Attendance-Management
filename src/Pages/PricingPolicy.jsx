// src/components/PricingPolicy.js
import React from 'react';

export default function PricingPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-blue-900 bg-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Pricing Policy</h1>
      <p className="text-sm text-center text-gray-500 mb-10">
        Effective Date: June 19, 2025 | Maintained by: Karyoun Innovations
      </p>

      <div className="prose max-w-none">
        <p className="mb-6">
          At <strong>Vtraco</strong>, we follow a prepaid wallet system to offer flexible and cost-effective attendance management solutions. This Pricing Policy explains how wallet payments are handled, how deductions are made, and under what conditions refunds are processed.
        </p>

        <h2 className="text-xl font-semibold mb-2">1. Wallet-Based Pricing System</h2>
        <p className="mb-2">All users (institutions or organizations) are required to add funds to their Vtraco Wallet to use our services.</p>
        <p className="mb-2">Wallet funds are used to:</p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li>Add and manage employees, students, or candidates.</li>
          <li>Deduct monthly usage fees based on the number of monitored users.</li>
          <li>Access optional features and add-ons.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">2. Prepaid Usage Model</h2>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li>Charges are deducted in advance from the wallet for each user monitored per month.</li>
          <li>Services will only be activated if the wallet has sufficient balance.</li>
          <li>You will receive alerts if your wallet balance is low to avoid service disruption.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">3. Adding Funds</h2>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li>Supported payment modes: UPI, debit/credit card, net banking, and other major digital gateways.</li>
          <li>Minimum top-up amount: ₹10</li>
          <li>All wallet recharges are subject to applicable taxes (e.g., GST) at the time of payment.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">4. Refund Policy</h2>
        <h3 className="font-medium mb-1">No Refund for Used Wallet Amount</h3>
        <p className="mb-4">
          Once the amount is deducted from your wallet for any active user or feature, it is non-refundable, even if the feature is partially used or unused during the month.
        </p>
        <h3 className="font-medium mb-1">Refund for Unused Wallet Amount</h3>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li>Any unused wallet balance is eligible for a refund upon request.</li>
          <li>Refunds will be processed within 5–7 working days to the original payment method, after internal verification.</li>
          <li>To initiate a refund request, please email <a href="mailto:admin@vtraco.com" className="text-blue-600 underline">admin@vtraco.com</a> with your account and wallet details.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">5. Wallet Expiry Policy</h2>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li>Wallet balances do not expire as long as the account is active.</li>
          <li>Accounts inactive for 12 consecutive months may be deactivated, but refunds for unused balances will still be honored upon request.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">6. Price Changes</h2>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li>We may revise our per-user or feature pricing from time to time.</li>
          <li>Any updates will be communicated in advance via email or in-app notification.</li>
          <li>Existing wallet balances will continue to be honored at the rate at the time of recharge until exhausted.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">7. Contact Us</h2>
        <p>For pricing-related queries or assistance:</p>
        <p>Email: <a href="mailto:admin@vtraco.com" className="text-blue-600 underline">admin@vtraco.com</a></p>
        <p>Phone: <a href="tel:+917550344823" className="text-blue-600 underline">+91 7550344823</a></p>
      </div>
    </div>
  );
}
// src/Pages/EmployerDashboard/SubscriptionContext.js

import React, { createContext, useContext, useState } from "react";

// Create the context
const SubscriptionContext = createContext();

// Provider component
export const SubscriptionProvider = ({ children }) => {
  // ✅ Start wallet at 0
  const [wallet, setWallet] = useState(1);
  const [candidates, setCandidates] = useState([]);

  // Add new candidate
  const addCandidate = (candidate) => {
    setCandidates((prev) => [...prev, candidate]);
  };

  // Extend subscription by 30 days
  const extendCandidateSubscription = (id) => {
    setCandidates((prev) =>
      prev.map((emp) =>
        emp.id === id
          ? {
              ...emp,
              expiry: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days in ms
            }
          : emp
      )
    );
  };

  // Use one employee slot
  const useEmployeeSlot = () => {
    if (wallet > 0) {
      setWallet((prev) => prev - 1);
    }
  };

  // ✅ Recharge wallet
  const rechargeWallet = (amount) => {
    setWallet((prev) => prev + amount);
  };

  // Optional: reset wallet to 0 for testing
  const resetWallet = () => setWallet(0);

  const isSubscribed = wallet > 0;

  return (
    <SubscriptionContext.Provider
      value={{
        wallet,
        setWallet,
        rechargeWallet,
        resetWallet,
        isSubscribed,
        useEmployeeSlot,
        candidates,
        addCandidate,
        extendCandidateSubscription,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

// Custom hook to use the subscription context
export const useSubscription = () => useContext(SubscriptionContext);

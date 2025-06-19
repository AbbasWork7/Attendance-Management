// src/Pages/EmployerDashboard/SubscriptionContext.js

import React, { createContext, useContext, useState } from "react";

const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
  const [wallet, setWallet] = useState(3); // Initial wallet balance
  const [candidates, setCandidates] = useState([]);

  const addCandidate = (candidate) => {
    setCandidates((prev) => [...prev, candidate]);
  };

  const extendCandidateSubscription = (id) => {
    setCandidates((prev) =>
      prev.map((emp) =>
        emp.id === id
          ? {
              ...emp,
              expiry: Date.now() + 30 * 24 * 60 * 60 * 1000,
            }
          : emp
      )
    );
  };

  const useEmployeeSlot = () => {
    if (wallet > 0) {
      setWallet((w) => w - 1);
    }
  };

  const isSubscribed = wallet > 0;

  return (
    <SubscriptionContext.Provider
      value={{
        wallet,
        setWallet,
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

export const useSubscription = () => useContext(SubscriptionContext);

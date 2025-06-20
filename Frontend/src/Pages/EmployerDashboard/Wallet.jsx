import React, { useEffect, useRef } from "react";
import { useSubscription } from "./SubscriptionContext";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function Wallet() {
  const { wallet, rechargeWallet } = useSubscription();
  const hasShownToast = useRef(false);

  const handleRecharge = () => {
    rechargeWallet(10); // Recharge ₹10
    toast.success("✅ Wallet recharged!");
    hasShownToast.current = false; // Allow toast to show again later
  };

  useEffect(() => {
    if (wallet === 0 && !hasShownToast.current) {
      hasShownToast.current = true;

      toast.custom((t) => (
        <div className="bg-white p-4 rounded-xl shadow-xl border border-blue-300 text-center">
          <p className="text-blue-900 font-semibold">💸 Wallet is empty!</p>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              handleRecharge();
            }}
            className="mt-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-1 rounded text-sm"
          >
            Recharge Wallet
          </button>
        </div>
      ), { duration: 4000 });
    }
  }, [wallet, handleRecharge]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="bg-gradient-to-br from-blue-100 to-white border border-blue-200 shadow-lg rounded-xl p-5 w-full text-center"
    >
      <div className="text-3xl mb-2">💳</div>
      <h3 className="text-lg font-semibold text-blue-900">Wallet Balance</h3>
      <p className="text-3xl font-bold text-blue-800 mt-2">₹ {wallet}</p>

      <button
        onClick={handleRecharge}
        className="mt-4 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded transition"
      >
        Recharge Wallet
      </button>
    </motion.div>
  );
}

import React from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">

      <h1 className="text-3xl font-bold mb-4">Order Placed 🎉</h1>
      <p className="mb-6">Your order has been successfully placed.</p>

      <button 
        onClick={() => navigate("/orders")}
        className="bg-black text-white px-6 py-3"
      >
        View Your Orders 📦
      </button>

    </div>
  );
};

export default Success;
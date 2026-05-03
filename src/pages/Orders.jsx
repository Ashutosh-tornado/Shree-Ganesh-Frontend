import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/orders", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setOrders(data.orders || []);
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        toast.error("Failed to fetch orders ❌");
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Paid":
        return "bg-blue-100 text-blue-700";
      case "Shipped":
        return "bg-purple-100 text-purple-700";
      case "Delivered":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-light">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">

        <h1 className="text-4xl font-serif mb-10">Your Orders 📦</h1>

        {orders.length === 0 ? (
          <p className="text-center text-brand-dark/60">No orders yet</p>
        ) : (
          <div className="space-y-8">

            {orders.map((order, index) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white shadow p-6 rounded-lg"
              >

                {/* HEADER */}
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-brand-dark/60">
                      Order ID: {order._id.slice(-6)}
                    </p>
                    <p className="text-xs text-brand-dark/40">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>

                {/* ITEMS */}
                <div className="space-y-4">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-4">

                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />

                      <div className="flex-grow">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-brand-dark/60">
                          Qty: {item.quantity}
                        </p>
                      </div>

                      <p className="font-semibold">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </p>

                    </div>
                  ))}
                </div>

                {/* FOOTER */}
                <div className="flex justify-between mt-6 pt-4 border-t">
                  <span className="text-sm text-brand-dark/60">Total</span>
                  <span className="font-bold text-lg">
                    ₹{order.totalAmount.toLocaleString("en-IN")}
                  </span>
                </div>

              </motion.div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default Orders;
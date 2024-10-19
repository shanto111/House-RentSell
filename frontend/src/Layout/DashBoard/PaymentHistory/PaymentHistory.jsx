import React, { useContext, useEffect, useState } from "react";
import UseAxoisSecure from "../../../Hooks/UseAxoisSecure/UseAxoisSecure";
import { AuthContext } from "../../../AuthProvider/AuthProvider";

const PaymentHistory = () => {
  const axoisSecure = UseAxoisSecure();
  const { user } = useContext(AuthContext);
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      if (user?.email) {
        try {
          const res = await axoisSecure.get(`/payment/${user.email}`);
          setPaymentHistory(res.data);
        } catch (error) {
          console.error("Error fetching payment history:", error);
        }
      }
    };
    fetchPaymentHistory();
  }, [axoisSecure, user?.email]);

  const handlePrint = (payment) => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Payment Details</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          <h2>Payment Details</h2>
          <table>
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Amount</th>
                <th>Payment Date</th>
                <th>Month</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${payment.transaction}</td>
                <td>${payment.price.toFixed(2)}</td>
                <td>${new Date(payment.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}</td>
                <td>${new Date(payment.date).toLocaleDateString("en-US", {
                  month: "long",
                })}</td>
              </tr>
            </tbody>
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">
        Total Payments: {paymentHistory.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-yellow-700 text-white">
              <th className="py-3 px-5 text-left font-semibold">
                Transaction ID
              </th>
              <th className="py-3 px-5 text-left font-semibold">Amount</th>
              <th className="py-3 px-5 text-left font-semibold">
                Payment Date
              </th>
              <th className="py-3 px-5 text-left font-semibold">Month</th>
              <th className="py-3 px-5 text-left font-semibold">Print</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.length > 0 ? (
              paymentHistory.map((payment, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3 px-5">{payment.transaction}</td>
                  <td className="py-3 px-5">{payment.price.toFixed(2)}</td>
                  <td className="py-3 px-5">
                    {new Date(payment.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td className="py-3 px-5">
                    {new Date(payment.date).toLocaleDateString("en-US", {
                      month: "long",
                    })}
                  </td>
                  <td className="py-3 px-5">
                    <button
                      onClick={() => handlePrint(payment)}
                      className="bg-blue-500 text-white py-1 px-3 rounded"
                    >
                      Print
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-600">
                  No payment history available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;

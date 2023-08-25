import React, { useEffect } from "react";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { FaTrash } from "react-icons/fa";

const List = () => {
  const context = useContext(GlobalContext);
  return (
    <div className="text-center">
      <h3 className="font-bold text-xl border-b-2 border-gray-200 pb-1 mb-6">
        History
      </h3>
      <div className="overflow-y-auto max-h-40">
        <ul className="divide-y divide-gray-200">
          {context.item.map((transaction) => (
            <li
              key={transaction._id}
              className="py-3 flex items-center justify-between"
            >
              <div className="flex items-center justify-center">
                <div className="font-semibold text-lg mb-2 mr-4">
                  {transaction.text}
                </div>
                <div>
                  <span
                    className={`font-semibold  ${
                      transaction.amount < 0 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    ₹{Math.abs(transaction.amount)}
                  </span>
                </div>
              </div>
              <div className="rounded-full h-7 w-7 flex items-center justify-center">
                <button
                  className="cursor-pointer"
                  onClick={() => context.deleteTransaction(transaction._id)}
                >
                  <FaTrash className="text-gray-500" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default List;

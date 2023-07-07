import React from "react";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const List = () => {
  const context = useContext(GlobalContext);
  return (
    <div className="text-center">
      <h3 className="font-bold font-sans border-b-2 border-gray-200 pb-1 mb-6">
        Histroy
      </h3>
      <div className="overflow-y-auto max-h-40">
        <ul>
          {context.item.map((transaction) => {
            return transaction.amount < 0 ? (
              <li
                key={transaction._id}
                className="list-outside m-2 mb-2 p-2 pb-4 border-b-2 border-gray-100 font-sans"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="font-semibold text-xl mb-2 sm:mb-0 sm:mr-4">
                    {transaction.text}
                  </div>
                  <div className="flex-grow">
                    <span className="text-red-600 font-sans font-semibold">
                      ${transaction.amount}
                    </span>
                  </div>
                  <div className="hover:text-white hover:bg-red-500/95 rounded-full h-7 w-7 flex items-center justify-center mt-2 sm:mt-0">
                    <button
                      className="cursor-pointer"
                      onClick={() => context.deleteTransaction(transaction._id)}
                    >
                      x
                    </button>
                  </div>
                </div>
              </li>
            ) : (
              <li
                key={transaction._id}
                className="list-outside m-2 mb-2 p-2 pb-4 border-b-2 border-gray-100 font-sans"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="font-semibold text-xl mb-2 sm:mb-0 sm:mr-4">
                    {transaction.text}
                  </div>
                  <div className="flex-grow">
                    <span className="text-green-600 font-sans font-semibold">
                      ${transaction.amount}
                    </span>
                  </div>
                  <div className="hover:text-white hover:bg-red-500/95 rounded-full h-7 w-7 flex items-center justify-center mt-2 sm:mt-0">
                    <button
                      className="cursor-pointer"
                      onClick={() => {
                        context.deleteTransaction(transaction._id);
                        context.getTransaction();
                      }}
                    >
                      x
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default List;

import React from "react";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const List = () => {
  const context = useContext(GlobalContext);
  return (
    <div className="text-center">
      <h3 className="font-bold font-sans  border-b-2  border-gray-200 pb-1 mb-6">
        Histroy
      </h3>
      <ul>
        {context.item.map((transaction) => {
          return transaction.amount < 0 ? (
            <li
              key={transaction.id}
              className="list-outside m-2 mb-2 p-2 pb-4 border-b-2 border-gray-100 font-sans"
            >
              <div className="flex ">
                <div className="font-semibold text-xl">{transaction.text} </div>
                <div className="grow">
                  <span className="text-red-600 font-sans font-semibold">
                    ${transaction.amount}
                  </span>
                </div>
                <div className="hover:text-white hover:bg-red-500/95 rounded-full h-7 w-7">
                  <button
                    className="cursor-pointer"
                    onClick={() => context.deleteTransaction(transaction.id)}
                  >
                    x
                  </button>
                </div>
              </div>
            </li>
          ) : (
            <li
              key={transaction.id}
              className="list-outside m-2 mb-2 p-2 pb-4 border-b-2 border-gray-100 font-sans"
            >
              <div className="flex ">
                <div className="font-semibold text-xl">{transaction.text} </div>
                <div className="grow">
                  <span className="text-green-600 font-sans font-semibold">
                    ${transaction.amount}
                  </span>
                </div>
                <div className="hover:text-white hover:bg-red-500/95 rounded-full h-7 w-7">
                  <button
                    className="cursor-pointer"
                    onClick={() => context.deleteTransaction(transaction.id)}
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
  );
};

export default List;

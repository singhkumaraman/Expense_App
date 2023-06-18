import React from "react";
import { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const AddTransaction = () => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);
  const context = useContext(GlobalContext);

  function onSubmit(e) {
    e.preventDefault();

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: +amount,
    };
    if (amount !== 0 && text !== "") {
      context.addTransaction(newTransaction);
    }
  }
  return (
    <>
      <h3 className="font-semibold  mt-4 mb-2 border-b-2  border-gray-300 shadow-sm pb-1 text-center">
        Add New Transaction
      </h3>

      <form>
        <div>
          <span className="ml-2 font-sans font-semibold">Text:</span>
          <div className="p-1 border hover:border-2 border-black rounded-md m-2 ">
            <input
              className="w-full outline-none"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text..."
            ></input>
          </div>
          <span className="ml-2 font-sans font-semibold">Amount:</span>
          <div className="p-1 border hover:border-2 border-black rounded-md m-2">
            <input
              className="w-full outline-none"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount..."
            />
          </div>
        </div>
        <button
          className="ml-2 mt-2 py-1 px-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg"
          onClick={onSubmit}
        >
          Add Transaction
        </button>
      </form>
    </>
  );
};

export default AddTransaction;

import React from "react";
import { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const AddTransaction = () => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);
  const context = useContext(GlobalContext);
  const id = context.user_id;
  function onSubmit(e) {
    // e.preventDefault();
    if (amount !== 0 && text !== "") {
      context.addTransaction(text, amount, id);
    }
  }
  return (
    <div className="mx-auto max-w-sm">
      <h3 className="font-semibold mt-4 mb-2 border-b-2 border-gray-300 shadow-sm pb-1 text-center">
        Add New Transaction
      </h3>

      <form>
        <div className="mb-4">
          <label className="ml-2 font-sans font-semibold">Text:</label>
          <div className="flex items-center border border-gray-300 rounded-md m-2 hover:border-black">
            <input
              className="w-full p-2 outline-none bg-transparent"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text..."
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="ml-2 font-sans font-semibold">Amount:</label>
          <div className="flex items-center border border-gray-300 rounded-md m-2 hover:border-black">
            <input
              className="w-full p-2 outline-none bg-transparent"
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
    </div>
  );
};

export default AddTransaction;

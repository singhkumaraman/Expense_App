import { createContext, useEffect, useReducer, useState } from "react";

const initialState = {
  user: null,
  user_id: null,
  token: null,
  setAuthToken: () => {},
  setUserId: () => {},
  setUser: () => {},
  item: [],
  logout: () => {},
  addTransaction: () => {},
  deleteTransaction: () => {},
  incomeMonthWise: [],
  expenseMonthWise: [],
  setIncomeMothWise: () => {},
  setExpenseMonthWise: () => {},
  reload: false,
  setReload: () => {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return {
        ...state,
        item: [action.payload, ...state.item],
      };
    case "DELETE_TRANSACTION":
      return {
        ...state,
        item: state.item.filter(
          (transaction) => transaction.id !== action.payload
        ),
      };
    case "GET_TRANSACTION":
      return {
        ...state,
        item: action.payload,
      };
    default:
      return state;
  }
};

export const GlobalContext = createContext(initialState);

export function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [authToken, setAuthToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [incomeMonthWise, setIncomeMothWise] = useState([]);
  const [expenseMonthWise, setExpenseMonthWise] = useState([]);
  const [reload, setReload] = useState(false);

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("user_id");
    setAuthToken(null);
    setUserId(null);
    setUser(null);
  };

  const update = () => {
    setAuthToken(JSON.parse(localStorage.getItem("authToken")));
    setUserId(JSON.parse(localStorage.getItem("user_id")));
    setUser(JSON.parse(localStorage.getItem("user")));

    const savedTransactions = JSON.parse(localStorage.getItem("transactions"));
    if (savedTransactions) {
      dispatch({
        type: "GET_TRANSACTION",
        payload: savedTransactions,
      });
    }
  };

  const addTransaction = async (
    id,
    amount,
    description,
    date,
    category,
    transactionType
  ) => {
    const response = await fetch("http://localhost:5000/api/expense", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        id: id,
        amount: amount,
        description: description,
        category: category,
        date: date,
        transactionType: transactionType,
      }),
    });

    if (response.status === 200) {
      const data = await response.json();
      dispatch({
        type: "ADD_TRANSACTION",
        payload: data,
      });
    }
  };
  const deleteTransaction = async (id) => {
    const response = await fetch(`http://localhost:5000/api/expense/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (response.status === 200) {
      dispatch({
        type: "DELETE_TRANSACTION",
        payload: id,
      });
      getTransaction();
    }
  };

  const getTransaction = async () => {
    if (!authToken) return;
    const response = await fetch("http://localhost:5000/api/expense/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (response.status === 200) {
      const data = await response.json();
      dispatch({
        type: "GET_TRANSACTION",
        payload: data,
      });
    }
  };

  const getAnalytics = async () => {
    const response = await fetch(
      "http://localhost:5000/api/expense/analytics",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    if (response.status === 200) {
      const data = await response.json();
      setIncomeMothWise(data.incomeMonthWise);
      setExpenseMonthWise(data.expenseMonthWise);
    } else {
      throw new Error("Invalid request");
    }
  };

  const contextValue = {
    item: state.item,
    user: user,
    user_id: userId,
    token: authToken,
    setAuthToken,
    setUserId,
    setUser,
    logout,
    addTransaction,
    deleteTransaction,
    getTransaction,
    getAnalytics,
    incomeMonthWise,
    expenseMonthWise,
    setIncomeMothWise,
    setExpenseMonthWise,
    reload,
    setReload,
  };

  useEffect(() => {
    update();
  }, [update]);
  useEffect(() => {
    if (authToken) {
      getTransaction();
      getAnalytics();
    }
  }, [authToken]);
  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
}

import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { useEffect } from "react";

// Atoms (Global States)
export const authTokenState = atom({
  key: "authTokenState",
  default: localStorage.getItem("authToken")
    ? JSON.parse(localStorage.getItem("authToken"))
    : null,
});

export const userIdState = atom({
  key: "userIdState",
  default: localStorage.getItem("user_id")
    ? JSON.parse(localStorage.getItem("user_id"))
    : null,
});

export const userState = atom({
  key: "userState",
  default: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
});

export const transactionsState = atom({
  key: "transactionsState",
  default: [],
});

export const incomeMonthWiseState = atom({
  key: "incomeMonthWiseState",
  default: [],
});

export const expenseMonthWiseState = atom({
  key: "expenseMonthWiseState",
  default: [],
});

export const reloadState = atom({
  key: "reloadState",
  default: false,
});

// Hooks for using Recoil states
export function useAuth() {
  const [authToken, setAuthToken] = useRecoilState(authTokenState);
  const [userId, setUserId] = useRecoilState(userIdState);
  const [user, setUser] = useRecoilState(userState);

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("user_id");
    setAuthToken(null);
    setUserId(null);
    setUser(null);
  };

  return { authToken, setAuthToken, userId, setUserId, user, setUser, logout };
}

export function useTransactions() {
  const [transactions, setTransactions] = useRecoilState(transactionsState);
  const authToken = useRecoilValue(authTokenState);

  const addTransaction = async (text, amount, id) => {
    const response = await fetch("http://localhost:5000/api/expense", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
      body: JSON.stringify({ id, text, amount }),
    });
    if (response.status === 200) {
      const data = await response.json();
      setTransactions((prev) => [data.data, ...prev]);
    }
  };

  const deleteTransaction = async (id) => {
    const response = await fetch(`http://localhost:5000/api/expense/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
    });
    if (response.status === 200) {
      setTransactions((prev) =>
        prev.filter((transaction) => transaction.id !== id)
      );
    }
  };

  const getTransactions = async () => {
    const response = await fetch("http://localhost:5000/api/expense", {
      method: "GET",
      headers: { Authorization: authToken },
    });
    if (response.status === 200) {
      const data = await response.json();
      setTransactions(data);
    }
  };

  return { transactions, addTransaction, deleteTransaction, getTransactions };
}

export function useAnalytics() {
  const [incomeMonthWise, setIncomeMonthWise] =
    useRecoilState(incomeMonthWiseState);
  const [expenseMonthWise, setExpenseMonthWise] = useRecoilState(
    expenseMonthWiseState
  );
  const authToken = useRecoilValue(authTokenState);

  const getAnalytics = async () => {
    const response = await fetch(
      "http://localhost:5000/api/expense/analytics",
      {
        method: "GET",
        headers: { Authorization: authToken },
      }
    );
    if (response.status === 200) {
      const data = await response.json();
      setIncomeMonthWise(data.incomeMonthWise);
      setExpenseMonthWise(data.expenseMonthWise);
    } else {
      throw new Error("Invalid request");
    }
  };

  return { incomeMonthWise, expenseMonthWise, getAnalytics };
}

export function useReload() {
  const [reload, setReload] = useRecoilState(reloadState);
  return { reload, setReload };
}

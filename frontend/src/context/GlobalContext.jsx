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
  //Register User....
  const signup = async (name, password, email) => {
    if (name == "" || password === "" || email === "") {
      alert("Please Enter all the fields");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      if (!data || data.error || response.status == 400) {
        alert("There was some error");
      } else {
        alert("User Created Successfully");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("user_id");
    setAuthToken(null);
    setUserId(null);
    setUser(null);
  };
  const update = () => {
    // if (authToken === null) logout();
    setAuthToken(JSON.parse(localStorage.getItem("authToken")));
    setUserId(JSON.parse(localStorage.getItem("user_id")));
    setUser(JSON.parse(localStorage.getItem("user")));
  };
  //Actions....
  // #Add Transaction Method....
  const addTransaction = async (text, amount, id) => {
    const response = await fetch("http://localhost:5000/api/expense", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ id: id, text: text, amount: amount }),
    });

    if (response.status === 200) {
      dispatch({
        type: "ADD_TRANSACTION",
        payload: response.data.data,
      });
    }
  };
  // #Delete Transaction Method.....
  const deleteTransaction = async (id) => {
    const response = await fetch(
      "http://localhost:5000/api/expense" + `/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    if (response.status === 200) {
      dispatch({
        type: "DELETE_TRANSACTION",
        payload: id,
      });
    }
  };

  const getTransaction = async () => {
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

  //  #Globally Available Values....
  const contextValue = {
    item: state.item,
    user: user,
    user_id: userId,
    token: authToken,
    setAuthToken: setAuthToken,
    setUserId: setUserId,
    setUser: setUser,
    logout: logout,
    signup,
    logout,
    addTransaction,
    deleteTransaction,
    getTransaction,
  };
  useEffect(() => {
    update();
  }, []);
  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
}

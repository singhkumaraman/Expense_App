import { createContext, useEffect, useReducer, useState } from "react";
import jwt_decode from "jwt-decode";

const initialState = {
  user: null,
  user_id: null,
  token: null,
  setAuthToken: () => {},
  setUserId: () => {},
  setUser: () => {},
  item: [],
  // login: () => {},
  // signup: () => {},
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
        // loading: false,
        item: action.payload,
      };
    default:
      return state;
  }
};

export const GlobalContext = createContext(initialState);

export function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [authToken, setAuthToken] = useState(() => {
    localStorage.getItem("authToken")
      ? JSON.parse(localStorage.getItem("authToken"))
      : null;
  });
  const [userId, setUserId] = useState(
    localStorage.getItem("authToken")
      ? jwt_decode(localStorage.getItem("authToken"))._id
      : null
  );
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  //Register User....
  const signup = async (name, email, password) => {
    if (name == "" || password === "" || email === "") {
      alert("Please Enter all the fields");
      return;
    }
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
    if (response.status === 200) {
      alert("User Created Successfully");
    } else {
      alert("User Already Exists");
    }
  };
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setAuthToken(null);
    setUserId(null);
    setUser(null);
  };
  const update = () => {
    if (authToken === null) logout();
    // setUserId(jwt_decode(localStorage.getItem("authToken"))._id);
    setAuthToken(JSON.parse(localStorage.getItem("authToken")));
    setUser(JSON.parse(localStorage.getItem("user")));
  };
  //Actions....
  // #Add Transaction Method....
  const addTransaction = (item) => {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: item,
    });
  };
  // #Delete Transaction Method.....
  const deleteTransaction = (id) => {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });
  };

  const getTransaction = async () => {
    const res = fetch("");
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
    // signup: signup,
    logout: logout,
    // login,
    signup,
    logout,
    addTransaction,
    deleteTransaction,
  };
  // useEffect(() => {
  //   update();
  // }, []);
  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
}

import { createContext, useState } from "react";
import jwtDecode from "jwt-decode";

export const ContextData=createContext()


export const Context_Provider = ({ children }) => {
  const [user,setUser]=useState(localStorage.getItem('User') ? jwtDecode(localStorage.getItem('User')) : null )
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [whishlist,setWhishList]=useState([]);

  const check_Validation = (event, fun_name, setState) => {
    const form = event.currentTarget;
    event.preventDefault();
    setState(true);
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return false;
    } else {
      fun_name();
      return true;
    }
  };

  const allObj={
    whishlist,
    setWhishList,
  };
  return (
    <ContextData.Provider value={{check_Validation, isLoggedIn, setIsLoggedIn ,setUser,user,allObj}}>
      {children}
    </ContextData.Provider>
  );
};

export default Context_Provider;

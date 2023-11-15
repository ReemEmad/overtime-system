import React, { createContext, useEffect, useState } from "react";
type UserData = {
  email: string;
  id: string;
  image: null;
  name: string;
  phone: string;
  skill_list: any[];
  squadlead_name: string;
  work_location: string;
  work_title: string;

  // Add more user data properties as needed
};
type UserContextValue = {
  userData: UserData | undefined;
  updateUserData: (newUserData: any) => void;
};

const UserContext = createContext<UserContextValue>({
  userData: {
    name: "",
    id: "",
    email: "",
    image: null,
    phone: "",
    skill_list: [""],
    squadlead_name: "",
    work_location: "",
    work_title: "",
  },
  updateUserData: () => {},
});

type props = {
  // initialUserData: UserData;
  children?: JSX.Element | Array<JSX.Element>;
};

// Create a context provider component
const UserProvider = ({ children }: props) => {
  // Define the user data state
  const [userData, setUserData] = useState<UserData | undefined>();

  const updateUserData = (newUserData: UserData | undefined) => {
    console.log("~ doing something");
    setUserData(newUserData);
  };

  const value = {
    userData,
    updateUserData,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };

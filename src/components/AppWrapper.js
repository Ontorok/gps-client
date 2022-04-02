import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/actions/Auth";

const AppWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const [isPageLoaded, setIsPageLoaded] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("loggedIn");
    if (token) {
      setIsPageLoaded(false);
      setTimeout(() => {
        dispatch(setAuthUser({ name: "admin", role: "admin" }));
        setIsPageLoaded(true);
      }, 1000);
    } else {
      dispatch(setAuthUser(null));
    }
  }, [dispatch]);

  if (!isPageLoaded) {
    return (
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          zIndex: 1,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return <div>{children}</div>;
};

export default AppWrapper;

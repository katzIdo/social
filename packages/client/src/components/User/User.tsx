import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Login from "../forms/Login/Login";

const User = () => {
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(false);

  const handleUserStatus = () => {
    !isLogin && history.push("/login");
  };

  return (
    <div>
      <Button color="inherit" onClick={handleUserStatus}>
        {isLogin ? "Logout" : "Login"}
      </Button>
      {!isLogin ? <Button color="inherit">Sign Up</Button> : null}
    </div>
  );
};

export default User;

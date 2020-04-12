import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Login from "../forms/Login/Login";

const User = () => {
  const [isLogin, setIsLogin] = useState(false);

  const handleLogin = () => {
    setIsLogin(true);
  };

  return (
    <div>
      <Button color="inherit" onClick={handleLogin}>
        Login
      </Button>
      <Button color="inherit">Register</Button>
      {isLogin ? <Login /> : null}
    </div>
  );
};

export default User;

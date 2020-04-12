import React, { useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import { appStyle } from "../../styles/app";

const AppMenu = () => {
  const classes = appStyle();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
      >
        <MenuIcon onClick={handleClick} />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link className={classes.link} to="/">
            Home
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link className={classes.link} to="/myAccount">
            My account
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link className={classes.link} to="/about">
            About
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link className={classes.link} to="/contact">
            Contact
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default AppMenu;

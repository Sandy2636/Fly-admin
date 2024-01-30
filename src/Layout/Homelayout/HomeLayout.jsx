import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import { IoMdOpen } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import "./homeLayout.scss";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../Components/Sidebar/Sidebar";
import { IconButton, SwipeableDrawer } from "@mui/material";
import BreadCrumbs from "../../Components/BreadCrumbs/BreadCrumbs";

function HomeLayout(props) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const signOut = () => {
    // localStorage.removeItem("isUserLoggedIn");
    localStorage.clear();
    navigate("/login")
  }

  return (
    <div className="homeLayoutContainer">
      <Sidebar />
      <SwipeableDrawer open={open} onClose={() => setOpen(false)}>
        <div
          style={{
            background: "#21222c",
            height: "100%",
            width: "100%",
            minWidth: "250px",
          }}
        >
          <Sidebar display={true} />
        </div>
      </SwipeableDrawer>

      <div style={{ flex: "5", padding: "2vh 16px", maxWidth: "100vw" }}>
        <div className="navbar">
          <div>
            <div
              className="opt"
              onClick={() => {
                setOpen(true);
              }}
            >
              {/* <IconButton onClick={() => {}}> */}
              <MenuIcon color="light" />
              {/* </IconButton> */}
            </div>
          </div>
          <div className="nav_options">
            <button className="navlink" style={{backgroundColor:"#8D8D8D", color:'white',border:'none',borderRadius:"7px",marginRight:'15px'}}>flybet9.com <IoMdOpen/> </button>
            <button className="navlink" style={{backgroundColor:"#735cff",color:"white",border:'none',borderRadius:"7px"}} onClick={signOut}>Sign out <MdLogout/></button>
          </div>
        </div>
        <BreadCrumbs />
        {props.child}
      </div>
    </div>
  );
}

export default HomeLayout;

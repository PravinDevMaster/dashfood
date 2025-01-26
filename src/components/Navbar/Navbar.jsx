import { useCallback, useState } from "react";
import classes from "./Navbar.module.css";
import { Close, Menu } from "../../assets/svg/svgComponents";
import { useNavigate } from "react-router";
import logo from "../../assets/png/logo.png";
import { ChefHat } from "lucide-react";
const Navbar = () => {
  const [show, setShow] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        top: 0,
        zIndex: "10000",
      }}
    >
      <header className={classes.header}>
        <div
          className={`${classes["web-name"]}`}
          onClick={() => {
            navigate("/");
          }}
        >
          <ChefHat />
          DishDash
        </div>
        <p className={classes["menu-bar"]}>
          <span
            onClick={(e) => {
              setAnchorEl(e.currentTarget);
              setShow((pre) => !pre);
            }}
          >
            {!show ? <Menu /> : <Close />}
          </span>

          {/* */}
        </p>
        <nav
          className={`${classes.nav} ${show ? classes.active : null}`}
          style={{
            top: anchorEl ? anchorEl.offsetTop + anchorEl.offsetHeight : 0,
            right: "80px",
          }}
        >
          <a
            className={`fs-m`}
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </a>
          <a
            className={`fs-m`}
            onClick={() => {
              navigate("/favourite");
            }}
          >
            Favourite
          </a>
        </nav>
      </header>
    </div>
  );
};
export default Navbar;

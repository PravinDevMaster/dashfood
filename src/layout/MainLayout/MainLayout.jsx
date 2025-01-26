//components
import { Outlet } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";

//css
import classes from "./MainLayout.module.css";

const MainLayout = () => {
  return (
    <>
      <div className={`${classes["main"]}`}>
        <div>
          <Navbar />
        </div>
        <div className={`${classes["container"]}`}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayout;

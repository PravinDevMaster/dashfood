import React, { useState } from "react";

import Popover from "@mui/material/Popover";
import zIndex from "@mui/material/styles/zIndex";

export default function MuiPopover(props) {
  const popoverStyle = {
    "& .MuiPaper-root.MuiPopover-paper": {
      borderRadius: "8px",
      backgroundColor: "var(--primary-clr)",
      boxShadow:
        "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
      padding: "16px",
      marginTop: "8px",
      ...props.sx,
    },
    "&": {
      // zIndex: "50",
    },
  };
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const TriggerComponent = props?.trigger?.component;
  const NewChild = React.cloneElement(props.children ? props.children : <></>, {
    close: handleClose,
  });
  return (
    <>
      {props.trigger && (
        <TriggerComponent
          aria-describedby={id}
          onClick={handleClick}
          {...props.trigger.props}
        />
      )}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={popoverStyle}
      >
        {/* {props.children} */}
        {NewChild}
      </Popover>
    </>
  );
}

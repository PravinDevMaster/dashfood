import { useState } from "react";
import classes from "./IconImage.module.css";
import { ImageIcon } from "lucide-react";
const IconImage = ({ url }) => {
  const [error, setError] = useState(false);
  return (
    <div className={`${classes["img-div"]}`}>
      {!error && (
        <img
          src={url}
          alt="img"
          onError={() => {
            console.log("helloerror");

            setError(true);
          }}
        />
      )}
      {error && <ImageIcon />}
    </div>
  );
};

export default IconImage;

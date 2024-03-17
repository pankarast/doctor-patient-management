import React from "react";
import "./Loader.scss";

function Loader({ size }) {
  return (
    <div className={`${size}-loader loader-container`}>
      <div className="spinner"></div>
    </div>
  );
}

export default Loader;

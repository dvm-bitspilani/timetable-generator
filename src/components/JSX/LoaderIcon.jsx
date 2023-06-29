import React from "react";
import styles from "../CSS/LoaderIcon.module.css";
const LoaderIcon = ({title}) => {
  return (
    <div className={styles["loader-wrapper"]}>
      <div className={styles["loader-icon"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <h3>{title}</h3>
    </div>
  );
};

export default LoaderIcon;

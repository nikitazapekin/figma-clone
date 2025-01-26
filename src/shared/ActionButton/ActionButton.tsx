import React from "react";
import styles from "./ActionButton.module.scss";

interface ActionButtonProps {
  text: string;
  link: string;
  handleSubmit: () => void;  
}

const ActionButton = ({ text, link, handleSubmit }: ActionButtonProps) => {
  return (
    <div className={styles.button} onClick={handleSubmit}>  
      {text}
    </div>
  );
};

export default ActionButton;

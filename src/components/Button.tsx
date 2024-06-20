import React from "react";
import "./Button.css";

interface ButtonProps {
  text: string;
}

const Button: React.FC<ButtonProps> = ({ text }) => {
  return (
    <>
      <a href="#" className="btn btn--orange btn--radius">
        {text}
      </a>
    </>
  );
};

export default Button;

import React from "react";
import "./Card.css";
import testImage from "./../assets/migi.jpeg";

const Card = () => {
  return (
    <div className="card">
      <img src={testImage} alt="Card" className="card-image" />
      <div className="overlay">
        <p className="text">サイトタイトル</p>
      </div>
    </div>
  );
};

export default Card;

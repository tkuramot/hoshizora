import React from "react";
import "./PolygonCard.css";

const PolygonCard: React.FC = () => {
  const rgba = "rgba(153, 204, 255)";
  return (
    <svg width="50vw" height="95vh">
      <rect
        x="0"
        y="0"
        width="40vw"
        height="95vh"
        fill="white"
        rx="30"
        ry="30"
      />
      <rect
        x="0"
        y="0"
        width="32vw"
        height="45vw"
        fill={rgba}
        rx="30"
        ry="30"
      />
      <rect
        x="25vw"
        y="8vw"
        width="15vw"
        height="50vh"
        fill={rgba}
        rx="30"
        ry="30"
      />
      <rect
        x="0vw"
        y="40vh"
        width="40vw"
        height="55vh"
        fill={rgba}
        rx="30"
        ry="30"
      />
      <rect x="27vw" y="10vh" width="8vw" height="8vw" fill={rgba} />
      <rect
        x="32vw"
        y="0vh"
        width="8vw"
        height="8vw"
        fill="white"
        rx="30"
        ry="30"
      />
    </svg>
  );
};

export default PolygonCard;

import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const HomePage = () => {
  const buttonStyle = {
    position: "absolute",
    top: "3%",
    left: "93%",
    zIndex: 3,
  };

  const backgroundStyle = {
    position: "relative",
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
  };

  const backgroundImageStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: "url(src/assets/background.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: 1,
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(64, 0, 0, 0.1)",
    zIndex: 2,
  };

  const contentStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 3,
    color: "rgba(247, 233, 233)",
    textAlign: "center",
    writingMode: "vertical-rl",
    fontSize: "2rem",
    fontWeight: "bold",
    backgroundStyle: "rgba(64, 0, 0, 0.1)",
  };

  // const na = {
  //   position: "absolute",
  //   top: 0,
  //   width: "100%",
  //   height: "100%",
  //   backgroundColor: "rgba(64, 0, 0, 0.1)",
  //   zIndex: 2,
  // };

  const auth = useAuth();

  return (
    <div style={backgroundStyle}>
      {auth.user
        ? (
          <Link
            style={buttonStyle}
            className="text-indigo-600 underline hover:text-blue-700"
            to="/logout"
          >
            ログアウト
          </Link>
        )
        : (
          <Link
            style={buttonStyle}
            className="text-indigo-600 underline hover:text-blue-700"
            to="/login"
          >
            ログイン
          </Link>
        )}
      <div style={backgroundImageStyle}></div>
      <div style={overlayStyle}></div>
      <div style={contentStyle}>こ は る さ ん の 本 棚</div>
    </div>
  );
};

export default HomePage;

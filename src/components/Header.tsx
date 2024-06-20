import Button from "./Button";
import "./Header.css";
import hon from "../assets/image.png";

const Header = () => {
  return (
    <>
      <header>
        <img src={hon} alt="hon" />
        <Button text="HOME" />
        <Button text="LIKE" />
        <Button text="SAMPLE" />
        <Button text="SAMPLE" />
      </header>
    </>
  );
};

export default Header;

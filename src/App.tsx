import "./App.css";
import Card from "./components/Card";
import PolygonCard from "./components/PolygonCard";

function App() {
  return (
    <>
      <div className="container">
        <div className="left">
          <p>iii</p>
        </div>
        <div className="center">
          <PolygonCard />
        </div>
        <div className="right">
          <Card />
        </div>
      </div>
    </>
  );
}

export default App;

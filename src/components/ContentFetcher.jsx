import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL =
  "https://aozorahack.org/aozorabunko_text/cards/000081/files/45630_txt_23610/45630_txt_23610.txt";

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL, {
          responseType: "arraybuffer",
        });

        const decoder = new TextDecoder("Shift_JIS");
        const decodedText = decoder.decode(response.data);

        setData(decodedText);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  console.log(data);

  return <div>{data ? <pre>{data}</pre> : <p>Loading...</p>}</div>;
};

export default App;

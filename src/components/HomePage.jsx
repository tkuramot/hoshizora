import { useState } from "react";
import ContentFetcher from "./ContentFetcher";

export default function HomePage() {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const removePattern = (originalString) => {
    const pattern = /-{55}[\s\S]*?-{55}/g;
    return originalString.replace(pattern, "");
  };

  const removePattern1 = (originalString) => {
    const pattern = /底本：[\s\S]*/;
    return originalString.replace(pattern, "");
  };

  const formatText = (text) => {
    const cleanedText = removePattern(removePattern1(text));
    const regex = /.{1,30}/g; // 30文字ごとに改行するための正規表現
    const formattedText = cleanedText.match(regex)?.join("\n") || "";
    const lines = formattedText.split("\n");
    const start = currentPage * 10;
    const end = start + 10;
    return lines.slice(start, end).join("\n");
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  console.log(data);

  if (data) console.log(formatText(data));

  return (
    <div className="background">
      <div className="background-image"></div>
      <div className="overlay"></div>

      <ContentFetcher setData={setData} />

      {data && (
        <>
          <div className="content">
            <button onClick={handlePrev} disabled={currentPage === 0}>
              Prev
            </button>
            <pre>{formatText(data)}</pre>
            <div>
              <div>
                <button onClick={handleNext}>Next</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

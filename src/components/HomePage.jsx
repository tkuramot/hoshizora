import { useEffect, useState } from "react";
import ContentFetcher from "./ContentFetcher";
import "./HomePage.css";

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
    const regex = /.{1,30}/g;
    const formattedText = cleanedText.match(regex)?.join("\n") || "";
    const lines = formattedText.split("\n");
    const start = currentPage * 15;
    const end = start + 15;
    return lines.slice(start, end).join("\n");
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  // デバッグ用
  useEffect(() => {
    console.log("data:", data);
    if (data) console.log("formattedText:", formatText(data));
  }, [data, currentPage]);

  return (
    <>
      <div className="background">
        <div className="overlay"></div>
        <ContentFetcher setData={setData} />
        <div className="content-container">
          <button className="next-button" onClick={handleNext}>
            つぎへ
          </button>

          {data && (
            <div className="content">
              <pre>{formatText(data)}</pre>
            </div>
          )}

          <button
            className="prev-button"
            onClick={handlePrev}
            disabled={currentPage === 0}
          >
            もどる
          </button>
        </div>
      </div>
    </>
  );
}

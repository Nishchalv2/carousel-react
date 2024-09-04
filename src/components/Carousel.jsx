import { useState, useEffect, useRef } from "react";
import data from "../data.json";

const DATA_LENGTH = data.length;

export default function Carousel() {
  const [index, setIndex] = useState(0);
  const ref = useRef(null);

  function handlePrev() {
    if (index == 0) {
      setIndex(DATA_LENGTH - 1);
    } else {
      setIndex(index - 1);
    }
  }

  function handleNext() {
    setIndex((prevIndex) => {
      if (prevIndex == DATA_LENGTH - 1) {
        return 0;
      } else {
        return prevIndex + 1;
      }
    });
  }

  useEffect(() => {
    ref.current = setInterval(handleNext, 1000);

    return () => {
      clearInterval(ref.current);
    };
  }, []);
  return (
    <div
      className="container"
      onMouseEnter={() => clearInterval(ref.current)}
      onMouseLeave={() => (ref.current = setInterval(handleNext, 1000))}
    >
      <div className="left-btn" onClick={handlePrev}>
        {"<"}
      </div>
      <img src={data[index].download_url} />
      <div className="right-btn" onClick={handleNext}>
        {">"}
      </div>
    </div>
  );
}

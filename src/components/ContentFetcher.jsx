import React, { useState, useEffect } from "react";
import axios from "axios";
import bookData from "../assets/book.json";

const ContentFetcher = ({ setData }) => {
  const getRandomNumber = () => {
    return Math.floor(Math.random() * 61);
  };

  const API_URL = bookData[getRandomNumber()];

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
};

export default ContentFetcher;

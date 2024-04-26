"use client";
import Image from "next/image";
import { useState } from "react";
import Navbar from "../components/Navbar";
import ChatBot from "../components/ChatBot";

const MlModel = () => {
  const [response, setResponse] = useState("...");

  const handleSubmit = async (message) => {
    // Send POST request to Flask backend
    const res = await fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setResponse(data.answer);
  };
  return (
    <div>
      <Navbar />
      ML model goes here
      <ChatBot onSubmit={handleSubmit} />
      {response && <p>Response: {response}</p>}
    </div>
  );
};

export default MlModel;

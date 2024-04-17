"use client"
import Image from "next/image";
import ChatBot from "./components/ChatBot";
import { useState } from "react";

export default function Home() {
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>Chatbot</h1>
        <ChatBot onSubmit={handleSubmit} />
        {response && <p>Response: {response}</p>}
      </div>
    </main>
  );
}

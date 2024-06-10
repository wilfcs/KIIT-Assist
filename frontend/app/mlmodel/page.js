
"use client";
import Image from "next/image";
import { useState } from "react";
import Navbar from "../components/Navbar";
import universityLogo from "@/public/KIIT-logo-HD.png";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const MlModel = () => {
  const [inputValue, setInputValue] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const { transcript, browserSupportsSpeechRecognition, resetTranscript } =
    useSpeechRecognition();

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
    setInputValue(transcript);
  };

  const stopListeningHandler = () => {
    SpeechRecognition.stopListening();
    setInputValue(transcript)
  };

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userMessage = { text: inputValue, type: "user" };
    setChatHistory([...chatHistory, userMessage]);

    setInputValue("");

    try {
      const res = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputValue }),
      });

      const data = await res.json();
      const botResponse = { text: data.answer, type: "bot" };
      setChatHistory([...chatHistory, userMessage, botResponse]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="pt-20">
        <div className="chatbot-container">
          <div className="chat-header flex">
            <Image
              src={universityLogo}
              alt="KIIT Logo"
              className="kiit-logo size-2"
            />
            <h2 className="text-white">ML Model Chatbot</h2>
          </div>
          <div className="chat-messages">
            {chatHistory.map((message, index) => (
              <div
                key={index}
                className={`message ${
                  message.type === "user" ? "user-message" : "bot-message"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="chat-input-container">
              <input
                type="text"
                className="chat-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
              />
              <div className="chat-submit">
                <button type="submit">Send</button>
              </div>
            </div>
            <div className="transcriptButtons">
              <button type="button" onClick={startListening}>
                Start Listening
              </button>
              <button type="button" onClick={stopListeningHandler}>
                Stop Listening
              </button>
            </div>
          </form>
        </div>
      </div>
      <div
        className={`transcript-box ${transcript ? "active" : ""}`}
        onClick={() => setInputValue(transcript)}
      >
        {transcript}
      </div>
    </div>
  );
};

export default MlModel;
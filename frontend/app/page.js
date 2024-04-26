"use client"
import BotpressBot from "./components/BotpressBot";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <main className="">
      <div>
        <Navbar/>
        <h1>Chatbot</h1>
      </div>
      <BotpressBot/>
    </main>
  );
}

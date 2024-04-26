"use client";
import { useEffect } from "react";

const BotpressBot = () => {
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src = process.env.NEXT_PUBLIC_BOTPRESS_WEBCHAT_INJECT_SCRIPT_URL;
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement("script");
    script2.src = process.env.NEXT_PUBLIC_BOTPRESS_WEBCHAT_CONFIG_SCRIPT_URL;
    script2.async = true;
    script2.defer = true;
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return <div id="webchat" />;
};

export default BotpressBot;

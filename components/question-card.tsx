"use client";
import { useState } from "react";

const QuestionCard = ({ question, answer }: { question: string; answer: string }) => {
  const [isVisible, setIsVisible] = useState(false);

//   const speakQuestion = () => {
//     const utterance = new SpeechSynthesisUtterance(question);
//     speechSynthesis.speak(utterance);
//   };

const speakQuestion = async (question: string) => {
    console.log(question);
    try {
      const response = await fetch("/api/text-to-speech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: question }),
      });
  
      if (!response.ok) throw new Error("API request failed");

      const blob = await response.blob();
      const audioUrl = URL.createObjectURL(blob);
  
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.warn("TTS API failed, falling back to built-in speech:", error);
  
      // Use built-in browser TTS as a fallback
      const utterance = new SpeechSynthesisUtterance(question);
      const voices = speechSynthesis.getVoices();
      utterance.voice = voices.find((v) => v.name.includes("Google")) || voices[0];
      utterance.rate = 0.9;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-4 border border-gray-200">
      <h2 className="text-lg font-semibold">{question}</h2>
      <div className="flex items-center gap-3 mt-2">
        <button onClick={() => speakQuestion(question)} className="text-green-600 hover:underline">
          🔊 Speak
        </button>
        <button onClick={() => setIsVisible(!isVisible)} className="text-blue-600 hover:underline">
          {isVisible ? "Hide Answer" : "Show Answer"}
        </button>
      </div>
      {isVisible && <p className="mt-2 text-gray-700">{answer}</p>}
    </div>
  );
};

export default QuestionCard;
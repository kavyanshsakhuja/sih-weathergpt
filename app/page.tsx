"use client";

import React, { useState, useEffect, useRef } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  // Default to English (India), allowing user-driven switching across regional modes
  const [selectedLanguage, setSelectedLanguage] = useState("en-IN"); 

  const recognitionRef = useRef<any>(null);

  // Initialize browser speech recognition engine capabilities
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        // Allows immediate voice data streaming processing
        recognition.interimResults = false; 

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInput((prev) => prev + (prev ? " " : "") + transcript);
        };

        recognition.onerror = (err: any) => {
          console.error("Speech processing system alert:", err);
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Voice recognition is not fully supported on this web browser version. Please execute inside Google Chrome.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      // Directs engine to process sound waves utilizing the selected regional Indian locale path
      recognitionRef.current.lang = selectedLanguage;
      recognitionRef.current.start();
    }
  };

  return (
    <main className="flex h-screen w-screen bg-slate-950 text-slate-100 antialiased">
      
      {/* 1. Sidebar Panel Workspace */}
      <aside className="hidden md:flex md:w-72 flex-col border-r border-slate-800 bg-slate-900 p-5">
        <div className="flex items-center gap-2.5 mb-6">
          <span className="text-2xl animate-pulse">🌤️</span>
          <h2 className="text-xl font-bold tracking-tight text-white">Weather GPT</h2>
        </div>
        
        <button className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm font-medium hover:bg-slate-700 transition mb-6">
          + New Forecast Session
        </button>

        {/* Pan-India Multilingual Language Matrix Configurator Selector */}
        <div className="mt-auto p-4 bg-slate-950/60 rounded-xl border border-slate-800">
          <label className="block text-xs font-semibold text-blue-400 mb-2.5 tracking-wider uppercase">
            🗣️ Speak in Your Regional Language:
          </label>
          <select 
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="w-full bg-slate-900 text-xs border border-slate-700 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            {/* Common Mix Options */}
            <option value="en-IN">English / Hinglish (India)</option>
            <option value="hi-IN">Hindi (हिंदी) / Hinglish</option>
            
            {/* West & Central India */}
            <option value="mr-IN">Marathi (मराठी)</option>
            <option value="gu-IN">Gujarati (ગુજરાતી)</option>
            
            {/* South India */}
            <option value="ta-IN">Tamil (தமிழ்)</option>
            <option value="te-IN">Telugu (తెలుగు)</option>
            <option value="kn-IN">Kannada (ಕನ್ನಡ)</option>
            <option value="ml-IN">Malayalam (മലയാളം)</option>
            
            {/* East & North India */}
            <option value="bn-IN">Bengali (বাংলা)</option>
            <option value="pa-IN">Punjabi (ਪੰਜਾਬੀ)</option>
            <option value="ur-IN">Urdu (اُردُو)</option>
          </select>
          <p className="text-[10px] text-slate-500 mt-2 leading-relaxed">
            *Select Hindi or English options to speak using conversational Hinglish expressions.
          </p>
        </div>
      </aside>

      {/* 2. Main Chat Workspace Dashboard */}
      <section className="flex flex-1 flex-col h-full relative">
        
        {/* Top Header Navigation bar */}
        <header className="flex h-14 items-center justify-between border-b border-slate-800 bg-slate-900/50 px-6 backdrop-blur">
          <div className="flex items-center gap-2">
            <span className="md:hidden text-lg">🌤️</span>
            <h1 className="text-sm font-semibold tracking-wide text-slate-200">Weather GPT Dashboard</h1>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setIsLoading(!isLoading)} className="text-xs px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 transition">Toggle Loading</button>
            <button onClick={() => setHasError(!hasError)} className="text-xs px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 transition">Toggle Error</button>
          </div>
        </header>

        {/* 3. Error Alert Feedback Layout Block */}
        {hasError && (
          <div className="bg-red-500/10 border-b border-red-500/20 px-6 py-2.5 text-xs text-red-400 flex items-center justify-between animate-fade-in">
            <span>Server Alert: Failed to communicate with Weather GPT network nodes. Check backend integration channels.</span>
            <button onClick={() => setHasError(false)} className="font-bold hover:text-white">✕</button>
          </div>
        )}

        {/* 4. Scrollable Live Chat Feed Window */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          
          {/* Incoming Multilingual Assistant Base Prompt Welcome Bubble */}
          <div className="flex justify-start">
            <div className="max-w-[85%] md:max-w-2xl rounded-2xl rounded-tl-none bg-slate-900 border border-slate-800 p-4 text-sm shadow-md">
              <p className="font-semibold text-xs text-blue-400 mb-1.5 tracking-wider uppercase">Weather GPT System</p>
              <div className="leading-relaxed space-y-2">
                <p>Namaste! Welcome to your SIH Multilingual Weather Engine. You can speak or type in any Indian regional language or mix dialects like Hinglish.</p>
                <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800/60 text-xs text-slate-400 space-y-1">
                  <div>💡 English: <span className="text-blue-300">"What is the rainfall prediction for Mumbai?"</span></div>
                  <div>💡 Hinglish: <span className="text-blue-300">"Delhi ka weather kaisa rahega kal?"</span></div>
                  <div>💡 Regional: <span className="text-blue-300">"चेन्नईमध्ये आज पाऊस पडेल का?"</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* User Dynamic Text Bubble Viewport Mapping */}
          {input && (
            <div className="flex justify-end">
              <div className="max-w-[85%] md:max-w-2xl rounded-2xl rounded-tr-none bg-blue-600 p-4 text-sm shadow-md text-white">
                <p className="font-semibold text-xs text-blue-200 mb-1 tracking-wider uppercase">You</p>
                <p className="leading-relaxed">{input}</p>
              </div>
            </div>
          )}

          {/* 5. Processing / Transcribing State Indicator */}
          {isLoading && (
            <div className="flex justify-start items-center space-x-2.5 text-slate-400 text-xs py-2">
              <span className="flex h-2 w-2 animate-ping rounded-full bg-blue-400 opacity-75"></span>
              <span>Weather GPT is calculating live regional analytics...</span>
            </div>
          )}
          
        </div>

        {/* 6. Form Submission Input Panel with Integrated Microphone Toggle */}
        <footer className="border-t border-slate-800 bg-slate-950 p-4">
          <form onSubmit={(e) => e.preventDefault()} className="mx-auto max-w-3xl flex items-center gap-2">
            
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask questions in English, Hindi, Hinglish, Marathi, Tamil, etc..." 
              className="flex-1 rounded-xl border border-slate-800 bg-slate-900 px-4 py-3.5 text-sm text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
            />

            {/* Microphonic Audio Record Control Switch */}
            <button
              type="button"
              onClick={toggleListening}
              className={`p-3.5 rounded-xl border transition shadow text-lg flex items-center justify-center ${
                isListening 
                  ? "bg-red-600 border-red-500 text-white animate-pulse scale-105" 
                  : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"
              }`}
              title="Speak to Search"
            >
              {isListening ? "🛑" : "🎤"}
            </button>

            <button 
              type="submit" 
              className="rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-medium text-white hover:bg-blue-500 transition shadow font-semibold"
            >
              Send
            </button>
          </form>
        </footer>

      </section>
    </main>
  );
}

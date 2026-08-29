"use client";

import React, { useState } from "react";

export default function Home() {
  // Demo states to manage our frontend requirements
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <main className="flex h-screen w-screen bg-slate-950 text-slate-100 antialiased">
      
      {/* 1. Sidebar - Hidden on mobile viewports, visible on desktop (md:) */}
      <aside className="hidden md:flex md:w-64 flex-col border-r border-slate-800 bg-slate-900 p-4">
        <h2 className="text-xl font-bold tracking-tight text-white mb-4">AI Assistant</h2>
        <button className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium hover:bg-slate-700 transition">
          + New Chat
        </button>
      </aside>

      {/* 2. Main Chat Workspace Area */}
      <section className="flex flex-1 flex-col h-full relative">
        
        {/* Top Header Navigation */}
        <header className="flex h-14 items-center justify-between border-b border-slate-800 bg-slate-900/50 px-6 backdrop-blur">
          <h1 className="text-sm font-semibold">Current Conversation</h1>
          <div className="flex gap-2">
            {/* Quick action buttons to simulate frontend states for testing */}
            <button 
              onClick={() => setIsLoading(!isLoading)} 
              className="text-xs px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400"
            >
              Toggle Loading
            </button>
            <button 
              onClick={() => setHasError(!hasError)} 
              className="text-xs px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400"
            >
              Toggle Error
            </button>
          </div>
        </header>

        {/* 3. Error State Indicator - Appears conditionally */}
        {hasError && (
          <div className="bg-red-500/10 border-b border-red-500/20 px-6 py-2 text-sm text-red-400 flex items-center justify-between">
            <span>Failed to transmit message. Please check your network connection and retry.</span>
            <button onClick={() => setHasError(false)} className="font-bold hover:text-white">✕</button>
          </div>
        )}

        {/* 4. Chat Feed Area (Scrollable view) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          
          {/* Incoming Assistant Message (Left-aligned) */}
          <div className="flex justify-start">
            <div className="max-w-[85%] md:max-w-2xl rounded-2xl rounded-tl-none bg-slate-900 border border-slate-800 p-4 text-sm shadow-md">
              <p className="font-semibold text-xs text-blue-400 mb-1">AI System</p>
              <p className="leading-relaxed">Hello! I am your web application prototype interface. How can I help you refine your frontend code tasks today?</p>
            </div>
          </div>

          {/* Outgoing User Message (Right-aligned) */}
          <div className="flex justify-end">
            <div className="max-w-[85%] md:max-w-2xl rounded-2xl rounded-tr-none bg-blue-600 p-4 text-sm shadow-md text-white">
              <p className="font-semibold text-xs text-blue-200 mb-1">You</p>
              <p className="leading-relaxed">Can you verify that this text container wraps properly across smaller device breakpoints?</p>
            </div>
          </div>

          {/* 5. Loading Indicator State Layout */}
          {isLoading && (
            <div className="flex justify-start items-center space-x-2 text-slate-400 text-xs py-2">
              <span className="flex h-2 w-2 animate-ping rounded-full bg-blue-400 opacity-75"></span>
              <span>AI interface processing a reply...</span>
            </div>
          )}
          
        </div>

        {/* 6. Form Input Panel - Staggered pinned to bottom region */}
        <footer className="border-t border-slate-800 bg-slate-950 p-4">
          <form onSubmit={(e) => e.preventDefault()} className="mx-auto max-w-3xl flex items-center gap-2">
            <input 
              type="text" 
              placeholder="Type your message to the AI assistant..." 
              className="flex-1 rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button 
              type="submit" 
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-500 transition shadow"
            >
              Send
            </button>
          </form>
        </footer>

      </section>
    </main>
  );
}

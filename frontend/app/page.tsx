'use client';

import React, { useState } from 'react';
import { FileUpload } from '../components/FileUpload';
import { ChatInterface } from '../components/ChatInterface';
import { Sparkles } from 'lucide-react';

export default function Home() {
  const [hasUploaded, setHasUploaded] = useState(false);

  const handleUploadComplete = () => {
    setHasUploaded(true);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white selection:bg-blue-500/30">
      
      {/* Header */}
      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-gray-950/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Readify
            </span>
          </div>
          <nav className="flex items-center gap-6 text-sm font-medium text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Documentation</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-xs font-semibold transition-all">
              v1.0.0
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        
        {/* Hero Section */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Chat with your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400">
              Documents
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Upload any PDF, DOCX, or Text file and instantly get answers with citations. Powered by RAG technology.
          </p>
        </div>

        {/* Interaction Area */}
        <div className="flex flex-col gap-8 items-center">
          <FileUpload onUploadComplete={handleUploadComplete} />
          
          <div className={`w-full transition-all duration-700 ${hasUploaded ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-10 blur-sm pointer-events-none'}`}>
             <ChatInterface />
          </div>
        </div>

      </div>

      {/* Decorative Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl mix-blend-screen" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl mix-blend-screen" />
      </div>
      
    </main>
  );
}

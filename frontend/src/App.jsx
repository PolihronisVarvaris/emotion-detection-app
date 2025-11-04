import React, { useState } from 'react';
import Header from './components/Header';
import WebcamCapture from './components/WebcamCapture';
import ImageUpload from './components/ImageUpload';
import ResultsDisplay from './components/ResultsDisplay';
import EmotionChart from './components/EmotionChart';
import { EmotionProvider } from './context/EmotionContext';

function App() {
  return (
    <EmotionProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <WebcamCapture />
              <ImageUpload />
            </div>
            <div className="space-y-6">
              <ResultsDisplay />
              <EmotionChart />
            </div>
          </div>
        </main>
      </div>
    </EmotionProvider>
  );
}

export default App;
import React from 'react';
import Header from './components/Header.jsx';
import WebcamCapture from './components/WebcamCapture.jsx';
import ImageUpload from './components/ImageUpload.jsx';
import ResultsDisplay from './components/ResultsDisplay.jsx';
import EmotionChart from './components/EmotionChart.jsx';
import ConnectionStatus from './components/ConnectionStatus.jsx';
import { EmotionProvider } from './context/EmotionContext.jsx';

function App() {
  return (
    <EmotionProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <ConnectionStatus />
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
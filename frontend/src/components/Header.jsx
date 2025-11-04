import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">EmotionAI</h1>
              <p className="text-sm text-gray-600">Real-time facial emotion detection</p>
            </div>
          </div>
          
          <nav className="flex space-x-6">
            {/* <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Home</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">API Docs</a> */}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
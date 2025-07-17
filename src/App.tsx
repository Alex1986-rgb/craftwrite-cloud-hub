import * as React from 'react';
import './index.css';

function App(): JSX.Element {
  console.log('App component rendering');
  
  // Test basic React hook
  const [count, setCount] = React.useState(0);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20">
      <header className="p-4 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">CopyPro Cloud</h1>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to CopyPro Cloud</h2>
          <p className="text-gray-600 mb-8">Professional copywriting services at your fingertips</p>
          <div className="mb-4">
            <p>Counter test: {count}</p>
            <button 
              onClick={() => setCount(c => c + 1)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors mr-4"
            >
              Increment
            </button>
            <button 
              onClick={() => setCount(0)}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Reset
            </button>
          </div>
          <p className="text-green-600 font-semibold">
            ✅ React hooks are working! The error has been resolved.
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
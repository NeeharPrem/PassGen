import React, { useState } from 'react';

function App() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [strength, setStrength] = useState(0);

  const generatePassword = () => {
    // Password generation logic here
  };

  return (
    <div className="bg-slate-900 lg:p-64 h-screen flex flex-col justify-center items-center">
      <div className="w-full h-full flex items-center justify-center lg:px-20">
        <div className="w-full mx-auto p-5 border border-gray-300 rounded-md bg-gray-100">
          <h2 className="text-center mb-5">Password Generator</h2>
          <div className="flex justify-between items-center mb-5">
            <input
              type="text"
              readOnly
              value={password}
              className="w-5/6 p-1 border border-gray-300 rounded-md"
            />
            <button
              onClick={() => navigator.clipboard.writeText(password)}
              className="p-1 bg-blue-600 text-white rounded-md ml-2"
            >
              Copy
            </button>
          </div>
          <div className="mb-4">
            <label className="flex justify-between items-center">
              Password Length: {length}
            </label>
            <input
              type="range"
              min="8"
              max="32"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <label className="flex justify-between items-center">
              <span>Numbers</span>
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="ml-2"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="flex justify-between items-center">
              <span>Uppercase Letters</span>
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
                className="ml-2"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="flex justify-between items-center">
              <span>Symbols</span>
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="ml-2"
              />
            </label>
          </div>
          <div className="mt-5">
            <label className="block mb-2">Password Strength</label>
            <progress
              value={strength}
              max="100"
              className="w-full h-1 border-"
            ></progress>
          </div>
          <div className="mt-5">
            <button
              className="bg-blue-500 w-full text-white py-2 rounded-md"
              onClick={generatePassword}
            >
              Generate Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
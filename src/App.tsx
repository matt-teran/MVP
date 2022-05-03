import React from 'react';
import Timer from './Timer';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Timer />
        <button type="button">Study</button>
      </header>
    </div>
  );
}

export default App;

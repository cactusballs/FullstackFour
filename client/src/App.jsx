import React, { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import ImageCarousel from './components/ImageCarousel/ImageCarousel.jsx';
import './components/ImageCarousel/ImageCarousel.css'; // Import your custom styles

function App() {
  const [count, setCount] = useState(0);

  const namesHobbies = [{ name: "Anh", message: "I like sharing cat memes" }];

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div>
        {namesHobbies.map((item, index) => (
          <React.Fragment key={index}>
            <h4>{item.name}</h4>
            <p>{item.message}</p>
          </React.Fragment>
        ))}
      </div>
      <div className="card">
        <button onClick={() => setCount(count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.js</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <ImageCarousel /> {/* Use ImageCarousel component with correct capitalization */}
    </>
  );
}

export default App;

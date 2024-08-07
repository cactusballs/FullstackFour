import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
//import TopicsDropdown from "./components/forum/DropdownMenu/Dropdown/TopicsDropdown";

import ForumTopicThreads from "./components/forum/ForumTopicThreads";
import ForumMain from "./components/forum/ForumMain";



// import ForumTopicThreads from './components/forum/ForumTopicThreads';

// function App() {
//   const [count, setCount] = useState(0);

//   const namesHobbies = [{ name: "Anh", message: "I like sharing cat memes" }];
//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <div>
//         {namesHobbies.map((item) => {
//           return (
//             <>
//               <h4>{item.name}</h4>
//               <p>{item.message}</p>
//             </>
//           );
//         })}
//       </div>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>

//     </>
//   );
// }

//to edit other pages
function App() {

  return (
    <div>
      <div>
        <ForumMain/>
        <ForumTopicThreads/> 
        
        {/*I've put both here for now so can look at one below the other*/}
      </div>
    </div>
  );
}

export default App;

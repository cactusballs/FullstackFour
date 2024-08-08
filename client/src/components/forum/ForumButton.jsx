import React from 'react'
import ReactDOM from 'react-dom/client'
import './ForumButton.css';
import { useNavigate } from 'react-router-dom';

// function for reusable button 

const ForumButton = ({onClick, buttonContent, className='', ...rest}) => { /* onclick will take in the function for each button, buttonContent will replace the default below and className will add any specific styling, rest makes space for any extra info added after */
  return (
  <button onClick={onClick}> 
    submit
    {/* {buttonContent} */}
  </button>
  )
}

export default ForumButton;
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import TextBox from './textbox/TextBox.js';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className="backgroundStripTilted">
      <div className="stripRightTop"></div>
      <div className="stripRightBottom"></div>
      <div className="stripRightMiddle"></div>
      <div className="stripLeft"></div>
    </div>
    <TextBox />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

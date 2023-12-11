import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import TextBox from './textbox/TextBox.js';
import reportWebVitals from './reportWebVitals';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      summarized: false
    }
  }

  updateSummaryState = (s) => {
    this.setState({summarized: s});
  }

  render() {
    return (
      <React.StrictMode>
        <div className={`backgroundStripTilted ${this.state.summarized ? 'backgroundSummarized' : ''}`}>
          <div className="stripRightTop"></div>
          <div className="stripRightBottom"></div>
          <div className="stripRightMiddle"></div>
          <div className="stripLeft"></div>
        </div>
        <TextBox onUpdateSummaryState={this.updateSummaryState} />
      </React.StrictMode>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

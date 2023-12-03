import './TextBox.css';
import React from 'react';

class TextBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ""
    };
  }

  handleTextChange = (event) => {
    this.setState({text: event.target.value});
  }

  isTextBoxEmpty = () => {
    if (this.state.text.trim() === "") {
      return true;
    }

    return false;
  }

  render() {
    return (
      <div className="TextBoxContainer">
        <span className="TextBoxTitle">Summarize your text below 👇</span>
        <form>
          <div className="FormContainer">
            <textarea
              className="TextBox"
              value={this.state.text}
              onChange={this.handleTextChange}
              spellCheck="false" 
            />
            <button
              className="TextBoxButton"
              disabled={this.isTextBoxEmpty()}>Summarize Text</button>
          </div>
        </form>
      </div>
    )
  }
}

export default TextBox;

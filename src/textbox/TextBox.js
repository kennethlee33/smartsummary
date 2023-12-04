import './TextBox.css';
import React from 'react';

class TextBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      loading: false,
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

  sendTextForSummarization = (e) => {
    e.preventDefault();

    this.setState({loading: true});

    fetch("http://localhost:3001/summarize", {
      method: 'POST',
      body: this.state.text
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Issue with server response');
      }
      return res.json();
    })
    .then(data => {
      this.setState({loading: false});
      console.log(data.summary);
    })
    .catch(error => {
      console.error('Error while fetching summarized text: ' + error)
    })

    return false;
  }

  renderTextBoxButtonSpinner = () => {
    if (this.state.loading === true) {
      return (
        <span className="TextBoxButtonLoader"></span>
      )
    }
    
    return "Summarize Text";
  }

  render() {
    return (
      <div className="TextBoxContainer">
        <span className="TextBoxTitle">Summarize your text below 👇</span>
        <form onSubmit={this.sendTextForSummarization}>
          <div className="FormContainer">
            <textarea
              className="TextBox"
              value={this.state.text}
              onChange={this.handleTextChange}
              spellCheck="false" 
            />
            <button
              className="TextBoxButton"
              disabled={this.isTextBoxEmpty()}>{this.renderTextBoxButtonSpinner()}</button>
          </div>
        </form>
      </div>
    )
  }
}

export default TextBox;

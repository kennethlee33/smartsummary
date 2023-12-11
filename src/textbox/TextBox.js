import './TextBox.css';
import React from 'react';

class TextBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      loading: false,
      summarized: false,
      // false for prod, true for local dev
      development: false
    };
  }

  handleTextChange = (event) => {
    this.setState({text: event.target.value});
    this.setState({summarized: false});
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

    let summarizeEndpoint = "https://smartsummary.bao.dev/summarize";
    if (this.state.development) {
      // if in local dev, fetch from localhost
      summarizeEndpoint = "http://localhost:3000/summarize"
    }

    fetch(summarizeEndpoint, {
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
      this.setState({text: data.summary});
      this.setState({loading: false});
      this.setState({summarized: true});
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

  renderTextBoxTitleText = () => {
    if (this.state.loading) {
      return "Model currently processing...";
    } else if (this.state.summarized) {
      return "Your summarized text:";
    }
    return "Summarize your text below 👇";
  }

  renderTextBoxButton = () => {
    if (!this.state.summarized) {
      return (
        <button
          className="TextBoxButton"
          disabled={this.isTextBoxEmpty()}>{this.renderTextBoxButtonSpinner()}</button>
      )
    }
  }

  render() {
    return (
      <div className="TextBoxContainer">
        <span className="TextBoxTitle">{this.renderTextBoxTitleText()}</span>
        <form onSubmit={this.sendTextForSummarization}>
          <div className="FormContainer">
            <textarea
              className={`TextBox ${this.state.summarized ? 'TextBox-Summarized' : ''}`}
              value={this.state.text}
              onChange={this.handleTextChange}
              spellCheck="false" 
            />
            {this.renderTextBoxButton()}
          </div>
        </form>
      </div>
    )
  }
}

export default TextBox;

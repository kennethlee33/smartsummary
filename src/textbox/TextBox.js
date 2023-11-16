import './TextBox.css';

function TextBox() {
  return (
    <div className="TextBoxContainer">
      <span className="TextBoxTitle">Summarize your text below</span>
      <form>
        <div className="FormContainer">
          <textarea className="TextBox" spellcheck="false"></textarea>
          <button className="TextBoxButton">Summarize Text</button>
        </div>
      </form>
    </div>
  );
}

export default TextBox;

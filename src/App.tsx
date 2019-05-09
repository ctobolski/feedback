import React, { useState, ChangeEvent } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMeh, faGrinStars } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

library.add(faMeh, faGrinStars);

interface Props {
  client: {
    submit: (reaction: string, thoughts?: string) => void;
  };
}

function App({ client }: Props) {
  const [reaction, setReaction] = useState<string>("");
  const [thoughts, setThoughts] = useState<string>("");
  const [error, setError] = useState(false);
  function submit() {
    if (reaction === "") {
      setError(true);
    } else {
      client.submit(reaction, thoughts);
    }
  }
  function handleTextChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setThoughts(event.target.value);
  }
  return (
    <div className="App">
      {error && <ErrorMessage />}
      <div id="button-container">
        <span
          className="icon-wrapper"
          data-testid="happy-btn"
          onClick={() => setReaction("happy")}
        >
          <FontAwesomeIcon icon="grin-stars" size="10x" />
        </span>
        <span
          className="icon-wrapper"
          data-testid="confused-btn"
          onClick={() => setReaction("confused")}
        >
          <FontAwesomeIcon icon="meh" size="10x" />
        </span>
      </div>
      <div id="textarea">
        <label htmlFor="thoughts-input">Thoughts</label>
        <textarea
          id="thoughts-input"
          value={thoughts}
          onChange={handleTextChange}
        />
      </div>
      <button className="submit" onClick={submit}>
        Submit
      </button>
    </div>
  );
}

function ErrorMessage() {
  return <div>Please let us know what you think before submitting</div>;
}

export default App;

import React, { useState, ChangeEvent } from "react";
import "./App.css";

interface Props {
  client: {
    submit: (reaction: string, thoughts: string) => void;
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
        <button id="happy" onClick={() => setReaction("happy")}>
          Happy
        </button>
        <button id="confused" onClick={() => setReaction("confused")}>
          Confused
        </button>
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

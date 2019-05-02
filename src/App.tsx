import React, { useState, FormEvent } from "react";
import "./App.css";

interface Props {
  client: {
    submit: ({
      reaction,
      thoughts
    }: {
      reaction: string | null;
      thoughts: string;
    }) => void;
  };
}

function App({ client }: Props) {
  const [reaction, setReaction] = useState<string | null>(null);
  const [thoughts, setThoughts] = useState<string>("");
  const [error, setError] = useState(false);
  function submit() {
    if (reaction === null) {
      setError(true);
    } else {
      client.submit({ reaction, thoughts });
    }
  }
  function handleTextChange(event: FormEvent<HTMLInputElement>) {
    setThoughts(event.currentTarget.value);
  }
  return (
    <div className="App">
      {error && <ErrorMessage />}
      <button onClick={() => setReaction("happy")}>Happy</button>
      <button onClick={() => setReaction("confused")}>Confused</button>
      <label htmlFor="thoughts-input">Thoughts</label>
      <input
        id="thoughts-input"
        type="text"
        value={thoughts}
        onChange={handleTextChange}
      />
      <button onClick={submit}>Submit</button>
    </div>
  );
}

function ErrorMessage() {
  return <div>Please let us know what you think before submitting</div>;
}

export default App;

import React, { useState, ChangeEvent } from "react";
import { library, IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMeh, faGrin, faFrown } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

library.add(faMeh, faGrin, faFrown);

interface Props {
  client: {
    submit: (reaction: string, thoughts?: string) => void;
  };
}

function App({ client }: Props) {
  const [success, setSuccess] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  async function submit(reaction: string, thoughts?: string) {
    try {
      await client.submit(reaction, thoughts);
      setSuccess(true);
    } catch (error) {
      setNetworkError(true);
    }
  }
  return (
    <div className="App">
      {success && <ThankYou />}
      {networkError && (
        <ErrorMessage message="We are having trouble submitting, thanks for trying!" />
      )}
      {!success && !networkError && <Form submit={submit} />}
    </div>
  );
}
interface FormProps {
  submit: (reaction: string, thoughts?: string) => void;
}

function Form(props: FormProps) {
  const [reaction, setReaction] = useState<string>("");
  const [thoughts, setThoughts] = useState<string>("");
  const [error, setError] = useState(false);
  function submit() {
    if (reaction === "") {
      setError(true);
    } else {
      props.submit(reaction, thoughts);
    }
  }
  function handleTextChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setThoughts(event.target.value);
  }
  function getClass(name: string) {
    if (name === reaction) {
      return "selected";
    }
    return "";
  }
  function updateReaction(reaction: string) {
    setReaction(reaction);
    setError(false);
  }
  return (
    <>
      <h1>Testing Like a User</h1>
      <div className="row">
        <hr />
        <span>We want your feedback!</span>
        <span>How did you like the talk?</span>
        <div className="container">
          <FeedbackButton
            iconName="grin"
            setReaction={() => updateReaction("happy")}
            testId="happy-btn"
            getClass={() => getClass("happy")}
          />
          <FeedbackButton
            iconName="meh"
            setReaction={() => updateReaction("confused")}
            testId="confused-btn"
            getClass={() => getClass("confused")}
          />
          <FeedbackButton
            iconName="frown"
            setReaction={() => updateReaction("sad")}
            testId="sad-btn"
            getClass={() => getClass("sad")}
          />
        </div>
        {error && (
          <ErrorMessage message=" Please let us know what you think before submitting " />
        )}
        <hr />
      </div>
      <div className="row">
        <label htmlFor="thoughts-input">
          If you have other thoughts, leave them here!
        </label>
        <textarea
          id="thoughts-input"
          value={thoughts}
          onChange={handleTextChange}
        />
      </div>
      <div className="row">
        <hr />
        <button onClick={submit}>Submit</button>
      </div>
    </>
  );
}

interface FeedbackButtonProps {
  testId: string;
  setReaction: () => void;
  getClass: () => void;
  iconName: IconProp;
}

function FeedbackButton(props: FeedbackButtonProps) {
  return (
    <span
      className={`${props.getClass()} icon-wrapper`}
      id={props.testId}
      data-testid={props.testId}
      onClick={props.setReaction}
    >
      <FontAwesomeIcon icon={props.iconName} />
    </span>
  );
}

function ThankYou() {
  return <div className="thanks">Thanks for your feedback!</div>;
}

function ErrorMessage(props: { message: string }) {
  return <div className="error">{props.message}</div>;
}

export default App;

import React, { useState, ChangeEvent, Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";
import { FeedbackProps, FeedbackButtonProps } from "./interfaces";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMeh, faGrin } from "@fortawesome/free-solid-svg-icons";
library.add(faMeh, faGrin);

interface State {
  reaction: string;
  success: boolean;
  inputError: boolean;
}

class App extends Component<FeedbackProps, State> {
  constructor(props: FeedbackProps) {
    super(props);
    this.state = {
      reaction: "",
      success: false,
      inputError: false
    };
  }

  updateReaction = (reaction: string) => {
    this.setState({ reaction });
  };

  getClassName = (name: string) => {
    if (this.state.reaction == name) {
      return "selected";
    }
    return "";
  };

  submit = async () => {
    if (this.state.reaction != "") {
      await this.props.client!.submit(this.state.reaction);
      this.setState({ success: true });
    } else {
      this.setState({ inputError: true });
    }
  };

  render() {
    return (
      <div>
        {this.state.success && <div>Thanks for your feedback!</div>}
        {this.state.inputError && (
          <div>Please select a reaction before submitting!</div>
        )}
        <FeedbackButton
          testId="happy-btn"
          setReaction={() => this.updateReaction("happy")}
          getClassName={() => this.getClassName("happy")}
          iconName="grin"
        />
        <FeedbackButton
          testId="confused-btn"
          setReaction={() => this.updateReaction("confused")}
          getClassName={() => this.getClassName("confused")}
          iconName="meh"
        />
        <button onClick={this.submit}>Submit</button>
      </div>
    );
  }
}

function FeedbackButton(props: FeedbackButtonProps) {
  return (
    <span
      data-testid={props.testId}
      className={props.getClassName()}
      onClick={props.setReaction}
    >
      <FontAwesomeIcon icon={props.iconName} />
    </span>
  );
}

export default App;

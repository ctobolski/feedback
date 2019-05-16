import React, { useState, ChangeEvent, Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";
import { FeedbackProps } from "./interfaces";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMeh, faGrin } from "@fortawesome/free-solid-svg-icons";
library.add(faMeh, faGrin);

function App() {
  return <div>Hello World</div>;
}

export default App;

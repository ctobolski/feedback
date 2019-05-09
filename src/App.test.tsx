import React from "react";
import "react-testing-library/cleanup-after-each";
import "jest-dom/extend-expect";
import { render, fireEvent, wait } from "react-testing-library";
import App from "./App";

it("Can submit happy feedback", async () => {
  const mockClient = {
    submit: jest.fn(() => Promise.resolve())
  };
  const { getByText } = render(<App client={mockClient} />);
  const happyButton = getByText(/happy/i);
  fireEvent.click(happyButton);
  fireEvent.click(getByText(/submit/i));
  await wait(() => expect(mockClient.submit).toHaveBeenCalled());
  expect(mockClient.submit).toHaveBeenCalledWith("happy", "");
});

it("Does not submit unless a reaction has been selected", () => {
  const mockClient = {
    submit: jest.fn()
  };
  const { getByText } = render(<App client={mockClient} />);
  fireEvent.click(getByText(/submit/i));
  expect(mockClient.submit).not.toHaveBeenCalled();
  getByText(/Please let us know what you think before submitting/i);
});

it("Shows an error if user tries to submit without a reaction", () => {
  const mockClient = {
    submit: jest.fn()
  };
  const { getByText } = render(<App client={mockClient} />);
  fireEvent.click(getByText(/submit/i));
  expect(mockClient.submit).not.toHaveBeenCalled();
});

it("submits optional comments", () => {
  const mockClient = {
    submit: jest.fn(() => Promise.resolve())
  };
  const { getByText, getByLabelText } = render(<App client={mockClient} />);
  const happyButton = getByText(/confused/i);
  fireEvent.click(happyButton);
  const thoughts = getByLabelText(/thoughts/i);
  fireEvent.change(thoughts, {
    target: { value: "What is the testing pyramid?" }
  });

  fireEvent.click(getByText(/submit/i));
  expect(mockClient.submit).toHaveBeenCalledWith(
    "confused",
    "What is the testing pyramid?"
  );
});

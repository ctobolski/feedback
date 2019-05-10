import React from "react";
import { render, fireEvent, wait, getByTestId } from "react-testing-library";
import App from "./App";

describe("Feedback", () => {
  it("should indicate that the user has selected a reaction", () => {
    const { getByTestId } = render(<App />);
    const happyButton = getByTestId("happy-btn");
    fireEvent.click(happyButton);
    expect(happyButton.className).toContain("selected");
  });
  it("should not allow the user to select more than one reaction", () => {
    const { getByText, getByTestId } = render(<App />);
    const happyButton = getByTestId("happy-btn");
    const confusedButton = getByTestId("confused-btn");
    fireEvent.click(confusedButton);
    expect(confusedButton.className).toContain("selected");
    expect(happyButton.className).not.toContain("selected");
  });

  it("should let the user know if he tries to submit feedback without a reaction", () => {
    const { getByText } = render(<App />);
    const submitButton = getByText(/submit/i);
    fireEvent.click(submitButton);
    expect(
      getByText(/Please select a reaction before submitting!/i)
    ).toBeInTheDocument();
  });

  it("should let the user know if he submitted his feedback successfully", async () => {
    const mockClient = {
      submit: jest.fn(() => Promise.resolve())
    };
    const { getByText, getByTestId } = render(<App client={mockClient} />);
    const happyButton = getByTestId("happy-btn");
    const submitButton = getByText(/submit/i);
    fireEvent.click(happyButton);
    fireEvent.click(submitButton);
    await wait(() =>
      expect(getByText(/Thanks for your feedback!/i)).toBeInTheDocument()
    );
  });
});

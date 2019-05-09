import React from "react";
import { render, fireEvent, wait } from "react-testing-library";
import App from "./App";

it("Can submit happy feedback", async () => {
  const mockClient = {
    submit: jest.fn(() => Promise.resolve())
  };
  const { getByText, getByTestId } = render(<App client={mockClient} />);
  const happyButton = getByTestId("happy-btn");
  fireEvent.click(happyButton);
  fireEvent.click(getByText(/submit/i));
  await wait(() => expect(mockClient.submit).toHaveBeenCalled());
  expect(mockClient.submit).toHaveBeenCalledWith("happy", "");
});

it("Can submit confused feedback", async () => {
  const mockClient = {
    submit: jest.fn(() => Promise.resolve())
  };
  const { getByText, getByTestId } = render(<App client={mockClient} />);
  const confusedButton = getByTestId("confused-btn");
  fireEvent.click(confusedButton);
  fireEvent.click(getByText(/submit/i));
  await wait(() => expect(mockClient.submit).toHaveBeenCalled());
  expect(mockClient.submit).toHaveBeenCalledWith("confused", "");
});

it("Does not submit unless a reaction has been selected", () => {
  const mockClient = {
    submit: jest.fn()
  };
  const { getByText } = render(<App client={mockClient} />);
  fireEvent.click(getByText(/submit/i));
  expect(mockClient.submit).not.toHaveBeenCalled();
  expect(
    getByText(/Please let us know what you think before submitting/i)
  ).toBeInTheDocument();
});

it("submits optional comments", () => {
  const mockClient = {
    submit: jest.fn(() => Promise.resolve())
  };
  const { getByText, getByLabelText, getByTestId } = render(
    <App client={mockClient} />
  );
  const happyButton = getByTestId("happy-btn");
  fireEvent.click(happyButton);
  const thoughts = getByLabelText(/thoughts/i);
  fireEvent.change(thoughts, {
    target: { value: "I want to refactor without breaking tests!" }
  });

  fireEvent.click(getByText(/submit/i));
  expect(mockClient.submit).toHaveBeenCalledWith(
    "happy",
    "I want to refactor without breaking tests!"
  );
});

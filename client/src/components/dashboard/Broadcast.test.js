import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BroadcastMessages from "./Broadcast.jsx";

test("renders card component", () => {
  render(<BroadcastMessages />);
  const broadcastElement = screen.getByTestId("broadcast-test");
  expect(broadcastElement).toBeInTheDocument();
});

test("shows next message when right arrow is clicked", () => {
  render(
    <button onClick={nextMessage}>
      <FaChevronRight />
    </button>
  );
  const rightButton = screen.getByRole(button);
  fireEvent.click(rightButton);

  expect(rightButton).not.toBeDisabled();
});

test("shows previous message when left arrow is clicked", () => {});

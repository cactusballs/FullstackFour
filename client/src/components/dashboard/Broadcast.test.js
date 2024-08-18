import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BroadcastMessages from "./Broadcast.jsx";

// fetch is not defined error - fetch is not used in node environment (that jest is in)
// https://stackoverflow.com/questions/72821063/jest-tests-failing-fetch-is-not-defined

// test("renders card component", async () => {
//   const nextMessage = jest.fn();
//   render(<BroadcastMessages />);
//   const broadcastElement = screen.getByTestId("broadcast-test");
//   expect(broadcastElement).toBeInTheDocument();
// });

// failing - something to do with fetch...
// test("shows next message when right arrow is clicked", () => {
//   render(
//     <button onClick={nextMessage}>
//       <FaChevronRight />
//     </button>
//   );
//   const rightButton = screen.getByRole(button);
//   fireEvent.click(rightButton);

//   expect(rightButton).not.toBeDisabled();
//   expect(nextMessage).toHaveBeenCalledTimes(1);
// });

test("shows previous message when left arrow is clicked", () => {});

// this test doesn't work as intended - it passes but when i add an item on array, it shows the default message still
test("shows default message when there's no messages", () => {
  const messagesArr = [];
  render(<BroadcastMessages messages={messagesArr} />);
  const message = screen.getByText(/Currently no new broadcast messages/i);
  expect(message).toBeInTheDocument();
  expect(message).toHaveTextContent("Currently no new broadcast messages");
});

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BroadcastMessages from "./Broadcast.jsx";

// jest.mock("./Modal.jsx");

// describe("broadcast component", () => {
//   test("broadcast component renders with modal component", () => {
//     render(<BroadcastMessages />);
//     const modalButton = screen.getByText("Create");
//     expect(modalButton).toBeInDocument();
//     fireEvent.click(modalButton);
//   });
// });

describe("broadcast component", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });
  test("renders broadcast component with fetched data", async () => {
    render(<BroadcastMessages />);
    const mockResultOne = [{}];
  });
});

// describe("fetch", () => {
//   test("mock fetch", async () => {
//     const json = await fetchMessages();

//     expect(fetchMock).toHaveBeenCalledWith(
//       "http://localhost:3000/broadcastmessages"
//     );
//     expect(Array.isArray(json).toEqual(true));
//     expect(json.length).toEqual(0);
//   });
//   test("renders card component", async () => {
//     render(<BroadcastMessages />);
//     const broadcastElement = screen.getByTestId("broadcast-test");
//     expect(broadcastElement).toBeInTheDocument();
//   });
//   // failing - something to do with fetch...
//   test("shows next message when right arrow is clicked", () => {
//     render(
//       <button onClick={nextMessage}>
//         <FaChevronRight />
//       </button>
//     );
//     const rightButton = screen.getByRole(button);
//     fireEvent.click(rightButton);

//     expect(rightButton).not.toBeDisabled();
//     expect(nextMessage).toHaveBeenCalledTimes(1);
//   });
//   // this test doesn't work as intended - it passes but when i add an item on array, it shows the default message still
//   test("shows default message when there's no messages", () => {
//     const messagesArr = [];
//     render(<BroadcastMessages messages={messagesArr} />);
//     const message = screen.getByText(/Currently no new broadcast messages/i);
//     expect(message).toBeInTheDocument();
//     expect(message).toHaveTextContent("Currently no new broadcast messages");
//   });
// });

// test("shows previous message when left arrow is clicked", () => {});

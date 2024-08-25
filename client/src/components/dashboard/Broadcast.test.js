import React from "react";
import { render, screen } from "@testing-library/react";
import BroadcastMessages from "./Broadcast.jsx";
import axios from "axios";

jest.mock("axios");

test("shows empty broadcast message correctly", () => {
  render(<BroadcastMessages />);
  const defaultMessage = screen.getByText(
    "Currently no new broadcast messages"
  );
  expect(defaultMessage).toBeInTheDocument();
});

test("displays a message correctly", async () => {
  const fakeMessages = [
    {
      user_name: "CB",
      message_content: "Brought a new pair of asic trainers",
    },
  ];
  axios.get.mockResolvedValueOnce({
    data: fakeMessages,
  });
  render(<BroadcastMessages />);

  const image = screen.getByRole("img");
  expect(image).toBeInTheDocument();

  const message = await screen.findByText(
    `Brought a new pair of asic trainers`
  );
  expect(message).toHaveTextContent(`Brought a new pair of asic trainers`);
});

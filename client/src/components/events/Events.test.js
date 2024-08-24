import React from "react";
import { render } from "@testing-library/react";
import Events from "./Events.jsx";
import EventCard from "./EventCard.jsx";

jest.mock("./EventCard");

test("Event card is displayed", () => {
  render(<Events />);
  expect(EventCard).toHaveBeenCalled();
});

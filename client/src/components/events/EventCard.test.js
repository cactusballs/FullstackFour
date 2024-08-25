import React from "react";
import { render, screen } from "@testing-library/react";
import EventCard from "./EventCard.jsx";

test("renders the component", async () => {
  const fakeEvents = [
    [
      {
        name: "Blippi: the Wonderful World Tour",
        id: "123",
        url: "https://theatre.ticketmaster.co.uk/book/1G7KA-blippi-the-wonderful-world-tour/#perf=1G7KA-2J&date=2024-08-26&time=10.30AM",
        images: [
          {
            url: "https://s1.ticketm.net/dam/a/9fc/981b59c9-daf4-42fb-b74c-d6bccd4069fc_EVENT_DETAIL_PAGE_16_9.jpg",
          },
        ],
        sales: {
          public: {
            startDateTime: "2024-05-02T10:00:00Z",
            endDateTime: "2024-08-26T09:30:00Z",
          },
        },
      },
    ],
  ];

  render(<EventCard events={fakeEvents} />);

  const eventName = await screen.findByText("Blippi: the Wonderful World Tour");

  expect(eventName).toBeInTheDocument();
});

import React from "react";
import { render, screen } from "@testing-library/react";
import Card from "./Card.jsx";

test("renders card component", () => {
  render(<Card />);
  const cardElement = screen.getByTestId("card-test-1");
  expect(cardElement).toBeInTheDocument();
});

test("should render card title", () => {
  const title = "testing";
  render(<Card title={title} />);
  const titleElement = screen.getByTestId("card-test-2");
  expect(titleElement).toBeInTheDocument();
  expect(titleElement).toHaveTextContent("testing");
});

test("should show default message when there's no card content", () => {
  const content = "";
  render(<Card content={content} />);
  const contentElement = screen.getByText("No content at the moment");
  expect(contentElement).toBeInTheDocument();
  expect(contentElement).toHaveTextContent("No content at the moment");
});

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InfoToolTip from "./Tooltip.jsx";

describe("modal tooltip", () => {
  test("renders tooltip", () => {
    render(<InfoToolTip />);
    const tooltipElement = screen.getByTestId("tooltip-test");
    expect(tooltipElement).toBeInTheDocument();
  });
  test("hover over icon to show tooltip", () => {
    const tooltipElement = screen.getByTestId("tooltip-test");
    const hoverIcon = screen.getByTestId("");
  });
});

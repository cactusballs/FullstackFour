import {render, screen} from '@testing-library/react'
import React from 'react'
import fetchMock from 'jest-fetch-mock';
import '@testing-library/jest-dom'
import {BrowserRouter, MemoryRouter} from 'react-router-dom'
import ForumMain from "./ForumMain";

describe("Forum Page", () => {
  test("renders the Village Town Hall", () => {
    render(<ForumMain />);
    const cardElement = screen.getByTestId("forum-test-1");
    expect(cardElement).toBeInTheDocument();
  });

  test("renders card title", () => {
    const title = "testing";
    render(<Card title={title} />);
    const titleElement = screen.getByTestId("card-test-2");
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent("testing");
  });

  test("shows default message when there's no card content", () => {
    const content = ""; //when adding a string here, it will fail the test
    render(<Card content={content} />);
    const contentElement = screen.getByText("No content at the moment");
    expect(contentElement).toBeInTheDocument();
    expect(contentElement).toHaveTextContent("No content at the moment");
  });

  test("only renders footer when footerButton prop is provided", () => {
    const footerButton = <Card cardFooterButton="submit" />;
    render(footerButton);
    const footerElement = screen.getByTestId("card-test-3");
    expect(footerElement).toBeInTheDocument();
  });

  test("doesn't render footer when footerButton prop is not provided", () => {
    render(<Card />);
    //instead of get, its query as it can't find footer element if not rendered
    const footerElement = screen.queryByTestId("card-test-3");
    expect(footerElement).toBeNull();
  });
});
  
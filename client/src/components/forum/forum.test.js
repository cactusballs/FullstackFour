import {render, screen} from '@testing-library/react'
import React from 'react'
import '@testing-library/jest-dom'
import {BrowserRouter, MemoryRouter} from 'react-router-dom'
import ForumMain from "./ForumMain";

describe("Forum  Main Page", () => {
  test("renders the Village Town Hall", () => {
    render(<ForumMain />,{ wrapper: MemoryRouter });
    const forumMain = screen.getByText("Welcome to the Village Town Hall");
      expect(forumMain).toBeInTheDocument();
  });

  test("form also appears", () => {
    render(<ForumMain/>,{ wrapper: MemoryRouter });
    const threadForm = screen.getByText("Start a thread...");
    expect(threadForm).toBeInTheDocument();
  });

  test("Threads/Topics render", () => {
    render(<ForumMain/>,{ wrapper: MemoryRouter });
    const threadTopic = screen.getByText("Sleep");
    expect(threadTopic).toBeInTheDocument();
  });
});
  
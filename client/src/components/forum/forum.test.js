import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import {BrowserRouter, MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store/Store';
import ForumMain from './ForumMain';

// Testing the forum main page 
describe("Forum Main Page", () => {
  test("renders the Village Town Hall", () => {
    render(
      <Provider store={store}>
        <ForumMain />
      </Provider>,
      { wrapper: MemoryRouter }
    );
    const forumMain = screen.getByText("Welcome to the Village Town Hall");
    expect(forumMain).toBeInTheDocument();
  });

  test("form also appears", () => {
    render(
      <Provider store={store}>
        <ForumMain />
      </Provider>,
      { wrapper: MemoryRouter }
    );
    const threadForm = screen.getByText("Start a thread...");
    expect(threadForm).toBeInTheDocument();
  });

  test("Threads/Topics render", () => {
    render(
      <Provider store={store}>
        <ForumMain />
      </Provider>,
      { wrapper: MemoryRouter }
    );
    const threadTopic = screen.getByText("Sleep");
    expect(threadTopic).toBeInTheDocument();
  });
});

// tests for the threads by topic screen 



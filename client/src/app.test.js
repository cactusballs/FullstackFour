import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./store/Store";
import App from "./App";

test("App routing and rendering", async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(screen.getByText(/Log In/i)).toBeInTheDocument();
});

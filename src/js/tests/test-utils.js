import React from "react";
import PropTypes from "prop-types";
import { keys, values } from "lodash";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { MemoryRouter, Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import { render as rtlRender } from "@testing-library/react";

import reducer from "../reducers";
import routes from "../constants/routes";


// helper component
function WrapIntoRouter({ children, initialLocation }) {
    const routesList = values(routes);
    const index = routesList.indexOf(routes[initialLocation]);
    return (
        <MemoryRouter initialEntries={routesList} initialIndex={index}>
            {children}
        </MemoryRouter>
    )
}

WrapIntoRouter.propTypes = {
    children: PropTypes.element.isRequired,
    initialLocation: PropTypes.oneOf(keys(routes)).isRequired
};

// override RTL render
function render(
  ui,
  {
      initialState,
      store = createStore(reducer, initialState, applyMiddleware(promise, thunk)),
      ...renderOptions
  } = {}
) {
    function Wrapper({ children }) {
        return (
            <Provider store={store}>
                {children}
            </Provider>
        )
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

function renderWithRouter(
  ui,
  {
    baseRoutes = ['/'],
    history = createMemoryHistory({ initialEntries: baseRoutes }),
  } = {}
) {
  const Wrapper = ({ children }) => (
    <Router history={history}>{children}</Router>
  );
  return {
    ...rtlRender(ui, { wrapper: Wrapper }),
    history,
  }
}


export * from '@testing-library/react';

export { render, renderWithRouter, WrapIntoRouter };

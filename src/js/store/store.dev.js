import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import rootReducer from "../reducers";


const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // options like actionSanitizer, stateSanitizer
        }) : compose;

const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(
            promise,
            thunk
        )
    )
);

if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
        store.replaceReducer(rootReducer)
    })
}

export default store;

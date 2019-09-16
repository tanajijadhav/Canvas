import { applyMiddleware, createStore,compose } from "redux"

import logger from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"

import reducer from "../reducers/index"
const composePlugin = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middleware = composePlugin(applyMiddleware(promise,thunk,logger))

export default createStore(reducer,middleware);

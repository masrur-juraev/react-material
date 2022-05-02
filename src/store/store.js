import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";

import machineReducer from './reducers/machine/index';
import statorReducer from "./reducers/stator";
import rotorReducer from "./reducers/rotor";
import housingReducer from "./reducers/housing";
import resultsReducer from "./reducers/results";
import lossReducer from "./reducers/loss";

const composeEnhancers = (window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  machine: machineReducer,
  stator: statorReducer,
  rotor: rotorReducer,
  housing: housingReducer,
  results: resultsReducer,
  loss: lossReducer
});

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

export default store;
import { createStore, combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({
  form: formReducer
});

const configureStore = initialState => {
  return createStore(rootReducer, initialState);
};

export default configureStore;

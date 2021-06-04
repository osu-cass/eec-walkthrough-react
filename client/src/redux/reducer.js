
import {combineReducers} from "redux";
import {ADD_TRAINING_ITEM, POPULATE_TRAINING_PAGE, REMOVE_TRAINING_ITEM} from "./actions";

// payload is {id}
const trainingPageItemReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TRAINING_ITEM:
    {
      // remove item (if exists) first
      const filteredList = state.filter(item => item.id !== action.payload.id);
      return [...filteredList, action.payload];
    }

    case REMOVE_TRAINING_ITEM:
      return state.filter(item => item.id !== parseInt(action.payload.id));

    case POPULATE_TRAINING_PAGE:
      return action.payload.items;

    default:
      return state;
  }
};

const trainingPageInfoReducer = (state = {title: "", description: ""}, action) => {
  switch (action.type) {
    case POPULATE_TRAINING_PAGE:
      return action.payload.info;

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  trainingPageItems: trainingPageItemReducer,
  trainingPageInfo: trainingPageInfoReducer
});

export default rootReducer;

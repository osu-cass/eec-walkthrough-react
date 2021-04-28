// all actions relating to the redux store

export const ADD_TRAINING_ITEM = "ADD_TRAINING_ITEM";
export const REMOVE_TRAINING_ITEM = "REMOVE_TRAINING_ITEM";

export function addTrainingItem(payload) {
  return {type: ADD_TRAINING_ITEM, payload};
}

export function removeTrainingItem(payload) {
  return {type: REMOVE_TRAINING_ITEM, payload};
}

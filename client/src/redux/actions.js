// all actions relating to the redux store

export const ADD_TRAINING_ITEM = "ADD_TRAINING_ITEM";
export const REMOVE_TRAINING_ITEM = "REMOVE_TRAINING_ITEM";
export const POPULATE_TRAINING_PAGE = "POPULATE_TRAINING_PAGE";
export const ADD_PAGE_INFO = "ADD_PAGE_INFO";
export const RESET_TRAINING_PAGE = "RESET_TRAINING_PAGE";

export function addTrainingItem(payload) {
  return {type: ADD_TRAINING_ITEM, payload};
}

export function populateTrainingPage(payload) {
  return {type: POPULATE_TRAINING_PAGE, payload};
}

export function removeTrainingItem(payload) {
  return {type: REMOVE_TRAINING_ITEM, payload};
}

export function addPageTrainingPageInfo(payload) {
  return {type: ADD_PAGE_INFO, payload};
}

export function resetTrainingPage() {
  return {type: RESET_TRAINING_PAGE};
}
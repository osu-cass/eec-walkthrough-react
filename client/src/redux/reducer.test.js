import {
  addTrainingItem,
  populateTrainingPage,
  removeTrainingItem,
  resetTrainingPage
} from "./actions";
import rootReducer from "./reducer";
import {
  getTrainingPageContent,
  getTrainingPageInfo,
  getTrainingPageItems
} from "./selectors";

test("provides the initial training-page state", () => {
  expect(rootReducer(undefined, {type: "unknown"})).toEqual({
    trainingPageItems: [],
    trainingPageInfo: {title: "", description: ""}
  });
});

test("adds a training item", () => {
  const item = {id: 1, type: "text", value: "First"};

  expect(rootReducer(undefined, addTrainingItem(item)).trainingPageItems).toEqual([item]);
});

test("deduplicates and updates training items by ID", () => {
  const state = {
    trainingPageItems: [{id: 1, value: "Old"}, {id: 2, value: "Other"}],
    trainingPageInfo: {title: "Training", description: "Description"}
  };
  const replacement = {id: 1, value: "Updated"};

  expect(rootReducer(state, addTrainingItem(replacement)).trainingPageItems).toEqual([
    {id: 2, value: "Other"},
    replacement
  ]);
});

test("removes a training item by ID", () => {
  const state = {
    trainingPageItems: [{id: 1}, {id: 2}],
    trainingPageInfo: {title: "", description: ""}
  };

  expect(rootReducer(state, removeTrainingItem({id: "1"})).trainingPageItems).toEqual([{id: 2}]);
});

test("populates training items and page information together", () => {
  const payload = {
    items: [{id: 3, value: "Loaded"}],
    info: {title: "Loaded training", description: "Loaded description"}
  };

  expect(rootReducer(undefined, populateTrainingPage(payload))).toEqual({
    trainingPageItems: payload.items,
    trainingPageInfo: payload.info
  });
});

test("resets the training items", () => {
  const state = {
    trainingPageItems: [{id: 1}],
    trainingPageInfo: {title: "Training", description: "Description"}
  };

  expect(rootReducer(state, resetTrainingPage()).trainingPageItems).toEqual([]);
});

test("selects items, information, and complete training-page content", () => {
  const state = {
    trainingPageItems: [{id: 1}],
    trainingPageInfo: {title: "Training", description: "Description"}
  };

  expect(getTrainingPageItems(state)).toBe(state.trainingPageItems);
  expect(getTrainingPageInfo(state)).toBe(state.trainingPageInfo);
  expect(getTrainingPageContent(state)).toBe(state);
});

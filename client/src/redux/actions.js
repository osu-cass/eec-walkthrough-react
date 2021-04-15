// all actions relating to the redux store

export const ADD_TRAINING_ITEM = 'ADD_TRAINING_ITEM'
export const REMOVE_TRAINING_ITEM = 'REMOVE_TRAINING_ITEM'

export const addTrainingItem = payload => {
	type: ADD_TRAINING_ITEM, payload
}

export const deleteTrainingItem = payload => {
	type: REMOVE_TRAINING_ITEM, payload
}

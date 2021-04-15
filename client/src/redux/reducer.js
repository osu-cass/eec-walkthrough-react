import { combineReducers } from 'redux'
import { ADD_TRAINING_ITEM, REMOVE_TRAINING_ITEM } from './actions'

// payload is {id}
const trainingPageReducer = (state = [], action) => {
	switch (action.type) {
		case ADD_TRAINING_ITEM:
			// remove item (if exists) first
			const filteredList = state.filter(item => item.id !== action.payload.id)
			console.log(filteredList)
			return [...filteredList, action.payload]

		case REMOVE_TRAINING_ITEM:
			return state.filter(item => item.id !== parseInt(action.payload.id))

		default:
			return state
	}
}

const rootReducer = combineReducers({
	trainingPage: trainingPageReducer
})

export default rootReducer

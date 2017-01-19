import {combineReducers} from 'redux';
import courses from './courseReducer';
import items from './itemReducer';

const rootReducer = combineReducers({
	items
});

export default rootReducer;
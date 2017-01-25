import {combineReducers} from 'redux';
import courses from './courseReducer';
import items from './itemReducer';
import groups from './groupReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
	items,
	groups,
	ajaxCallsInProgress
});

export default rootReducer;
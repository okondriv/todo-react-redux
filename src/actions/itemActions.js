import * as types from './actionTypes';
import itemApi from '../api/mockItemApi';

export function loadItemsSuccess(items) {
	return { type: types.LOAD_ITEMS_SUCCESS, items };
}

export function loadItems() {
	return function(dispatch) {
		return itemApi.getAllItems().then(items => {
			dispatch(loadItemsSuccess(items));
		}).catch(error => {
			throw(error);
		});
	};
}
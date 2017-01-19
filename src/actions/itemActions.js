import * as types from './actionTypes';
import itemApi from '../api/mockItemApi';

export function loadItemsSuccess(items) {
	return { type: types.LOAD_ITEMS_SUCCESS, items };
}

export function createItemSuccess(item) {
	return { type: types.CREATE_ITEM_SUCCESS, item };
}

export function updateItemSuccess(item) {
	return { type: types.UPDATE_ITEM_SUCCESS, item };
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

export function saveItem(item) {
	return function(dispatch, getState) {
		return itemApi.saveItem(item).then(item => {
			item.id ? dispatch(updateItemSuccess(item)) :
			dispatch(createItemSuccess(item));
		}).catch(error => {
			throw(error);
		});
	};
}
import * as types from './actionTypes';
import groupApi from '../api/mockGroupApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadGroupsSuccess(groups) {
	return { type: types.LOAD_GROUPS_SUCCESS, groups };
}

export function createGroupSuccess(group) {
	return { type: types.CREATE_GROUP_SUCCESS, group };
}

export function updateGroupSuccess(group) {
	return { type: types.UPDATE_GROUP_SUCCESS, group };
}

export function deleteGroupSuccess(group) {
	return { type: types.DELETE_GROUP_SUCCESS, group };
}

export function loadGroups() {
	return function(dispatch) {
		dispatch(beginAjaxCall());
		return groupApi.getAllGroups().then(groups => {
			dispatch(loadGroupsSuccess(groups));
		}).catch(error => {
			throw(error);
		});
	};
}

export function saveGroup(group) {
	return function(dispatch, getState) {
		dispatch(beginAjaxCall());
		return groupApi.saveGroup(group).then(group => {
			group.id ? dispatch(updateGroupSuccess(group)) :
			dispatch(createGroupSuccess(group));
		}).catch(error => {
			dispatch(ajaxCallError(error));
			throw(error);
		});
	};
}

export function deleteGroup(group) {
	return function(dispatch, getState) {
		dispatch(beginAjaxCall());
		return groupApi.deleteGroup(group).then(
			dispatch(deleteGroupSuccess(group))
		).catch(error => {
			dispatch(ajaxCallError(error));
			throw(error);
		});
	};
}
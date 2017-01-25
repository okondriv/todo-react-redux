import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function groupReducer(state = initialState.groups, action) {
    switch(action.type) {
        case types.LOAD_GROUPS_SUCCESS:
            return action.groups;
        case types.CREATE_GROUP_SUCCESS:
            return [
              ...state,
              Object.assign({}, action.group)
            ];
        case types.UPDATE_GROUP_SUCCESS:
            return [
              ...state.filter(group => group.id !== action.group.id),
              Object.assign({}, action.group)
            ];
        case types.DELETE_GROUP_SUCCESS:
            return [
              ...state.filter(group => group.id !== action.group.id)
            ];

        default: 
            return state;
    }
}
import * as types from './../constant/ActionTypes';

var data = JSON.parse(localStorage.getItem('tasks'));
var initialState = [];
var myReducer = (state = initialState,action) => {
	switch(action.type){
		case types.LIST_ALL:
			return state;
		default : return state;
	}
};	
export default myReducer;
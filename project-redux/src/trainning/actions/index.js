// Chia nhỏ các action
import * as types from './../constants/ActionTypes';
export const status = () =>{
    return {
        type : types.TOGGLE_STATUS
    }
}

export const sort = (sort) =>{
    return {
        type : types.SORT,
        sort //tuong tu sort : sort
    }
}
import status from './status'; // reducer Status
import sort from './sort'; // reducer Status
import {combineReducers} from 'redux'; // reducer Status

const myReducer = combineReducers({
    status ,
    sort  //sort : {by :by,value:value}
});
 export default myReducer;
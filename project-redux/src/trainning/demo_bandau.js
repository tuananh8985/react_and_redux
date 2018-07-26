// State=>Actions=>Dispatcher=>(Store+Reducer) =>State
// Cụ thể cách hoạt động:
/* 
Store gọi vào Dispatcher,lấy ra các action =>truyền vào Reducer
Store quản lý các state
Action do người dùng thực hiện
Reducer nhận đc các action sẽ thực hiện tính toán và trả về các state mới. 
*/
import { createStore } from 'redux';
var initialState = {
    status :false,
    sort : {
        by : 'name',
        value : 1 //1: tăng (A-Z),-1 giảm (Z - A)
    }
}
// Reducer có tác dụng trả ra state mới.
 var myReducer = (state = initialState,action) =>{
     if(action.type === 'TOGGLE_STATUS'){
        state.status = !state.status;
        return state;
     }
     if(action.type === 'SORT'){
         /* 
         state.sort = {
             by : action.sort.by,
             value : action.sort.value
         } 
         Thuc thi như này sẽ dẫn đến gán state ban đầu của TOGGLE_STATUS và Store là 1.
         */
        var {by,value} = action.sort;//by = action.by
        var {status} = state;//status = state.status
        return {
            status : status,//day la status cu
            sort : {
                by : by,
                value : value
            }
        }
         
         return state;
        
     }
     return state;
 }
//  Sử dụng Reducer trong store
const store = createStore(myReducer);
// Thực hiện công việc thay đổi status
var action = { type : 'TOGGLE_STATUS'};//đây là tên của action
console.log('Default :',store.getState());
store.dispatch(action); //Store sẽ dispath action vao reducer.
console.log('TOGGLE_STATUS :',store.getState());
// Thuc Hiện công việc sắp xếp name Z-A
// Action có chứa tham số
var sortAction = {
    type : 'SORT',
    sort : {
        by : 'name',
        value : -10
    }
}
console.log('SORT BEGIN :',store.getState());
store.dispatch(sortAction); //Store sẽ dispath action vao reducer.
console.log('SORT AFTER :',store.getState());

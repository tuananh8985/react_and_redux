// State=>Actions=>Dispatcher=>(Store+Reducer) =>State
// Cụ thể cách hoạt động:
/* 
Store gọi vào Dispatcher,lấy ra các action =>truyền vào Reducer
Store quản lý các state
Action do người dùng thực hiện
Reducer nhận đc các action sẽ thực hiện tính toán và trả về các state mới. 
*/
import { createStore } from 'redux';
import { status,sort} from './actions/index';//import cac action
import myReducer from './reducers/index';
// Include Xử lý trong reducers/index
//  Sử dụng Reducer trong store
const store = createStore(myReducer);
// Thực hiện công việc thay đổi status
//var action = { type : 'TOGGLE_STATUS'};//đây là tên của action
console.log('Default :',store.getState());
store.dispatch(status()); //status() la mot function
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
store.dispatch(sort({
    by : 'name',
    value : -1
})); //sort() la mot function
console.log('SORT AFTER :',store.getState());

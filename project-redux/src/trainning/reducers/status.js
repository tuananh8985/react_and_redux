var initialState = false;
// Reducer có tác dụng trả ra state mới.
 var myReducer = (state = initialState,action) =>{
     if(action.type === 'TOGGLE_STATUS'){
        state = !state;
        return state;
     }
     return state;
 }

 export default myReducer;
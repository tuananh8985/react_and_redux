var initialState = {
    by : 'status',
    value : 1 //1: tăng (A-Z),-1 giảm (Z - A)
}
// Reducer có tác dụng trả ra state mới.
 var myReducer = (state = initialState,action) =>{
     if(action.type === 'SORT'){
         /* 
         state.sort = {
             by : action.sort.by,
             value : action.sort.value
         } 
         Thuc thi như này sẽ dẫn đến gán state ban đầu của TOGGLE_STATUS và Store là 1.
         */
        var {by,value} = action.sort;//by = action.by
        return { by,value }
         
         return state;
        
     }
     return state;
 }

 export default myReducer;
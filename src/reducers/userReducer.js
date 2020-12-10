
const removeItemInList=(Items,ItemtoRemove)=>{
  

  return Items.filter(item=>item.category!==ItemtoRemove.category)
}
const addItemInList=(Items,ItemToAdd)=>{
  

  Items.push(ItemToAdd);

  return Items


}
export const userReducer = (state = null, action) => {
  switch (action.type) {
    case "LOGGED_IN_USER":
      //getting the type then POPULATE the STATE
      return action.payload;
    case "LOGOUT":
      return action.payload; //e.g in payload is user={} null no value in state
  
    case "ADD_WISHLIST":
      return {...state,wishlist:addItemInList(state.wishlist,action.payload)}

    case "REMOVE_WISHLIST":
      return {...state,wishlist:removeItemInList(state.wishlist,action.payload)}
      
    default:
      return state;
  }
};

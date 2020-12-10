export const categoryReducer = (state = null, action) => {
    switch (action.type) {
      case "ADD_CATEGORY":
      
        return action.payload

      case "FETCH_CATEGORIES":
          
      return action.payload
  
      default:
        return state;
    }
  };
  
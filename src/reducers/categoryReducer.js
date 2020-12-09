export const categoryReducer = (state = null, action) => {
    switch (action.type) {
      case "ADD_CATEGORY":
        console.log("IN REDUCER ADD CATEGORY");
        console.log(action.payload);
        return action.payload

      case "FETCH_CATEGORIES":
          
      return action.payload
  
      default:
        return state;
    }
  };
  
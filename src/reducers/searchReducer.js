const addItemInList=(Items,ItemToAdd)=>{
  

  Items.push(ItemToAdd);

  return Items


}

const removeItemInList=(Items,ItemtoRemove)=>{


  return Items.filter(item=>item.category!==ItemtoRemove.category)
}


const INITIAL_STATE={ text: "",price:[],category:[],sub:"",currentselectedpdts:[],brand:"",color:"",shipping:"",star:"" };


export const searchReducer = (state = INITIAL_STATE , action) => {
  switch (action.type) {
    case "SEARCH_QUERY":
      return { ...state, ...action.payload };
    case "STORE_SEARCH_PRICE":

      return {...state,price:action.payload}

    case "STORE_SEARCH_CATEGORY":

      return {...state,category:addItemInList(state.category,action.payload)}

    case "REMOVE_SEARCH_CATEGORY":

    return {...state,category:removeItemInList(state.category,action.payload)}

    case "CURRENT_SEARCH_RESULTS":
      if (action.payload){
        return {...state,currentselectedpdts:action.payload}
      }else{
        return {...state,currentselectedpdts:[]}
      }

  

    case "CLEAR_SEARCH_PARAMS":
     

    return {...state, text: "",price:[],category:[],sub:"",currentselectedpdts:[],brand:"",color:"",shipping:"" ,star:""};

    case "CLEAR_SUB":
      return {...state,sub:''}

    case "CLEAR_PRICE_AND_CATEGORY":
      return {...state,price:[],category:[]}

    default:
      return state;
  }
};

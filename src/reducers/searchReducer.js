const addItemInList=(Items,ItemToAdd)=>{
  

  Items.push(ItemToAdd);
  console.log("ITEMS NOW!!!!!!!!****************************");
  console.log(Items);
  return Items


}

const removeItemInList=(Items,ItemtoRemove)=>{
  console.log("in remove item in list")

  return Items.filter(item=>item.category!==ItemtoRemove.category)
}


const INITIAL_STATE={ text: "",price:[],category:[],sub:"",currentselectedpdts:[],brand:"",color:"",shipping:"",star:"" };


export const searchReducer = (state = INITIAL_STATE , action) => {
  switch (action.type) {
    case "SEARCH_QUERY":
      //if we have more than 1 property in state, ...action.payload useful
      return { ...state, ...action.payload };
    case "STORE_SEARCH_PRICE":

      return {...state,price:action.payload}

    case "STORE_SEARCH_CATEGORY":
      console.log("STORE SEARCH CATEGORY action.payload");
      console.log(action.payload)
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
      console.log("in clear search params______________________________________");
      console.log("in clear search params______________________________________");
      console.log("in clear search params______________________________________");
      console.log("in clear search params______________________________________");

    return {...state, text: "",price:[],category:[],sub:"",currentselectedpdts:[],brand:"",color:"",shipping:"" ,star:""};

    case "CLEAR_SUB":
      return {...state,sub:''}

    case "CLEAR_PRICE_AND_CATEGORY":
      return {...state,price:[],category:[]}

    default:
      return state;
  }
};
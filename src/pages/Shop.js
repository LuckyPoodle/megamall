import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import { getSubs } from "../functions/sub";
import { getCategories } from "../functions/category";
import { getProductsByCount, getProducts, getProductsCount, fetchProductsByFilter } from "../functions/product"

import { Menu, Slider, Pagination, Checkbox, Radio } from "antd";
import { DollarOutlined, DownSquareOutlined, StarOutlined } from "@ant-design/icons";
import Search from "antd/lib/input/Search";
import Star from "../components/forms/Star";
const { SubMenu, ItemGroup } = Menu;

const Shop = () => {
  //for presentation purpose
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [subs, setSubs] = useState([]);
  
  //for search purpose
  const [sub, setSub] = useState("");
  const [categoryIds, setCategoryIds] = useState([]);
  const [brands, setBrands] = useState([
    "Apple",
    "Samsung",
    "Microsoft",
    "Lenovo",
    "ASUS",
  ]);
  const [brand, setBrand] = useState("");
  const [colors, setColors] = useState([
    "Black",
    "Brown",
    "Silver",
    "White",
    "Blue",
  ]);
  const [color, setColor] = useState("");
  const [shipping, setShipping] = useState("");
  const [star, setStar] = useState("");
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);



  //resetall is to clear all current selected search params
  const [resetall, setResetall] = useState(false);
  //isSearching is to keep track if side panel's search params were used 
  const [isSearching, setIsSearching] = useState(false);


  let dispatch = useDispatch();

  ////////OBTAIN WHAT IS IN REDUX STORE FOR SEARCH PARAMS
  let { search } = useSelector((state) => ({ ...state }));

  //for checkboxes of category
  if (search.category && search.category.length > 0) {
  
    var selectedCheck = search.category.map(c => {
      return c.category
    })
  }
  const reduxSub = search.sub;
  const reduxColor = search.color;
  const reduxShipping = search.shipping;
  const reduxBrand = search.brand;
  const reduxStar=search.star;
  const { text } = search;


  // useEffect(()=>{

  //   console.log("REDUX CHANGED!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
  //   console.log("----------------------------------------");
  //   var currentSelected=search.category;
  //   console.log(currentSelected)

  // },[search])


  // useEffect(() => {
  //   loadAllProducts();
  // }, []);

  // const loadAllProducts = () => {
  //   getProductsByCount(12).then((p) => {
  //     setProducts(p.data);
  //     setLoading(false);
  //   });
  // };

  //1 load products by default
  //NUMBER ONE
  useEffect(() => {

    
      loadAllProducts();
   
    //fetch categories to populate side bar 
    getCategories().then((res) => setCategories(res.data))
    //fetch sub categories to populate side bar
    getSubs().then((res) => setSubs(res.data))

  }, [page, resetall]);

  useEffect(() => {
   
    
    getProductsCount().then((res) => {
      setProductsCount(res.data.length)
    });
  }, []);

  //// load by search text
  ////we delay request by 300 ms to improve performance else too many requests
  useEffect(() => {
    if (text) {

      const delayed = setTimeout(() => {
        let query = text;
        let reduxPrice = search.price;
        fetchProducts({ query, reduxPrice });
      }, 300);
      return () => clearTimeout(delayed);
    } else {
      loadAllProducts();
    }

  }, [text]);

  /////FETCH PRODUCTS BY SEARCH FILTER
  const fetchProducts = (arg) => {

    if (arg.reduxPrice === undefined) {
      arg.reduxPrice = []
      arg.reduxCategories = []
    } 
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
      storeObtainedresultintoRedux(res.data);
    });

    checkIfNoneSelectedAfterSelectionPerformed();
  };


  const storeObtainedresultintoRedux = (list) => {
    setIsSearching(true);
    dispatch({
      type: "CURRENT_SEARCH_RESULTS",
      payload: { list },
    });
  }


  const loadAllProducts = () => {
    setLoading(true);

    //check if we r loading based on side search params
    if (search.category.length || search.price.price || search.sub || reduxColor !== "" || reduxShipping !== "" || reduxBrand !== ""||reduxStar!=="") {
      // alert("hav already selected categories")
      let currentSelected = search.currentselectedpdts;
      if (currentSelected.length===0){
     
        setProducts([])
      }else{
        setProducts(currentSelected.list);
       // console.log("currentSelected ",currentSelected.list)
      }
      // console.log("---In LoadAllProducts----")
      // console.log("search.category",search.category);
      // console.log("search.price.price",search.price.price);
      // console.log("search.sub",search.sub);
      // console.log("reduxColor",reduxColor);
      // console.log("reduxShipping",reduxShipping);
      // console.log("reduxBrand",reduxBrand);
      // console.log("reduxStar",reduxStar)
      
      

      //to repopulate search params selection
      setPrice(search.price.price)
      setBrand(reduxBrand)


     
      setLoading(false)

    } else {

      // sort, order, PAGE is LIMIT of number of products of fetch to be computed further in backend
      getProducts("createdAt", "desc", page, 6).then((res) => {

      
        setProducts(res.data);

        setLoading(false);
      });
    }

  };

  //to save search params in redux
  const updateSearchParams = (key, value) => {
    //ADD_SEARCH_PARAMS
    if (key === 'price') {
      dispatch({
        type: "STORE_SEARCH_PRICE",
        payload: { price: value },
      });

    } else if (key === 'categoryadd') {
      categoryIds.push(value);
      dispatch({
        type: "STORE_SEARCH_CATEGORY",
        payload: { category: value }
      })

    } else if (key === 'categoryremove') {
      categoryIds.splice(value, 1);
      dispatch({
        type: "REMOVE_SEARCH_CATEGORY",
        payload: { category: value }
      })

    } else if (key === 'subadd') {
    
      dispatch({
        type: "SEARCH_QUERY",
        payload: { sub: value },
      });
    } else if (key === 'brandadd') {
      dispatch({
        type: "SEARCH_QUERY",
        payload: { brand: value },
      });
    } else if (key === 'coloradd') {
      dispatch({
        type: "SEARCH_QUERY",
        payload: { color: value },
      });
    } else if (key === 'shippingadd') {
      dispatch({
        type: "SEARCH_QUERY",
        payload: { shipping: value }
      })
    }else if (key === 'staradd') {
      dispatch({
        type: "SEARCH_QUERY",
        payload: { star: value }
      })
    }

  }



  // 3. load products based on price range
  useEffect(() => {
 
    let reduxPrice = search.price.price;
    let reduxCategories = search.category;
    setPrice(reduxPrice);
    reduxCategories = reduxCategories.map((obj) => {
      return obj['category']
    })

    if (reduxPrice && reduxPrice.length === 2) {
     
        fetchProducts({ reduxPrice, reduxCategories });
     
      
   
    } else {
      console.log("NOT MAKING REQUEST DUE TO PRICE")
    }
    checkIfNoneSelectedAfterSelectionPerformed();
  }, [ok]);

  //delay api request by 300 miliseconds
  const handleSlider = (value) => {
   
    //to remove search text if any
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setSub(0);
    //to clear sub-category
    dispatch({
      type: 'CLEAR_SUB'
    });
    
    //to clear stored redux search results
    dispatch({
      type: "CURRENT_SEARCH_RESULTS"
    });

    setPrice(value);
    setIsSearching(true)
    //to save selected price into redux
    updateSearchParams('price', value)

    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  const checkIfNoneSelectedAfterSelectionPerformed = () => {
    if (search.price.price === undefined && categoryIds.length === 0 && reduxSub === "" && isSearching === true &&reduxBrand==="" &&reduxColor==="" &&reduxShipping==="") {
      var oppositeofresetbooleantotrigger = !resetall
      setResetall(oppositeofresetbooleantotrigger);
      setIsSearching(false)
     

    }

  }

  //4.load products based on category
  //show categories in a list of checkbox
  const showCategories = () => categories.map((c) => (
    <div key={c._id}>
      <Checkbox
        onChange={handleCheck}
        className="pb-2 pl-4 pr-4"
        value={c._id}
        name="category"
        checked={selectedCheck ? selectedCheck.includes(c._id) : ""}
      >
        {c.name}
      </Checkbox>
      <br />
    </div>
  ));

  const resetParams = () => {

    dispatch({
      type: "CURRENT_SEARCH_RESULTS"
    });

    dispatch({
      type: "CLEAR_SEARCH_PARAMS"
    });

    //clearing selection
    setPrice([0, 0]);
    setIsSearching(false)
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");
    setCategoryIds([]);
  

    
    var oppositeofresetbooleantotrigger = !resetall;
  

    setResetall(oppositeofresetbooleantotrigger)

  }


  //handle check for categories
  const handleCheck = e => {

    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: "" },

    });

    setSub("");
    dispatch({
      type: 'CLEAR_SUB'
    });

    setIsSearching(true)
    let inTheState = [...categoryIds];
    let justChecked = e.target.value;

    let foundInTheState = inTheState.indexOf(justChecked);  //indexOf method returns index if found else -1
    if (foundInTheState === -1) {
      inTheState.push(justChecked)

      //save to redux the current categories selected
      updateSearchParams('categoryadd', justChecked);

      let reduxPrice = search.price;

      let reduxCategories = search.category;

      reduxCategories = reduxCategories.map((obj) => {
        return obj['category']
      })

      fetchProducts({ reduxPrice, reduxCategories });


    } else {
      //remove one item from index
      inTheState.splice(foundInTheState, 1);
      updateSearchParams('categoryremove', justChecked)

      let reduxPrice = search.price;

      // let reduxCategories=search.category;


      // console.log("REDUX CATEGORIES!!!!!!!!!!!!!")
      // console.log(reduxCategories)
      // reduxCategories=reduxCategories.map((obj)=>{
      //   return obj['category']
      // })

      //what's left selected after a category is removed
      let reduxCategories = inTheState;
      fetchProducts({ reduxPrice, reduxCategories });
    }

    //keep UI selected
    setCategoryIds(inTheState);

  }

  // 5. show products by star rating
  const handleStarClick = (num) => {
    // console.log(num);
    
    resetParams();

      //clearing selection
      setPrice([0, 0]);
      setSub("");
      setBrand("");
      setColor("");
      setShipping("");
      setCategoryIds([]);
      dispatch({
      type: 'CLEAR_SUB'

    });
    
    setIsSearching(true);


    setStar(num);
    updateSearchParams('staradd', num)
    fetchProducts({ stars: num });
  };

  // 6. show products by sub category
  const showSubs = () =>
    subs.map((s) => (
      <div
        key={s._id}
        onClick={() => handleSub(s)}
        className="p-1 m-1 badge badge-secondary"
        style={{ cursor: "pointer" }}
      >
        {s.name}
      </div>
    ));

  const handleSub = (sub) => {
    // console.log("SUB", sub);
    setSub(sub);
    

    resetParams();

    dispatch({
      type: "CURRENT_SEARCH_RESULTS"
    });

    dispatch({
      type: "CLEAR_PRICE_AND_CATEGORY"
    });

    setPrice([0, 0]);
 
    setBrand("");
    setColor("");
    setShipping("");
    setCategoryIds([]);
    setStar("");

    updateSearchParams('subadd', sub)
    fetchProducts({ sub });
  };


  const showStars = () => (
    <div className="pr-4 pl-4 pb-2">
      {reduxStar===5?   <Star key="s1" starClick={handleStarClick} numberOfStars={5} color={'red'}  />:   <Star key="s1" starClick={handleStarClick} numberOfStars={5}  />}
      {reduxStar===4?   <Star key="s2" starClick={handleStarClick} numberOfStars={4} color={'red'}  />:   <Star key="s2" starClick={handleStarClick} numberOfStars={4}  />}

      {reduxStar===3?   <Star key="s3" starClick={handleStarClick} numberOfStars={3} color={'red'}  />:   <Star key="s3" starClick={handleStarClick} numberOfStars={3}  />}
      {reduxStar===2?   <Star key="s4" starClick={handleStarClick} numberOfStars={2} color={'red'}  />:   <Star key="s4" starClick={handleStarClick} numberOfStars={2}  />}
      {reduxStar===1?   <Star key="s5"  starClick={handleStarClick} numberOfStars={1} color={'red'}  />:   <Star key="s5" starClick={handleStarClick} numberOfStars={1}  />}

    
    </div>
  );

  // 7. show products based on brand name
  const showBrands = () =>
    brands.map((b) => (
      <Radio
        value={b}
        name={b}
        key={b}
        checked={b === brand}
        onChange={handleBrand}
        className="pb-1 pl-4 pr-4"
      >
        {b}
      </Radio>
    ));

  const handleBrand = (e) => {

    resetParams();



    setPrice([0, 0]);
    setSub("");
    setColor("");
    setShipping("");
    setCategoryIds([]);
    setStar("");

    setBrand(e.target.value);
 
    updateSearchParams("brandadd", e.target.value)
    fetchProducts({ brand: e.target.value });
  };

  // 8. show products based on color
  const showColors = () =>
    colors.map((c) => (
      <Radio
        value={c}
        name={c}
        key={c}
        checked={c === color}
        onChange={handleColor}
        className="pb-1 pl-4 pr-4"
      >
        {c}
      </Radio>
    ));

  const handleColor = (e) => {
   
   
    resetParams();

    setPrice([0, 0]);
    setSub("");
    setBrand("");
    setShipping("");
    setCategoryIds([]);
    setStar("");



    setColor(e.target.value);
   

    updateSearchParams("coloradd", e.target.value)
    fetchProducts({ color: e.target.value });
  };

  // 9. show products based on shipping yes/no
  const showShipping = () => (
    <>
      <Checkbox
        key="shipping1"
        className="pb-2 pl-4 pr-4"
        onChange={handleShippingchange}
        value="Yes"
        checked={shipping === "Yes"}
      >
        Yes
      </Checkbox>

      <Checkbox
        key="shipping2"
        className="pb-2 pl-4 pr-4"
        onChange={handleShippingchange}
        value="No"
        checked={shipping === "No"}
      >
        No
      </Checkbox>
    </>
  );

  const handleShippingchange = (e) => {
 
    resetParams();

    setPrice([0, 0]);
    setSub("");
    setBrand("");
    setColor("");
    setCategoryIds([]);
    setStar("");

    setShipping(e.target.value);
    updateSearchParams('shippingadd', e.target.value)
    fetchProducts({ shipping: e.target.value });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">


          <h4>Filter</h4>
          <button className="ml-4 mr-4" onClick={resetParams}>RESET</button>
          <Menu defaultOpenKeys={["1", "2","3","4","5","6","7"]} mode="inline">

            {/* for PRICE */}
            <SubMenu
              key="1"
              title={
                < span key="pricespan" className="h6">
                  <DollarOutlined /> Price
                </span>
              }
            >
              <div>
                <Slider
                  className="ml-4 mr-4"
                  tipFormatter={(v) => `$${v}`}
                  range
                  value={price}
                  onChange={handleSlider}
                  max="10000"
                />
              </div>
            </SubMenu>

            {/* FOR CATEGORY*/}
            <SubMenu
              key="2"
              title={
                <span key="categoryspan"className="h6">
                  <DownSquareOutlined /> Categories
                </span>
              }
            >

              <div style={{ maringTop: "-10px" }}>

                {showCategories()}

              </div>
            </SubMenu>

            {/* stars */}
            <SubMenu
              key="3"
              title={
                <span key="ratingspan" className="h6">
                  <StarOutlined /> Rating
                </span>
              }
            >
              <div style={{ maringTop: "-10px" }}>{showStars()}</div>
            </SubMenu>

            {/* sub category */}
            <SubMenu
              key="4"
              title={
                <span key="subspan" className="h6">
                  <DownSquareOutlined /> Sub Categories
                </span>
              }
            >
              <div style={{ maringTop: "-10px" }} className="pl-4 pr-4">
                {showSubs()}
              </div>
            </SubMenu>

            {/* brands */}
            <SubMenu
              key="5"
              title={
                <span key="brandspan" className="h6">
                  <DownSquareOutlined /> Brands
                </span>
              }
            >
              <div style={{ maringTop: "-10px" }} className="pr-5">
                {showBrands()}
              </div>
            </SubMenu>

            {/* colors */}
            <SubMenu
              key="6"
              title={
                <span key="colorspan"className="h6">
                  <DownSquareOutlined /> Colors
                </span>
              }
            >
              <div style={{ maringTop: "-10px" }} className="pr-5">
                {showColors()}
              </div>
            </SubMenu>

            {/* shipping */}
            <SubMenu
              key="7"
              title={
                <span key="shippingspan" className="h6">
                  <DownSquareOutlined /> Shipping
                </span>
              }
            >
              <div style={{ maringTop: "-10px" }} className="pr-5">
                {showShipping()}
              </div>
            </SubMenu>


          </Menu>





        </div>

        <div className="col-md-9">
          <br></br>
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
              <h4 style={{ color: '#2965b3' }}>All Products</h4>
            )}

          {reduxSub? `Sub Category: ${reduxSub.name}` : ""}
          {reduxBrand?`Brand: ${reduxBrand}`:""}
          {reduxColor?`Color: ${reduxColor}`:""}


          {products.length < 1 && <p>No products found</p>}

          <div className="row pb-5">
            {products.map((p) => (
              <div key={p._id} className="col-md-4 mt-3">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
          {isSearching ? "" :
            <div className="row">
              <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
                <Pagination
                  current={page}
                  total={(productsCount / 6) * 10}
                  onChange={(value) => setPage(value)}
                />
              </nav>

            </div>}
        </div>

      </div>
      <br></br>
      <br></br>
    </div>
  );
};

export default Shop;

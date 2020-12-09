import React,{useState} from "react";
import { Card,Badge,Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined,  } from "@ant-design/icons";
import defaultImage from "../../assets/defaultimage.png"
import { Link } from "react-router-dom";
import {showAverage} from "../../functions/rating"
import _ from "lodash";
import {useSelector,useDispatch} from "react-redux";



const { Meta } = Card;
const {Ribbon}=Badge;

const ProductCard = ({ product }) => {
  // destructure
  const { images, title, description, slug,price ,discountedprice} = product;


  const [tooltip,setTooltip]=useState('Click to add');

  //redux
  
  const dispatch=useDispatch();

  const haveDiscount=(originalprice,discountprice)=>{
    return(
      <div>
        SALE!
        <br></br>
        $<strike>{originalprice}</strike> Now $ {discountprice}
      </div>
    )
  }

  const handleAddToCart=()=>{
 
    //create cart array
    let cart=[]
   
    if(typeof window !=='undefined'){
      //if localstorage already have cart, get it
      if (localStorage.getItem('cart')){
        //items saved in localstorage as json data
        cart=JSON.parse(localStorage.getItem('cart'))
      }
      //we push in a NEW OBJECT into array
      //we spread product as it means we get all the values of product like brand etc
      //count was not there, so we add a new property to product COUNT 
      cart.push({
        ...product,count:1,
      });
      //save to local storage

      //remove duplicates
      let unique =_.uniqWith(cart,_.isEqual);

      localStorage.setItem('cart',JSON.stringify(unique));
         //show tooltip
    setTooltip("Added");

    //add to redux
    dispatch({
      type:"ADD_TO_CART",
      payload:unique,
    });
       // show cart items in side drawer
       dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  }

  return (

    <>
            {product && product.ratings && product.ratings.length > 0
          ? showAverage(product,true)
          : <div className="text-center pt-1 pb-3">No rating yet</div>}
      
   {discountedprice?
   <Ribbon text="SALE">
    <Card
    cover={
      <img
        alt="cover image"
        src={images && images.length ? images[0].url :defaultImage}
        style={{ height: "150px", objectFit: "cover" }}
        className="p-1"
      />
    }
    actions={[
      <Link to={`/product/${slug}`}>
        <EyeOutlined className="text-warning" /> <br /> View Product
      </Link>,
  <Tooltip title={tooltip}>
          <a onClick={handleAddToCart} disabled={product.quantity<1}>
       <ShoppingCartOutlined className="text-danger" /> <br /> 
       {product.quantity<1?"SOLD OUT":"Add to cart"}
     </a>
  </Tooltip>,
    ]}
  >
    {discountedprice? haveDiscount(price,discountedprice):<span>$ {price}</span>}
    

   
    <Meta
      title={title}
      description={`${description && description.substring(0, 40)} ...`}
    />
  </Card></Ribbon>:
   <Card
   cover={
     <img
       src={images && images.length ? images[0].url :defaultImage}
       style={{ height: "150px", objectFit: "cover" }}
       className="p-1"
     />
   }
   actions={[
     <Link to={`/product/${slug}`}>
       <EyeOutlined className="text-warning" /> <br /> View Product
     </Link>,
   <Tooltip title={tooltip}>
   <a onClick={handleAddToCart} disabled={product.quantity<1}>
 <ShoppingCartOutlined className="text-danger" /> <br /> Add to Cart
</a>
</Tooltip>,
   ]}
 >
   {discountedprice?haveDiscount(price,discountedprice): <span>$ {price}</span>}
   

  
   <Meta
     title={title}
     description={`${description && description.substring(0, 40)} ...`}
   />
 </Card>}
    </>
  );
};

export default ProductCard;

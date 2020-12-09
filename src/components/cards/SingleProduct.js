import React, { useState, useEffect } from "react";
import { Card, Tabs, Tooltip } from "antd";

import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import defaultImage from "../../assets/defaultimage.png"
import ProductListItems from "./ProductListItems";
import StarRating from "react-star-ratings";
import RatingModal from '../modal/RatingModal';
import { showAverage } from "../../functions/rating"
import { addToWishlist,removeWishlist  } from "../../functions/user";
import { toast } from "react-toastify";


import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";

const { TabPane } = Tabs;

///THIS IS CHILD COMPONENT OF PRODUCT PAGE,
const SingleProduct = ({ product, onStarClick, star}) => {
  const { title, images, description, _id } = product;
  const [tooltip, setTooltip] = useState('Click to add');


  const [isWishlist,setIswishlist]=useState(false);

  
  const dispatch = useDispatch();
  
  //redux
  let { user} = useSelector((state) => ({ ...state }));

  useEffect(()=>{
    if (user){
      if (user.wishlist.includes(product._id)){
        console.log("product is in wishlist")
        setIswishlist(true)
      }else{
        console.log("not in wishlist")
      }
    }
  })


  const handleAddToCart = () => {

    //create cart array
    let cart = []
    if (typeof window !== 'undefined') {
      //if localstorage already have cart, get it
      if (localStorage.getItem('cart')) {
        //items saved in localstorage as json data
        cart = JSON.parse(localStorage.getItem('cart'))
      }
      //we push in a NEW OBJECT into array
      //we spread product as it means we get all the values of product like brand etc
      //count was not there, so we add a new property to product COUNT 
      cart.push({
        ...product, count: 1,
      });
      //save to local storage

      //remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);

      localStorage.setItem('cart', JSON.stringify(unique));
      //show tooltip
      setTooltip("Added");

      //add to redux
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
      // show cart items in side drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  }

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    if (isWishlist){
      removeWishlist(product._id, user.token);
  
      dispatch({
        type: "REMOVE_WISHLIST",
        payload: product._id,
      });
      toast.error("Removed from wishlist");
      setIswishlist(false)

    }else{
      addToWishlist(product._id, user.token).then((res) => {
        console.log("ADDED TO WISHLIST", res.data);
        setIswishlist(true)
        toast.success("Added to wishlist");
        //history.push("/user/wishlist");
      });
      dispatch({
        type: "ADD_WISHLIST",
        payload: product._id,
      });
    }

  };



  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images && images.map((i) => <img alt="card image" src={i.url} key={i.public_id} />)}
          </Carousel>
        ) : (
            <Card cover={<img alt="card image" src={defaultImage} className="mb-3 card-image" />}></Card>
          )}

        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            Call use on xxxx xxx xxx to learn more about this product.
          </TabPane>
        </Tabs>
      </div>

      <div className="col-md-5">
        <h1 className="bg-info p-3">{title}</h1>
        {product && product.ratings && product.ratings.length > 0
          ? showAverage(product, false)
          : <div className="text-center pt-1 pb-3">No rating yet</div>}


        <Card
          actions={[
            <Tooltip title={tooltip}>
              <a onClick={handleAddToCart} disabled={product.quantity < 1}>
                <ShoppingCartOutlined className="text-danger" /> <br />
                {product.quantity < 1 ? "SOLD OUT" : "Add to cart"}
              </a>
            </Tooltip>,
            <a onClick={handleAddToWishlist}>
              <HeartOutlined className="text-info" /> <br />
              {isWishlist ? "In Wishlist" : "Add to Wishlist"}

            </a>,
            <RatingModal>

              <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick}
                isSelectable={true}
                starDimension="30px"
                starHoverColor="#2965b3"
                starRatedColor="#2965b3"
              />
            </RatingModal>
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;

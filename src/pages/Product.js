import React, { useEffect, useState } from "react";
import { getProduct,productStar } from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct";
import {useSelector} from "react-redux";
import { getRelated } from "../functions/product";
import ProductCard from "../components/cards/ProductCard";
const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const [star,setStar]=useState(0);
  const [clickonleaverating,setClickonleaverating]=useState(false)
  const [related, setRelated] = useState([]);
  const [update,setUpdate]=useState(false)


  //redux
  const {user}=useSelector((state)=>({...state}))

  const { slug } = match.params;

  useEffect(() => {
    const loadSingleProduct = () => {
      console.log("loadSingleProduct_________________________")
      getProduct(slug).then((res) => {
        console.log("getProduct.....res is",res)
        setProduct(res.data);
        // load related
        getRelated(res.data._id).then((res) => setRelated(res.data));
      });
    }; 
    loadSingleProduct();
  }, [slug,update]);

  useEffect(()=>{
    console.log("in Product.js , useEffect")
    if (product.ratings && user){
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );
      //if have existing rating by the user, then show the rating given by th euser
      existingRatingObject && setStar(existingRatingObject.star);
    }
  },[clickonleaverating])

  const onStarClick=(newRating,name)=>{
    setClickonleaverating(!clickonleaverating);
    console.log("ON STAR CLICK")
    console.table(newRating,name);
    setStar(newRating);
    console.log(star)

    productStar(name,newRating,user.token)
    .then(res=>{
      console.log('rating!!',res.data);
//loadSingleProduct(); //if want to show updated rating in real-time
      setUpdate(!update)
    })

  }

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct product={product} onStarClick={onStarClick} star={star} />
      </div>

      <div className="row">
        <div className="col text-center pt-5 pb-5">
          <hr />
          <h4>Related Products</h4>
          <hr />
        </div>
      </div>

      <div className="row pb-5">
        {related.length ? (
          related.map((r) => (
            <div key={r._id} className="col-md-4">
              <ProductCard product={r} />
            </div>
          ))
        ) : (
          <div className="text-center col">No Related Products Found</div>
        )}
      </div>
    </div>
  );
};

export default Product;

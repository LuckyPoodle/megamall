import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import ProductCreateForm  from '../../../components/forms/ProductCreateForm';
import {LoadingOutlined } from "@ant-design/icons";
import FileUpload from "../../../components/forms/FileUpload";

//for category
import {
  
  getCategories,getCategorySubs

} from "../../../functions/category";



const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  discountedprice:"",
  images: [],
  colors:["Black", "Brown", "Silver", "White", "Blue","Red","Gold","Light Blue"],
  brands: ["TrustyProducer", "TrustyProducer II", "TrustyProducer III", "TrustyProducer IV", "TrustyProducer"],
  color: "",
  brand: "",
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);

  const [subOptions,setSubOptions]=useState([]);
  const [showSub,setShowSub]=useState(false);
  const [loading,setLoading]=useState(false);

  // redux
  const { user } = useSelector((state) => ({ ...state }));




 
  useEffect(() => {
    loadCategories();

  },[]);

  const loadCategories = () =>
    getCategories().then((c) => setValues({...values,categories:c.data}));
//we get an array of categories

  const handleSubmit = (e) => {
    e.preventDefault();

    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        window.alert(`"${res.data.title}" is created`);
        window.location.reload();
      })
      .catch((err) => {
    
        //we received error sent via json 
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  
  };


  const handleCategoryChange=async (e)=>{
 //like this below also can
    // e.preventDefault();
    // console.log("CLICKED CATEGORY", e.target.value);
    // setValues({ ...values, category: e.target.value });
    // console.log("in handlecategory");
    // const subbs=await getCategorySubs(e.target.value);
    // try{
    //   console.log(subbs);
    //   setSubOptions(subbs.data);
    // }catch(err){
    //   console.log(err)
    // }

    e.preventDefault();
   
    //subs:[] because we want to remove previous values in subs when you choose another category
    setValues({ ...values, subs:[], category: e.target.value });
    getCategorySubs(e.target.value).then((res) => {
    
      setSubOptions(res.data);
    });

    setShowSub(true);



  }
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-6">
          {loading?<LoadingOutlined />:<h4>Create a Product entry</h4>}
         <br></br>
         <div className="p-3">
            <FileUpload values={values} setValues={setValues} setLoading={setLoading}/>
          </div>
          {JSON.stringify(values.images)}

            <ProductCreateForm 
            handleSubmit={handleSubmit}
             handleChange={handleChange} values={values}  
             handleCategoryChange={handleCategoryChange}
             subOptions={subOptions}
             showSub={showSub}
             setValues={setValues}
             />
      
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;

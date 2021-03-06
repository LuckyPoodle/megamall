import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";

import { useSelector,useDispatch } from "react-redux";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category";
import {EditOutlined,DeleteOutlined } from '@ant-design/icons'
import {Link} from "react-router-dom"

//reuse code
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const CategoryCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  /// SEARCH FILTERING step1
  const [keyword,setKeyword]=useState("");

  const dispatch=useDispatch();

  useEffect(() => {
    loadCategories();
    getCategories()
    .then((res) => {
     
      //putting the categories obtained from backend into redux store here
      dispatch({
        type: "FETCH_CATEGORIES",
        payload: {
          categories:res.data
        },
      });
    })
    .catch((err) => console.log(err));
  }, [dispatch]);
  


  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
       
        setLoading(false);
        setName("");
        categories.unshift(res.data)

        dispatch({
          type: "ADD_CATEGORY",
          payload: {
            categories:categories
          },
        });

       
       alert('Created category')
      })
      .catch((err) => {
       
        setLoading(false);
        if (err.response.status === 400) alert(err.response.data);
      });
  };
  const handleRemove = async (slug) => {
   
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
         // toast.error(`${res.data.name} deleted`);
         alert('Deleted category')
          loadCategories();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
           // toast.error(err.response.data);
           alert('Something went wrong, please contact customer service')
          }
        });
    }
  };



      /// SEARCH FILTERING step4
      
    const searched=(keyword)=>(c)=>c.name.toLowerCase().includes(keyword)


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            <h3>Create a new category</h3>
          
          )}
            <br></br>
         <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} creating={'Category'}/>

<hr></hr>

         
<h4>Current categories</h4>

          {/* SEARCH FILTERING step2  and 3 in reusable component LocalSearch */}

        <LocalSearch setKeyword={setKeyword} keyword={keyword}/>

               {/* SEARCH FILTERING step5  */}
         {categories.filter(searched(keyword)).map((c)=>(
           <div className="alert alert-secondary col-md-6" key={c._id}>
             
             {c.name} <span onClick={()=>handleRemove(c.slug)}className="btn btn-sm float-right text-danger" ><DeleteOutlined/>Delete</span> <Link  className="btn btn-sm float-right text-warning" to={`/admin/category/${c.slug}`}><EditOutlined/>Edit</Link>
           </div>
         ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;

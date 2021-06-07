import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";

import { useSelector } from "react-redux";
import { getCategory, updateCategory } from "../../../functions/category";


//reuse code
import CategoryForm from "../../../components/forms/CategoryForm";

//use router props to get slug
const CategoryUpdate = ({ history, match }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCategory = () =>
    //this gives us the category to set the name of the existing category
  getCategory(match.params.slug).then((c) => setName(c.data.name));
    loadCategory();
  },[])



  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    
    updateCategory(match.params.slug, { name }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName("");
        //toast.success(`"${res.data.name}" is updated`);
        //alert('Updated category')
        history.push("/admin/category");
      })
      .catch((err) => {
      
        setLoading(false);
        if (err.response.status === 400) alert(err.response.data);
      });
  };



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
            <h4>Update category</h4>
          )}
            <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName}/>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;

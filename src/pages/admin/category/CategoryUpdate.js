import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategory, updateCategory } from "../../../functions/category";


//reuse code
import CategoryForm from "../../../components/forms/CategoryForm";

//we can use router props to get slug, dunnid use useParams from react-router-dom
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
    console.log("IN UPDATECATEGORY HANDLESUBMIT");
    console.log(user.token)
    updateCategory(match.params.slug, { name }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is updated`);
        history.push("/admin/category");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
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

import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import { createSub, getSub, removeSub, getSubs } from "../../../functions/sub";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const SubCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [categoryName,setCategoryName]=useState("");
  const [subs, setSubs] = useState([]);
  // step 1
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const loadSubs = () => getSubs()
  .then((s) => {
    setSubs(s.data);
    console.log("LOAD SUBS");
    console.log(subs);
  
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("HANDLESUBMIT CATEGORY")
    console.log(category);
    setLoading(true);
    createSub({ name, parent: category,parentCategoryName:categoryName }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created`);
        loadSubs();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    // let answer = window.confirm("Delete?");
    // console.log(answer, slug);
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeSub(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadSubs();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  // step 4
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

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
            <h4>Create sub category</h4>
          )}

          <div className="form-group">
            <label>Parent category of sub-category you are creating</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => {
                setCategory(e.target.value.split(',')[0]); 
                //console.log(e.target.value.split(',')[0]);
                setCategoryName(e.target.value.split(',')[1])
              }}
            >
              <option>Please select</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={[c._id,c.name]}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
            creating={'Sub Category'}
          />

          {/* step 2 and step 3 */}
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          {/* step 5 */}
          {subs.filter(searched(keyword)).map((s) => (
            <div  className="alert alert-secondary col-md-6" key={s._id}>
              {s.name}
              {<br></br>}
              {<span style={{fontWeight:'bold'}}>Parent Category</span>} : {s.parentCategoryName}
             
              <span
                onClick={() => handleRemove(s.slug)}
                className="btn btn-sm float-right"
              >
                <DeleteOutlined className="text-danger" />
              </span>
              <Link to={`/admin/sub/${s.slug}`}>
                <span className="btn btn-sm float-right">
                  <EditOutlined className="text-warning" />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubCreate;

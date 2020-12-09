import React from 'react'
import {Select} from 'antd';

const {Option}=Select;
const ProductCreateForm = ({handleChange,handleSubmit,values,handleCategoryChange,setValues,subOptions,showSub}) => {

     // destructure
  const {
    title,
    description,
    price,
    categories,
 
    subs,
 
    quantity,
    discountedprice,
  
    colors,
    brands,
    
  
  } = values;
    return (
        <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={title}
            onChange={handleChange}
            style={{marginLeft:'10%'}}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            name="description"
            className="form-control"
            value={description}
            onChange={handleChange}
            style={{marginLeft:'10%'}}
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            className="form-control"
            value={price}
            onChange={handleChange}
            style={{marginLeft:'10%'}}
          />
        </div>
        <div className="form-group">
          <label>Discounted price (Leave blank if not applicable)</label>
          <input
            type="number"
            name="discountedprice"
            className="form-control"
            value={discountedprice}
            onChange={handleChange}
            style={{marginLeft:'10%'}}
          />
        </div>

        <div className="form-group">
          <label>Shipping</label>
          <select
            name="shipping"
            className="form-control"
            onChange={handleChange}
            style={{marginLeft:'10%'}}
          >
            <option>Please select</option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            className="form-control"
            value={quantity}
            onChange={handleChange}
            style={{marginLeft:'10%'}}
          />
        </div>

        <div className="form-group">
          <label>Color</label>
          <select
            name="color"
            className="form-control"
            onChange={handleChange}
            style={{marginLeft:'10%'}}
          >
            <option>Please select</option>
            {colors.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Brand</label>
          <select
            name="brand"
            className="form-control"
            onChange={handleChange}
            style={{marginLeft:'10%'}}
          >
            <option>Please select</option>
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
        <label>Category</label>
        <select
          name="category"
          className="form-control"
          onChange={handleCategoryChange}
          style={{marginLeft:'10%'}}
        >
          <option>Please select</option>
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

   
              {
                showSub &&       <div>
                <label>Sub Categories</label>
               {/*subs is deconstructed from values  */}
                <Select
                  mode="multiple"
                        
                  placeholder="Please select"
                  value={subs}
                  style={{marginLeft:'10%',marginTop:'5%', width: "100%"}}
                  onChange={(value) => setValues({ ...values, subs: value })}
                >
                 {subOptions.length &&
                      subOptions.map((s) => (
                        <Option key={s._id} value={s._id}>
                          {s.name}
                        </Option>
                      ))}
                </Select>
              </div>
        
             
              }

      <br></br>
        <button   style={{marginLeft:'10%'}} className="btn btn-outline-info">Save</button>
      </form>
    )
}

export default ProductCreateForm;

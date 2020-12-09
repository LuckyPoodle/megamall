import React from 'react'
import {SearchOutlined } from '@ant-design/icons'
const LocalSearch = ({keyword,setKeyword}) => {

       /// SEARCH FILTERING step3
       const handleSearchChange =(e)=>{

        e.preventDefault();
        setKeyword(e.target.value.toLowerCase())
  
      }
    return (


        <div container="container pt-4 pb-4"style={{ width: '30%', display: 'flex' }}>

            <input type="search" style={{ width: '30%', flex: '1' }} placeholder="Search" value={keyword} onChange={handleSearchChange} className="form-control mb-4" ></input>
            <SearchOutlined style={{ flex: '0.1' }} />
        </div>
    )
}

export default LocalSearch

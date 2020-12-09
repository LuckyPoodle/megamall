import React from "react";

import Jumbotron from "../components/cards/Jumbotron";

import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import SubList from "../components/sub/SubList";
import CategoryList from "../components/category/CategoryList";

const Home = () => {

  return (
    <>
      <div className="jumbotron jumbotron-fluid h1 font-weight-bold text-white text-center" style={{backgroundColor:'#154A8F'}}>
          <Jumbotron text={["Latest Products","New Arrivals","Best Sellers"]} />
      </div>

 
      <h4 className="text-center p-3 mt-5 mb-5 display-4 text-white" style={{backgroundColor:'#2965b3'}}>
        New Arrivals
      </h4>
      <NewArrivals />

      <h4 className="text-center p-3 mt-5 mb-5 display-4 text-white" style={{backgroundColor:'#2965b3'}}>
        Best Sellers
      </h4>
      <BestSellers />
      <h4 className="text-center p-3 mt-5 mb-5 display-4 text-white" style={{backgroundColor:'#2965b3'}}>
        Categories
      </h4>
      <CategoryList />
      <h4 className="text-center p-3 mt-5 mb-5 display-4 text-white" style={{backgroundColor:'#2965b3'}}>
        Sub Categories
      </h4>
      <SubList />
      <br>
      </br>
      <br></br>
    </>
  );
};

export default Home;

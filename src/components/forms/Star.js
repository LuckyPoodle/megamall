import React from "react";
import StarRating from "react-star-ratings";

const Star = ({ starClick, numberOfStars,color }) => (
  <>
    <StarRating
      changeRating={() => starClick(numberOfStars)}
      numberOfStars={numberOfStars}
      starDimension="20px"
      starSpacing="2px"
      starHoverColor="red"
      starEmptyColor={color}
    />
    <br />
  </>
);

export default Star;

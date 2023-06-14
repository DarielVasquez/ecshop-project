import React from "react";
import { MdStar, MdStarOutline, MdStarHalf } from "react-icons/md";

const Rating: React.FC<{ rating: number }> = ({ rating }) => {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= filledStars) {
        stars.push(<MdStar key={i}></MdStar>);
      } else if (hasHalfStar && i === filledStars + 1) {
        stars.push(<MdStarHalf key={i}></MdStarHalf>);
      } else {
        stars.push(<MdStarOutline key={i}></MdStarOutline>);
      }
    }

    return stars;
  };

  return <div>{renderStars()}</div>;
};

export default Rating;

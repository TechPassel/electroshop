import React from 'react';
import PropTypes from 'prop-types';

const Rating = ({ rating, numReviews, color }) => {
  let starRating = () => {
    let stars = [];
    for (let index = 0; index < 5; index++) {
      stars.push(
        <span key={index}>
          <i
            style={{ color }}
            className={
              rating >= index + 1
                ? 'fas fa-star'
                : rating >= index + 0.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          ></i>
        </span>
      );
    }
    return stars;
  };

  return (
    <div className='rating'>
      {starRating()}
      {/* <br /> */}
      <span>{numReviews && numReviews} reviews</span>
    </div>
  );
};

Rating.defaultProps = {
  color: '#f8e825',
};

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  numReviews: PropTypes.number.isRequired,
  color: PropTypes.string,
};
export default Rating;

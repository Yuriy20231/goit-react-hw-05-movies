import { API_KEY, BASE_URL } from 'API/API';
import axios from 'axios';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const { useParams } = require('react-router-dom');
const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function getReviews() {
      const searchParams = new URLSearchParams({
        api_key: API_KEY,
      });
      const url = `${BASE_URL}/movie/${movieId}/reviews?${searchParams}`;
      const resp = await axios.get(url);
      const { data } = resp;
      setReviews(data.results);
    }
    getReviews();
  }, [movieId]);

  console.log(reviews);

  return (
    <div>
      <ul>
        {reviews.length !== 0
          ? reviews.map(review => (
              <li key={review.id}>
                <h3>Author: {review.author}</h3>
                <p>{review.content}</p>
              </li>
            ))
          : `no results`}
      </ul>
    </div>
  );
};

export default Reviews;

Reviews.propTypes = {
  movieId: PropTypes.number,
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      author: PropTypes.string,
      content: PropTypes.string,
    })
  ),
};

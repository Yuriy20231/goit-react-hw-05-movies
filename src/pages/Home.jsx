import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_KEY, BASE_URL } from 'API/API';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  // const location = useLocation();
  // http запрос
  useEffect(() => {
    fetchTrandingMovie();
  }, []);

  async function fetchTrandingMovie() {
    const searchParams = new URLSearchParams({
      api_key: API_KEY,
    });

    const url = `${BASE_URL}/movie/popular?${searchParams}`;
    const resp = await axios.get(url);
    const { data } = resp;
    setTrendingMovies(data.results);
  }
  // console.log(location);
  // console.log(trendingMovies);

  return (
    <div>
      <h1>Trending</h1>
      <div style={{ display: 'inline-block' }}>
        {trendingMovies.map(movie => (
          <Link
            to={`movies/${movie.id}`}
            key={movie.id}
            // state={{ from: location }}
          >
            <p>{movie.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Home;

Home.propTypes = {
  trendingMovies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
    })
  ),
};

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { API_KEY, BASE_URL } from 'API/API';
import { BiSearch } from 'react-icons/bi';
import css from './Movie.module.css';
import { useLocation } from 'react-router-dom/dist';

const Movies = () => {
  const [movies, setMovies] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams({});
  const query = searchParams.get('query') ?? '';
  const location = useLocation();

  async function getMovies() {
    const searchParams = new URLSearchParams({
      api_key: API_KEY,
      query: query,
    });
    const url = `${BASE_URL}/search/movie?query=${query}&${searchParams}`;
    try {
      const resp = await axios.get(url);
      const { data } = resp;
      setMovies(data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  }
  console.log(movies);

  useEffect(() => {
    getMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = event => {
    const searchQuery = event.target.value;
    if (searchQuery === '') {
      return setSearchParams({});
    }
    setSearchParams({ query: searchQuery });
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (!query) {
      alert('Enter text for search.');
      setMovies([]);
      return;
    }
    setMovies([]);
    getMovies();
  };

  return (
    <div>
      <>
        <form onSubmit={handleSubmit}>
          <label className={css.label}>
            <input
              className={css.input}
              type="text"
              value={query}
              onChange={handleInputChange}
            />
            <button type="submit">
              <BiSearch size="1em" />
            </button>
          </label>
        </form>
      </>
      <div>
        {movies.length !== 0 ? (
          movies.map(movie => (
            <Link
              className={css.link}
              key={movie.id}
              to={`${movie.id}`}
              state={{ from: location }}
            >
              <div>
                {/* <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt=""
                /> */}
                <p>{movie.title}</p>
              </div>
            </Link>
          ))
        ) : (
          <div>Please enter search query.</div>
        )}
      </div>
    </div>
  );
};
export default Movies;

Movies.propTypes = {
  query: PropTypes.string,
  movie: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
    })
  ),
};

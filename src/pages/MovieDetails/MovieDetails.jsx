import { API_KEY, BASE_URL } from 'API/API';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link, Outlet, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import css from './MovieDetails.module.css';
import { useLocation } from 'react-router-dom/dist';
import { GoArrowLeft } from 'react-icons/go';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState();
  const location = useLocation();

  const backLinkLocationRef = useRef(location.state?.from ?? '/');

  useEffect(() => {
    async function getMovie() {
      const searchParams = new URLSearchParams({
        api_key: API_KEY,
      });

      const url = `${BASE_URL}/movie/${movieId}?${searchParams}`;
      const resp = await axios.get(url);
      const { data } = resp;
      setMovie(data);
    }
    getMovie();
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  return (
    <>
      <div className={css.goback}>
        <Link className={css.link} to={backLinkLocationRef.current}>
          <button className={css.button} type="button">
            <GoArrowLeft size="30px" />
            GO BACK
          </button>
        </Link>
      </div>
      <div className={css.movie_info}>
        <div className={css.thumb}>
          <h1>{movie.title}</h1>
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div>
          <ul className="movieInfo">
            <li>
              <p>User score:{movie.vote_average}</p>
            </li>
            <li>
              <h3> Overview :</h3>
              <p>{movie.overview}</p>
            </li>
          </ul>
          <h2>Genres :</h2>
          <ul className={css.genre_list}>
            {movie.genres.map(genre => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </div>
      </div>

      <h2>Information</h2>

      <div>
        <ul>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviws</Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </>
  );
};

export default MovieDetails;

MovieDetails.propTypes = {
  movieId: PropTypes.number,
  movie: PropTypes.shape({
    id: PropTypes.number,
    vote_average: PropTypes.number,
    overview: PropTypes.string,
    title: PropTypes.string,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
  }),
};

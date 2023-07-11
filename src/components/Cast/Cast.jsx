import { useParams } from 'react-router-dom';
import { API_KEY, BASE_URL } from 'API/API';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import css from './Cast.module.css';
const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  useEffect(() => {
    async function getCast() {
      const searchParams = new URLSearchParams({
        api_key: API_KEY,
      });
      const url = `${BASE_URL}/movie/${movieId}/credits?${searchParams}`;
      const resp = await axios.get(url);
      const { data } = resp;
      setCast(data.cast);
    }
    getCast();
  }, [movieId]);

  return (
    <div>
      <ul className={css.cast_list}>
        {cast.length !== 0
          ? cast.map(actor => {
              return (
                <li key={actor.id}>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                    alt="noPhoto"
                  />
                  <p>{actor.name}</p>
                  <p>{actor.character}</p>
                </li>
              );
            })
          : `no info`}
      </ul>
    </div>
  );
};
export default Cast;

Cast.propTypes = {
  movieId: PropTypes.number,
  cast: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      character: PropTypes.string,
      profile_path: PropTypes.string,
    })
  ),
};

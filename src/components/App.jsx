import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
// import Home from 'pages/Home';
// import MovieDetails from 'pages/MovieDetails/MovieDetails';
// import Movies from 'pages/Movies/Movies';

import { Layout } from './Layout/Layout';
// import Cast from './Cast/Cast';
// import Reviews from './Reviews/Reviews';
import css from './app.module.css';

const Home = lazy(() => import('../pages/Home'));
const MovieDetails = lazy(() => import('../pages/MovieDetails/MovieDetails'));
const Movies = lazy(() => import('../pages/Movies/Movies'));
const Cast = lazy(() => import('../components/Cast/Cast'));
const Reviews = lazy(() => import('../components/Reviews/Reviews'));

export const App = () => {
  return (
    <div className={css.container}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
};

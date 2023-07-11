import { NavLink, Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import css from './Layout.module.css';

export const Layout = () => {
  return (
    <div>
      <nav>
        <ul className={css.nav_list}>
          <li>
            <NavLink className={css.nav_link} to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className={css.nav_link} to="/movies">
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
      <main>
        <Suspense fallback={<div>Loading ....</div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

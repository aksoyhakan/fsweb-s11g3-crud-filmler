import React, { useEffect, useState } from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import MovieList from "./components/MovieList";
import Movie from "./components/Movie";
import EditMovieForm from "./components/EditMovieForm";
import AddMovie from "./components/AddMovie";

import MovieHeader from "./components/MovieHeader";

import FavoriteMovieList from "./components/FavoriteMovieList";

import axios from "axios";

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9000/api/movies")
      .then((res) => {
        setMovies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addToFavorites = (movie) => {
    !favoriteMovies.find((item) => item.title === movie.title) &&
      setFavoriteMovies([...favoriteMovies, movie]);
  };

  return (
    <div>
      <nav className="bg-zinc-800 px-6 py-3">
        <h1 className="text-xl text-white">HTTP / CRUD Film Projesi</h1>
      </nav>

      <div className="max-w-4xl mx-auto px-3 pb-4">
        <MovieHeader />
        <div className="flex flex-col sm:flex-row gap-4">
          <FavoriteMovieList favoriteMovies={favoriteMovies} />

          <Switch>
            <Route path="/movies/edit/:id">
              <EditMovieForm setMovies={setMovies} />
            </Route>

            <Route path="/movies/:id">
              <Movie setMovies={setMovies} addToFavorites={addToFavorites} />
            </Route>

            <Route exact path="/movies">
              <MovieList movies={movies} />
            </Route>

            <Route path="/add">
              <AddMovie setMovies={setMovies} />
            </Route>

            <Route exact path="/">
              <Redirect to="/movies" />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default App;

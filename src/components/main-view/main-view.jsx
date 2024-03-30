import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { PosterView } from "../poster-view/poster-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../SignupView/signup-view";
import StyledTitle from "../styled-components/styled-title/styled-title";
import GridContainer from "../styled-components/movie-grid-container/movie-grid-container";
import NavBar from "../NavBar/navbar";
import "./main-view.scss";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    setSelectedMovie(null); // Clear selected movie upon logout
    setMovies([]); // Optionally clear movies list or any other related state
    // any additional state resets needed on logout
  };

  useEffect(() => {
    if (!token) return;
    fetch("https://my-flix-application-66e35a87937e.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((doc) => {
          return {
            key: doc._id,
            title: doc.title,
            description: doc.description,
            imageUrl: doc.imageurl,
            directors: doc.directors[0].name,
            writers: doc.writers,
            mainActor: doc.main_actor.name,
            genres: doc.genres[0].name,
            token: token,
          };
        });
        setMovies(moviesFromApi);
      });
  }, [token]);

  if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
      </>
    );
  }

  if (selectedMovie) {
    const similarMovies = movies.filter((movie) => {
      return (
        movie.key !== selectedMovie.key && movie.genres === selectedMovie.genres
      );
    });

    return (
      <>
        <NavBar user={user} setUser={setUser} onLogout={logout} />
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
        <StyledTitle>Similar Movies</StyledTitle>
        <div className="similar-movie-list">
          {similarMovies.map((movie) => (
            <PosterView
              key={movie.id}
              movieData={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
            />
          ))}
        </div>
      </>
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <>
      <NavBar setUser={setUser} />
      <StyledTitle>Currently Featured Movies</StyledTitle>
      <GridContainer>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movieData={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
      </GridContainer>
    </>
  );
};

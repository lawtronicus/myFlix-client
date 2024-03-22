import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { PosterView } from "../poster-view/poster-view";
import { LoginView } from "../login-view/login-view";
import StyledTitle from "../styled-components/styled-title/styled-title";
import GridContainer from "../styled-components/movie-grid-container/movie-grid-container";
import "./main-view.scss";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  if (!user) {
    return <LoginView />;
  }

  useEffect(() => {
    fetch("https://my-flix-application-66e35a87937e.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((doc) => {
          console.log(doc);
          return {
            key: doc._id,
            title: doc.title,
            description: doc.description,
            imageUrl: doc.imageurl,
            directors: doc.directors[0].name,
            writers: doc.writers,
            mainActor: doc.main_actor.name,
            genres: doc.genres[0].name,
          };
        });
        setMovies(moviesFromApi);
      });
  }, []);

  if (selectedMovie) {
    let similarMovies = movies.filter((movie) => {
      console.log("current movie: ", selectedMovie.title);
      console.log("current movie genre: ", selectedMovie.genres);
      console.log("checking movie: ", movie.title);
      console.log("checking movie genre: ", movie.genres);
      return (
        movie.key !== selectedMovie.key && movie.genres === selectedMovie.genres
      );
    });
    console.log("similar movies:", similarMovies);
    return (
      <>
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
        <hr />
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
    <div>
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
    </div>
  );
};

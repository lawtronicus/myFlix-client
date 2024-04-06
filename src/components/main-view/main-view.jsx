import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { NavBar } from "../NavBar/navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import "./main-view.scss";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const logout = () => {
    console.log("logout clicked");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    setSelectedMovie(null);
    setMovies([]);
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
      <LoginView
        onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }}
      />
    );
  }

  if (selectedMovie) {
    const similarMovies = movies.filter((movie) => {
      return (
        movie.key !== selectedMovie.key && movie.genres === selectedMovie.genres
      );
    });

    return (
      <Container fluid>
        <Row>
          <NavBar onLogout={logout} />
          <Col md={8} className="mx-auto">
            <MovieView
              movie={selectedMovie}
              onBackClick={() => setSelectedMovie(null)}
            />
          </Col>
          <h1 className="display-4 similar-movies-title">Similar Movies</h1>
          <Col sm={10} md={7} className="mx-auto">
            {similarMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movieData={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            ))}
          </Col>
        </Row>
      </Container>
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <Container className="main-view-container" fluid>
      <Row className="p-0">
        <NavBar onLogout={logout} />
        <h1 className="display-2 main-heading mt-2">
          Currently Featured Movies
        </h1>
        <Col sm={10} md={7} className="mx-auto">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movieData={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
            />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

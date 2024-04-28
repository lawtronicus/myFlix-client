import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { NavBar } from "../NavBar/navbar";
import { SignupView } from "../SignupView/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import "./main-view.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FormControl } from "react-bootstrap";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [userFavoriteMovies, setUserFavoriteMovies] = useState(
    user ? user.favorite_movies : []
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(filteredMovies);
    console.log(filteredMovies);
  }, [movies, searchTerm]);

  useEffect(() => {
    if (user) {
      setUserFavoriteMovies(user.favorite_movies || []);
    }
  }, [user]);

  const handleFavoriteToggle = (userid, movie, isFavorite) => {
    const isCurrentlyFavorite = userFavoriteMovies.some((favMovie) => {
      return favMovie.key === movie.key;
    });

    const updatedFavorites = isCurrentlyFavorite
      ? userFavoriteMovies.filter((favMovie) => favMovie.key !== movie.key)
      : [...userFavoriteMovies, movie];

    setUserFavoriteMovies(updatedFavorites);

    const updatedUser = { ...user, favorite_movies: updatedFavorites };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    const method = isFavorite ? "DELETE" : "PUT";
    const url = `https://my-flix-application-66e35a87937e.herokuapp.com/users/${userid}/${movie.title}`;
    const options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    fetch(url, options)
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error updating favorite status:", error);
      });
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
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

  return (
    <BrowserRouter>
      <Row className="justify-content-center">
        <NavBar user={user} token={token} onLogout={logout} />
        <Routes>
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <LoginView
                    onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                    }}
                  />
                )}
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <SignupView
                    onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                    }}
                  />
                )}
              </>
            }
          />
          <Route
            path="/users/:userId"
            element={
              <>
                <ProfileView
                  user={user}
                  token={token}
                  userFavoriteMovies={userFavoriteMovies}
                  onLogout={logout}
                />
              </>
            }
          />
          <Route
            path="/movies/:title"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col> The list is empty!</Col>
                ) : (
                  <>
                    <MovieView
                      movies={movies}
                      user={user}
                      handleFavoriteToggle={handleFavoriteToggle}
                      userFavoriteMovies={userFavoriteMovies}
                    />
                  </>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>No movies!</Col>
                ) : (
                  <Container
                    id="main-content-container"
                    class="d-flex flex-column"
                    fluid
                  >
                    <div id="heading-and-search">
                      <h1 className="main-heading">
                        Currently Featured Movies
                      </h1>
                      <FormControl
                        type="text"
                        placeholder="Search movies..."
                        value={searchTerm}
                        onChange={handleSearchInputChange}
                        id="movieFilter"
                      />
                    </div>
                    <Row className="movies-to-display d-flex justify-content-center">
                      {filteredMovies.map((movie) => {
                        return (
                          <MovieCard
                            key={movie.key}
                            movieData={movie}
                            userId={user._id}
                            handleFavoriteToggle={handleFavoriteToggle}
                            userFavoriteMovies={userFavoriteMovies}
                          />
                        );
                      })}
                    </Row>
                  </Container>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

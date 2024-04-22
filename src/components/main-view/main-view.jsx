import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { NavBar } from "../NavBar/navbar";
import { SignupView } from "../SignupView/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import "./main-view.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [userFavoriteMovies, setUserFavoriteMovies] = useState(
    user ? user.favorite_movies : []
  );

  useEffect(() => {
    if (user) {
      setUserFavoriteMovies(user.favorite_movies || []);
    }
  }, [user]); // Dependency on 'user' ensures this runs when 'user' changes

  const handleFavoriteToggle = (userid, movieTitle, isFavorite) => {
    const isCurrentlyFavorite = userFavoriteMovies.includes(movieTitle);
    const updatedFavorites = isCurrentlyFavorite
      ? userFavoriteMovies.filter((id) => id !== movieTitle) // Remove movie from favorites
      : [...userFavoriteMovies, movieTitle];

    setUserFavoriteMovies(updatedFavorites);

    const updatedUser = { ...user, favorite_movies: updatedFavorites };
    setUser(updatedUser); // Assuming setUser updates the user state
    localStorage.setItem("user", JSON.stringify(updatedUser)); // Update localStorage

    const method = isFavorite ? "DELETE" : "PUT";
    const url = `https://my-flix-application-66e35a87937e.herokuapp.com/users/${userid}/${movieTitle}`;
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
      <Row className="justify-content-md-center">
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
                  movies={movies}
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
                    <Col md={8} className="mx-auto">
                      <MovieView
                        movies={movies}
                        user={user}
                        handleFavoriteToggle={handleFavoriteToggle}
                        userFavoriteMovies={userFavoriteMovies}
                      />
                    </Col>
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
                  <>
                    <Container className="main-view-container" fluid>
                      <Row className="p-0">
                        <h1 className="display-2 main-heading mt-2">
                          Currently Featured Movies
                        </h1>
                        <Col sm={10} md={7} className="mx-auto">
                          {movies.map((movie) => {
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
                        </Col>
                      </Row>
                    </Container>
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

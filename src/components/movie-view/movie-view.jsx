import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import "./movie-view.scss";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { MovieCard } from "../movie-card/movie-card";
import { FavoriteButton } from "../favorite-button/favorite-button";
import { useScrollToTop } from "../../hooks/scroll-to-top.js";

export const MovieView = ({
  movies,
  user,
  handleFavoriteToggle,
  userFavoriteMovies,
}) => {
  const params = useParams();
  const title = params.title;
  const movie = movies.find((m) => m.title === title);
  const similarMovies = movies.filter((m) => {
    return m.title !== movie.title && m.genres === movie.genres;
  });

  const isFavorite = userFavoriteMovies.some(
    (favoriteMovie) => favoriteMovie.title === movie.title
  );

  const toggleFavorite = () => {
    handleFavoriteToggle(user._id, movie, isFavorite);
  };

  useScrollToTop();
  return (
    <Container className="movie-view-container" fluid>
      <Card className="movie-view-card">
        <FavoriteButton
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
        />
        <div className="movie-poster-container">
          <Card.Img
            variant="left"
            src={movie.imageUrl}
            alt={`Cover of ${movie.title}`}
            style={{ width: "40%", height: "auto", margin: "1rem" }}
          />
        </div>
        <Card.Body className="card-body">
          <Card.Title style={{ textAlign: "center" }}>{movie.title}</Card.Title>
          <Card.Text className="card-text">
            <div>
              <span>
                <strong>Directed by: </strong>
              </span>
              <span>{movie.directors}</span>
            </div>
            <div>
              <span>
                <strong>Starring: </strong>
              </span>
              <span>{movie.mainActor}</span>
            </div>
            <div className="synopsis">
              <strong>Synopsis:</strong>
              <div>{movie.description}</div>
            </div>
          </Card.Text>
        </Card.Body>
        <Link to="/">
          <Button className="back-button" variant="warning">
            Movies
          </Button>
        </Link>
      </Card>
      {similarMovies.length > 0 && (
        <Container id="similar-movies-section">
          <h1 className="display-4 similar-movies-title">Similar Movies</h1>
          <Row>
            {similarMovies.map((movie) => (
              <MovieCard
                key={movie.key}
                movieData={movie}
                userId={user._id}
                handleFavoriteToggle={handleFavoriteToggle}
                userFavoriteMovies={userFavoriteMovies}
              />
            ))}
          </Row>
        </Container>
      )}
    </Container>
  );
};

MovieView.propTypes = {
  movies: PropTypes.array.isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    favorite_movies: PropTypes.array,
  }),
  handleFavoriteToggle: PropTypes.func.isRequired,
  userFavoriteMovies: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

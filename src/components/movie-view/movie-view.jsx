import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import "./movie-view.scss";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
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

  const isFavorite = userFavoriteMovies.includes(movie.title);

  const toggleFavorite = () => {
    handleFavoriteToggle(user._id, movie.title, isFavorite);
  };

  useScrollToTop();
  return (
    <>
      <Card className="movie-view-card">
        <FavoriteButton
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
        />
        <div className="movie-poster-container">
          <Card.Img
            variant="top"
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
            BACK
          </Button>
        </Link>
      </Card>
      {similarMovies.length > 0 && (
        <>
          <h1 className="display-4 similar-movies-title">Similar Movies</h1>
          <Col sm={10} md={12} className="mx-auto">
            {similarMovies.map((movie) => (
              <MovieCard
                key={movie.key}
                movieData={movie}
                userId={user._id}
                handleFavoriteToggle={handleFavoriteToggle}
                userFavoriteMovies={userFavoriteMovies}
              />
            ))}
          </Col>
        </>
      )}
    </>
  );
};

MovieView.propTypes = {
  movies: PropTypes.array,
};

import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import "./movie-card.scss";
import { Link } from "react-router-dom";
import { FavoriteButton } from "../favorite-button/favorite-button";

export const MovieCard = ({
  userId,
  movieData,
  handleFavoriteToggle,
  userFavoriteMovies,
}) => {
  const isFavorite = userFavoriteMovies.includes(movieData.title);

  const toggleFavorite = () => {
    handleFavoriteToggle(userId, movieData.title, isFavorite);
  };

  return (
    <Card className="custom-card" style={{ margin: "2rem 0px" }}>
      <FavoriteButton isFavorite={isFavorite} toggleFavorite={toggleFavorite} />
      <Link
        to={`/movies/${encodeURIComponent(movieData.title)}`}
        className="movie-card-link"
      >
        <div className="d-flex">
          <Card.Img
            variant="left"
            src={movieData.imageUrl}
            alt={`Cover of ${movieData.title}`}
            style={{ width: "220px", margin: "1rem" }}
          />
          <Card.Body className="movie-text">
            <Card.Title>{movieData.title}</Card.Title>
            <Card.Text className="card-description">
              {movieData.description}
            </Card.Text>
          </Card.Body>
        </div>
      </Link>
    </Card>
  );
};

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};

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
  const isFavorite = userFavoriteMovies.some(
    (movie) => movie.title === movieData.title
  );

  const toggleFavorite = () => {
    handleFavoriteToggle(userId, movieData, isFavorite);
  };

  return (
    <Card id="movie-card">
      <FavoriteButton
        id="favorite-star-button"
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
      />
      <Link
        to={`/movies/${encodeURIComponent(movieData.title)}`}
        className="movie-card-link"
      >
        <div className="poster-wrapper">
          <Card.Img
            id="movie-poster"
            variant="top"
            src={movieData.imageUrl}
            alt={`Cover of ${movieData.title}`}
          />
        </div>
        <Card.Body id="movie-text-container">
          <Card.Title>{movieData.title}</Card.Title>
          <Card.Text className="card-directors">
            {movieData.directors}
          </Card.Text>
        </Card.Body>
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

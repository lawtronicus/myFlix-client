import MovieCardContainer from "../styled-components/movie-container/movie-container";
import StyledImage from "../styled-components/movie-image/styled-image";
import PropTypes from "prop-types";
import "./movie-card.scss";

export const MovieCard = ({ movieData, onMovieClick }) => {
  return (
    <MovieCardContainer onClick={() => onMovieClick(movieData)}>
      <StyledImage
        src={movieData.imageUrl}
        alt={`Cover of ${movieData.title}`}
      />
      <div className="movieText">
        <h2>{movieData.title}</h2>
        <p>{movieData.description}</p>
      </div>
    </MovieCardContainer>
  );
};

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};

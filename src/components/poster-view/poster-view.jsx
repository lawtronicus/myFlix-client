import StyledImage from "../styled-components/movie-image/styled-image";
import PropTypes from "prop-types";

export const PosterView = ({ movieData, onMovieClick }) => {
  return (
    <>
      <StyledImage
        src={movieData.imageUrl}
        alt={`Cover of ${movieData.title}`}
        onClick={() => onMovieClick(movieData)}
      />
    </>
  );
};

PosterView.propTypes = {
  movieData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};

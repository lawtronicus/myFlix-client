import StyledImage from "../styled-components/movie-image/styled-image";
import "./movie-view.scss";
import PropTypes from "prop-types";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <>
      <div className="movie-view">
        <StyledImage
          className="movie-view-image"
          src={movie.imageUrl}
          alt={`Image for ${movie.title}`}
        />
        <div className="movie-info">
          <div className="title">
            <span>{movie.title}</span>
          </div>
          <div>
            <span className="label">Directed by: </span>
            <span>{movie.directors}</span>
          </div>
          <div>
            <span className="label">Starring: </span>
            <span>{movie.mainActor}</span>
          </div>
          <div className="description">
            <span className="label">Synopsis: </span>
            <span>{movie.description}</span>
          </div>
        </div>
        <button class="back-button" onClick={onBackClick}>
          X
        </button>
      </div>
    </>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    // Define properties based on what MovieView uses
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
    directors: PropTypes.string,
    writers: PropTypes.arrayOf(PropTypes.string),
    mainActor: PropTypes.string,
    genres: PropTypes.string,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};

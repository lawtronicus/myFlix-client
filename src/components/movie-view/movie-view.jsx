import StyledImage from "../styled-components/movie-image/styled-image";
import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
  console.log("movie", movie);
  return (
    <>
      <div className="movie-view">
        <img
          className="movie-view-image"
          src={movie.imageUrl}
          alt={`Image for ${movie.title}`}
        />
        <div className="title">
          <span>{movie.title}</span>
        </div>
        <div>
          <span className="label">Directed by: </span>
          <span>{movie.directors[0]}</span>
        </div>
        <div>
          <span className="label">Starring: </span>
          <span>{movie.mainActor}</span>
        </div>
        <div className="description">
          <span className="label">Synopsis: </span>
          <span>{movie.description}</span>
        </div>
        <button onClick={onBackClick}>X</button>
      </div>
    </>
  );
};

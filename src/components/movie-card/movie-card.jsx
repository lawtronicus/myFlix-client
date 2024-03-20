import MovieCardContainer from "../styled-components/movie-container/movie-container";
import StyledImage from "../styled-components/movie-image/styled-image";
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

import MovieCardContainer from "../styled-components/movie-container/movie-container";
import StyledImage from "../styled-components/movie-image/styled-image";

export const MovieCard = ({ movieData, onMovieClick }) => {
  return (
    <MovieCardContainer onClick={() => onMovieClick(movieData)}>
      <StyledImage
        src={movieData.imageUrl}
        alt={`Cover of ${movieData.title}`}
      />
      <h3>{movieData.title}</h3>
      <p>{movieData.description}</p>
    </MovieCardContainer>
  );
};

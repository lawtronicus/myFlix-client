import MovieCardContainer from "../styled-components/movie-container/movie-container"; // Make sure this path matches the location of your styled component

export const MovieCard = ({ movieData, onMovieClick }) => {
  return (
    <MovieCardContainer onClick={() => onMovieClick(movieData)}>
      <img
        src={movieData.imageUrl}
        alt={`Cover of ${movieData.title}`}
        style={{ width: "200px", height: "auto", borderRadius: "4px" }}
      />
      <h3>{movieData.title}</h3>
      <p>{movieData.description}</p>
    </MovieCardContainer>
  );
};

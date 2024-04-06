import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import "./movie-card.scss";

export const MovieCard = ({ movieData, onMovieClick }) => {
  return (
    <Card
      className="custom-card"
      onClick={() => onMovieClick(movieData)}
      style={{ margin: "2rem 0px" }}
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
    </Card>
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

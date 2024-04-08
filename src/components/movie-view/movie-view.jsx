import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <Card className="movie-view-card">
      <div className="movie-poster-container">
        <Card.Img
          variant="top"
          src={movie.imageUrl}
          alt={`Cover of ${movie.title}`}
          style={{ width: "40%", height: "auto", margin: "1rem" }}
        />
      </div>
      <Card.Body class-name="card-body">
        <Card.Title style={{ "text-align": "center" }}>
          {movie.title}
        </Card.Title>
        <Card.Text className="card-text">
          <div>
            <span>
              <strong>Directed by: </strong>
            </span>
            <span>{movie.directors}</span>
          </div>
          <div>
            <span>
              <strong>Starring: </strong>
            </span>
            <span>{movie.mainActor}</span>
          </div>
          <div className="synopsis">
            <strong>Synopsis:</strong>
            <div>{movie.description}</div>
          </div>
        </Card.Text>
      </Card.Body>
      <Button className="back-button" variant="warning" onClick={onBackClick}>
        BACK
      </Button>
    </Card>
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

import { Button } from "react-bootstrap";
import { BsStar, BsStarFill } from "react-icons/bs";
import "./favorite-button.scss";

export const FavoriteButton = ({ isFavorite, toggleFavorite }) => {
  return (
    <Button
      variant="link"
      onClick={toggleFavorite}
      className="text-warning"
      id="star"
      style={{
        position: "absolute",
        right: "1rem",
        width: "2rem",
        marginRight: "1rem",
        marginTop: ".5rem",
        "z-index": "1000",
      }}
    >
      {isFavorite ? (
        <BsStarFill
          className="bs-star-shadow"
          style={{
            fontSize: "2rem",
          }}
        />
      ) : (
        <BsStar
          className="bs-star-shadow"
          style={{
            fontSize: "2rem",
          }}
        />
      )}
    </Button>
  );
};

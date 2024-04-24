import { Button } from "react-bootstrap";
import { BsStar, BsStarFill } from "react-icons/bs";

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
        marginRight: "2rem",
        marginTop: "1rem",
      }}
    >
      {isFavorite ? (
        <BsStarFill style={{ fontSize: "2rem" }} />
      ) : (
        <BsStar style={{ fontSize: "2rem" }} />
      )}
    </Button>
  );
};

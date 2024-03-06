import styled from "styled-components";

const MovieCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 200px;
  cursor: pointer; /* Makes it clear the card is clickable */
  margin: 10px; /* Adjust based on your design */
  padding: 20px; /* Adjust based on your design */
  border: 2px solid black; /* Sample styling, adjust as needed */
  border-radius: 8px; /* Sample styling, adjust as needed */
  background-color: white; /* Sample styling, adjust as needed */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Sample styling, adjust as needed */
  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5); /* Sample styling, adjust as needed */
  }
`;

export default MovieCardContainer;

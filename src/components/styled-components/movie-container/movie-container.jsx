import styled from "styled-components";

const MovieCardContainer = styled.div`
  display: flex;
  align-items: center;
  width: 800px;
  cursor: pointer;
  margin: 10px;
  padding-top: 0px;
  border: 2px solid black;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  }
`;

export default MovieCardContainer;

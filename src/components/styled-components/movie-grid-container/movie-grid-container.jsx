import styled from "styled-components";

const GridContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: 1fr;
  align-items: top;
  justify-content: center;
  gap: 10px;
  padding: 20px;
  max-width: 1000px;
`;

export default GridContainer;

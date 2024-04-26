import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
import { Container } from "react-bootstrap";
import "./index.scss";

const MyFlixApplication = () => {
  return (
    <Container className="app-container" fluid>
      <MainView className="primary-container" />
    </Container>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<MyFlixApplication />);

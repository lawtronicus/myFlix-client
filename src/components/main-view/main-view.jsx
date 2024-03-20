import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import StyledTitle from "../styled-components/styled-title/styled-title";
import GridContainer from "../styled-components/movie-grid-container/movie-grid-container";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch("https://my-flix-application-66e35a87937e.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((doc) => {
          console.log(doc);
          return {
            key: doc._id,
            title: doc.title,
            description: doc.description,
            imageUrl: doc.imageurl,
            directors: doc.directors[0].name,
            writers: doc.writers,
            mainActor: doc.main_actor.name,
            genres: doc.genres,
          };
        });
        setMovies(moviesFromApi);
      });
  }, []);

  /*export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Vertigo",
      imageUrl:
        "https://cdn.vox-cdn.com/thumbor/yjAPqloAa_0VRCmh7IdOvb9w3UM=/0x0:3419x4883/1820x1213/filters:focal(1902x1980:2448x2526):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/72109850/74391607.0.jpg",
      directors: ["Alfred Hitchcock"],
      description:
        "A former police detective juggles wrestling with his personal demons and becoming obsessed with a hauntingly beautiful woman.",
      mainActor: "Kim Novak",
    },
    {
      id: 1,
      title: "Vertigo",
      imageUrl:
        "https://cdn.vox-cdn.com/thumbor/yjAPqloAa_0VRCmh7IdOvb9w3UM=/0x0:3419x4883/1820x1213/filters:focal(1902x1980:2448x2526):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/72109850/74391607.0.jpg",
      directors: ["Alfred Hitchcock"],
      description:
        "A former police detective juggles wrestling with his personal demons and becoming obsessed with a hauntingly beautiful woman.",
      mainActor: "Kim Novak",
    },
    {
      id: 1,
      title: "Vertigo",
      imageUrl:
        "https://cdn.vox-cdn.com/thumbor/yjAPqloAa_0VRCmh7IdOvb9w3UM=/0x0:3419x4883/1820x1213/filters:focal(1902x1980:2448x2526):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/72109850/74391607.0.jpg",
      directors: ["Alfred Hitchcock"],
      description:
        "A former police detective juggles wrestling with his personal demons and becoming obsessed with a hauntingly beautiful woman.",
      mainActor: "Kim Novak",
    },
    {
      id: 1,
      title: "Vertigo",
      imageUrl:
        "https://cdn.vox-cdn.com/thumbor/yjAPqloAa_0VRCmh7IdOvb9w3UM=/0x0:3419x4883/1820x1213/filters:focal(1902x1980:2448x2526):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/72109850/74391607.0.jpg",
      directors: ["Alfred Hitchcock"],
      description:
        "A former police detective juggles wrestling with his personal demons and becoming obsessed with a hauntingly beautiful woman.",
      mainActor: "Kim Novak",
    },
  ]);
*/
  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      <StyledTitle>Currently Featured Movies</StyledTitle>
      <GridContainer>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movieData={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
      </GridContainer>
    </div>
  );
};

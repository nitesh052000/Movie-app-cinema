import React, { useEffect } from "react";
import axios from "axios";
import { Margin } from "@mui/icons-material";
import Chip from "@mui/material/Chip";

const Genres = ({
  genres,
  setGeneres,
  selectedGeneres,
  setSelectedGeneres,
  type,
  setPage,
}) => {
  const handleRemove = (genre) => {
    setSelectedGeneres(selectedGeneres.filter((g) => g.id !== genre.id));
    setGeneres([...genres, genre]);
    setPage(1);
  };

  const handleAdd = (genre) => {
    setSelectedGeneres([...selectedGeneres, genre]);
    setGeneres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_API_KEY}&language=en-US`,
          {
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NDU3M2Y0YjVjYjhlYWU2ZTUyYTFkOGZlYmNlNTJmNyIsIm5iZiI6MTcyNDE2MzA4MC4xNjg0NDIsInN1YiI6IjY2YzRhMjA1N2ExM2M4NWRiYTk3MGEzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WnYq7RzsXnkmXgoN0xwqaXzxSV3Y-sJCtR_PSGLfssU",
            },
          }
        );
        setGeneres(response.data.genres);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: "6px 0" }}>
      {selectedGeneres.map((genre) => (
        <Chip
          style={{ Margin: 2 }}
          label={genre.name}
          key={genre.id}
          color="primary"
          clickable
          size="small"
          onDelete={() => handleRemove(genre)}
        />
      ))}

      {genres.map((genre) => (
        <Chip
          style={{ Margin: 2, backgroundColor: "white" }}
          label={genre.name}
          key={genre.id}
          clickable
          size="small"
          onClick={() => handleAdd(genre)}
        />
      ))}
    </div>
  );
};

export default Genres;

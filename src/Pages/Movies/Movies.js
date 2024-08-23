import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";

import CustomPagination from "../../components/Pagination/CustomPagination";
import Genres from "../../components/Genres";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [numofPages, setNumOfPages] = useState();

  const [genres, setGeneres] = useState([]);
  const [selectedGeneres, setSelectedGeneres] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
          {
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NDU3M2Y0YjVjYjhlYWU2ZTUyYTFkOGZlYmNlNTJmNyIsIm5iZiI6MTcyNDE2MzA4MC4xNjg0NDIsInN1YiI6IjY2YzRhMjA1N2ExM2M4NWRiYTk3MGEzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WnYq7RzsXnkmXgoN0xwqaXzxSV3Y-sJCtR_PSGLfssU",
            },
          }
        );

        console.log(response.data);
        setMovies(response.data.results);
        setNumOfPages(response.data.total_pages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [page]);

  return (
    <div>
      <span className="pageTitle">Discover Movies</span>
      <Genres
        genres={genres}
        setGeneres={setGeneres}
        selectedGeneres={selectedGeneres}
        setSelectedGeneres={setSelectedGeneres}
        type="movie"
        setPage={setPage}
      />
      <div className="trending">
        {movies &&
          movies.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={c.media_type}
              vote_average={c.vote_average}
            />
          ))}
      </div>
      {numofPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numofPages} />
      )}
    </div>
  );
};

export default Movies;

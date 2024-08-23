import axios from "axios";
import React, { useEffect, useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import "./Trending.css";

import CustomPagination from "../../components/Pagination/CustomPagination";

const Trending = () => {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${page}`,
          {
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NDU3M2Y0YjVjYjhlYWU2ZTUyYTFkOGZlYmNlNTJmNyIsIm5iZiI6MTcyNDE2MzA4MC4xNjg0NDIsInN1YiI6IjY2YzRhMjA1N2ExM2M4NWRiYTk3MGEzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WnYq7RzsXnkmXgoN0xwqaXzxSV3Y-sJCtR_PSGLfssU",
            },
          }
        );

        setContent(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [page]);

  return (
    <div>
      <span className="pageTitle">Trending</span>
      <div className="trending">
        {content &&
          content.map((c) => (
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
      <CustomPagination setPage={setPage} />
    </div>
  );
};

export default Trending;

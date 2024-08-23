import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";

const Search = () => {
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
          process.env.REACT_API_KEY
        }&language=en-US&query=${searchText}&page=${page}&include_adult=false`,
        {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NDU3M2Y0YjVjYjhlYWU2ZTUyYTFkOGZlYmNlNTJmNyIsIm5iZiI6MTcyNDE2MzA4MC4xNjg0NDIsInN1YiI6IjY2YzRhMjA1N2ExM2M4NWRiYTk3MGEzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WnYq7RzsXnkmXgoN0xwqaXzxSV3Y-sJCtR_PSGLfssU",
          },
        }
      );

      console.log(response.data);
      setContent(response.data.results);
      setNumOfPages(response.data.total_pages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchData();
  }, [type, page]);

  return (
    <div className="serach">
      <TextField
        style={{ flex: 1, backgroundColor: "#fff" }}
        id="outlined-basic"
        label="search"
        variant="outlined"
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Button
        onClick={fetchData}
        variant="contained"
        style={{ marginLeft: 10 }}
      >
        <SearchIcon fontsize="large" />
      </Button>
      <Tabs
        value={type}
        indicatorColor="primary"
        textColor="#fff"
        onChange={(event, newValue) => {
          setType(newValue);
          setPage(1);
        }}
        style={{ paddingBottom: 5 }}
        aria-label="disabled tabs example"
      >
        <Tab style={{ width: "50%" }} label="Search Movies" />
        <Tab style={{ width: "50%" }} label="Search TV Series" />
      </Tabs>
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={c.vote_average}
            />
          ))}
        {searchText &&
          !content &&
          (type ? <h2>No Series found</h2> : <h2>no movies found</h2>)}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Search;

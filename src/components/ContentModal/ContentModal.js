import * as React from "react";
import Backdrop from "@mui/material/Backdrop";

import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import axios from "axios";
import Caraousel from "../Carousel/Caraousel";
import YouTubeIcon from "@mui/icons-material/YouTube";
import makeStyles from "@mui/styles/makeStyles";
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../config/config";

import "./ContentModal.css";

const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "90%",
    height: "80%",
    backgroundColor: "#39445a",
    border: "1px solid #282c34",
    borderRadius: 10,
  },
}));

export default function ContentModal({ children, media_type, id }) {
  const classes = useStyles();
  const [video, setVideo] = useState();
  const [content, setContent] = useState();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,
        {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NDU3M2Y0YjVjYjhlYWU2ZTUyYTFkOGZlYmNlNTJmNyIsIm5iZiI6MTcyNDE2MzA4MC4xNjg0NDIsInN1YiI6IjY2YzRhMjA1N2ExM2M4NWRiYTk3MGEzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WnYq7RzsXnkmXgoN0xwqaXzxSV3Y-sJCtR_PSGLfssU",
          },
        }
      );
      console.log(response.data);
      setContent(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchvideo = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,
        {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NDU3M2Y0YjVjYjhlYWU2ZTUyYTFkOGZlYmNlNTJmNyIsIm5iZiI6MTcyNDE2MzA4MC4xNjg0NDIsInN1YiI6IjY2YzRhMjA1N2ExM2M4NWRiYTk3MGEzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WnYq7RzsXnkmXgoN0xwqaXzxSV3Y-sJCtR_PSGLfssU",
          },
        }
      );

      setVideo(response.data.results[0]?.key);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchvideo();
  }, []);

  return (
    <>
      <div
        className="media"
        style={{ cursor: "pointer" }}
        color="inherit"
        onClick={handleOpen}
      >
        {children}
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          {content && (
            <div className={classes.paper}>
              <div className="ContentModal">
                <img
                  src={
                    content?.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content?.name || content?.title}
                  className="ContentModal__portrait"
                />
                <img
                  src={
                    content?.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={content?.name || content?.title}
                  className="ContentModal__landscape"
                />
                <div className="ContentModal__about">
                  <span className="ContentModal__title">
                    {content?.name || content?.title} (
                    {(
                      content?.first_air_date ||
                      content?.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </span>
                  {content?.tagline && (
                    <i className="tagline">{content?.tagline}</i>
                  )}

                  <span className="ContentModal__description">
                    {content?.overview}
                  </span>

                  <div>
                    <Caraousel id={id} media_type={media_type} />
                  </div>

                  <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Fade>
      </Modal>
    </>
  );
}

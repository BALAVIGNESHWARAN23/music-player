import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Howl, Howler } from "howler";

import "../pages/Home.css";

import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import songContext from "../contexts/songContext";

const BottomPlayerContainer = ({ children }) => {
  // gets the current value of song from context
  const {
    currentSong,
    setCurrentSong,
    soundPlayed,
    setSoundPlayed,
    isPaused,
    setIsPaused,
  } = useContext(songContext);

  const firstUpdate = useRef(true);

  // checks when current song changes then triggers changeSong function
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    if (!currentSong) {
      return;
    }
    changeSong(currentSong.track);
  }, [currentSong && currentSong.track]);

  const playSound = () => {
    // first checks if there is a valid soundPlayed instance in the useState
    if (!soundPlayed) {
      return;
    }
    // if it does plays the song, and sets pause to false
    soundPlayed.play();
    setIsPaused(false); // Update the pause state when playing
  };

  // stops the current playing audio and creates a new howl instance
  // starts playing the new howl instance
  const changeSong = (songSrc) => {
    if (soundPlayed) {
      soundPlayed.stop();
    }
    let sound = new Howl({
      src: [songSrc],
      html5: true,
    });
    setSoundPlayed(sound);
    sound.play();
    // Update the pause state when changing the song
    setIsPaused(false);
  };

  // Update the pause state when pausing
  const pauseSound = () => {
    soundPlayed.pause();
    setIsPaused(true);
  };

  const togglePlayPause = () => {
    if (!soundPlayed) {
      return;
    }
    if (isPaused) {
      playSound();
    } else {
      pauseSound();
    }
  };

  return (
    <div className="main-container">
      {children}
      {/* conditionally render the bottom audio bar if there is a current song*/}
      {currentSong && (
        <div className="lower-page-portion">
          <div className="first-portion-bottom">
            <img
              className="lower-portion-img"
              src={currentSong.thumbnail}
              alt="current song thumbnail"
            />
            <div className="lower-portion-details">
              <div className="song-name-bottom">{currentSong.name}</div>
              <div className="artist-name-bottom">
                {currentSong.artist.username}
              </div>
            </div>
          </div>
          <div className="second-portion-bottom">
            <div className="bottom-controls">
              <div className="prev-btn">
                <SkipPreviousIcon style={{ fontSize: "2rem" }} />
              </div>
              <div className="play-btn" onClick={togglePlayPause}>
                {isPaused ? (
                  <PlayCircleIcon
                    style={{
                      fontSize: "2.2rem",
                    }}
                  />
                ) : (
                  <PauseCircleIcon
                    style={{
                      fontSize: "2.2rem",
                    }}
                  />
                )}
              </div>
              <div className="next-btn">
                <SkipNextIcon style={{ fontSize: "2rem" }} />
              </div>
            </div>
            <div>Progress Bar</div>
          </div>
          <div className="third-portion-bottom"></div>
        </div>
      )}
    </div>
  );
};

export default BottomPlayerContainer;

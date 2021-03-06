// useRoveFocus.jsx

// Solution to use arrow keys to move through autocomplete suggestions
// adapted from 'Roving focus in react with custom hooks' by Rafi 
// https://dev.to/rafi993/roving-focus-in-react-with-custom-hooks-1ln
// accessed on 03/18/2020

import { useCallback, useState, useEffect } from "react";

function useRoveFocus(size) {
  const [currentFocus, setCurrentFocus] = useState(0);

  const search = document.getElementById('searchMovie');

  const handleKeyDown = useCallback(
    // changed to e from original solution which said (e: any)
    e => {
      if (e.keyCode === 40) {
        // Down arrow
        // modified from original to allow looping through searchBar
        e.preventDefault();
        if (currentFocus === size - 1) {
          setCurrentFocus(- 1);
          search.focus();
        } else {
          setCurrentFocus(currentFocus + 1);
        }
      } else if (e.keyCode === 38) {
        // Up arrow
        e.preventDefault();
        if (currentFocus === 0) {
          setCurrentFocus(-1);
          search.focus();
        } else if (document.activeElement === search) {
          setCurrentFocus(size - 1);
        } else {
          setCurrentFocus(currentFocus - 1);
        }
      } else if (e.keyCode === 27) {
        // modified from original to allow escape to searchBar
        setCurrentFocus(-1);
        search.focus();
      } else {
        // added else to original solution to allow user to continue typing movie name
        setCurrentFocus(-1);
      }
    },
    [size, currentFocus, setCurrentFocus, search]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, false);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, false);
    };
  }, [handleKeyDown]);

  return [currentFocus, setCurrentFocus];
}

export default useRoveFocus;


import React, { useEffect, useState } from "react";

export default function Button(props) {

  const handleSave = () => {
    const saveGame = {

    };
    

    const saveStateString = JSON.stringify(saveGame);
    localStorage.setItem("saveState", saveStateString);
  };

   useEffect(() => {
    const loadSaveStateString = localStorage.getItem("saveState");
    const loadSaveState = JSON.parse(loadSaveStateString);
   }, [])





  return (
    <button
      onClick={handleSave}
    >
      Save
    </button>
  );
}
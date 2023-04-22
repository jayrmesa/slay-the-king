import React, { useEffect } from "react";

export default function SaveButton(props) {
  console.log(props);
  
  const saveGame = {


  };

  const handleSave = () => {

    console.log("saved");

    const saveStateString = JSON.stringify(saveGame);
    localStorage.setItem("saveState", saveStateString);
  };

  useEffect(() => {
    const loadSaveStateString = localStorage.getItem("saveState");
    const loadSaveState = JSON.parse(loadSaveStateString);
  }, []);


  return (
    <button
      onClick={handleSave}
    >
      Save
    </button>
  );
}
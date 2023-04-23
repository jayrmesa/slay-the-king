import React, { useEffect } from "react";

export default function SaveButton(props) {
  const {clearedNodes, currentNode, selectedCharacter} = props

  const contentToStore = JSON.stringify({
    clearedNodes, currentNode, selectedCharacter
  });

  const handleSave = () => {

    console.log("saved");
    localStorage.setItem("saveState", contentToStore);
  };

  useEffect(() => {
    // const loadSaveStateString = localStorage.getItem("saveState");
    // const loadSaveState = JSON.parse(loadSaveStateString);
  }, []);

  return (
    <button
      onClick={handleSave}
    >
      Save
    </button>
  );
}
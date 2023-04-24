import React from "react";
import saveButton from '../../assets/images/menu/Save Button.png';


export default function SaveButton(props) {
  const { clearedNodes, currentNode, selectedCharacter } = props;

  const contentToStore = JSON.stringify({
    clearedNodes, currentNode, selectedCharacter
  });

  const handleSave = () => {

    console.log("saved");
    localStorage.setItem("saveState", contentToStore);
  };

  return (
    <img
      src={saveButton}
      alt="Option3"
      className="options-button"
      onClick={handleSave}
    />
  );
}
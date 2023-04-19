import React from "react";

export default function Button(props) {
  function handleSave(event){
    console.log(event)
  }

   return (
     <button
     onClick={handleSave}
     >
      Save
     </button>
   );
 }
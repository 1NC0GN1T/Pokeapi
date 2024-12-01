import React from "react";

interface navigationProps {
  handleNewRequest: (url: string) => void;
}

function Navigation({ handleNewRequest }: navigationProps) {
  return (
    <div>
      <button
        onClick={() => {
          handleNewRequest(
            "https://pokeapi.co/api/v2/pokemon?limit=9&offset=9"
          );
        }}
      >
        Press
      </button>
    </div>
  );
}

export default Navigation;

import React from "react";

interface navigationProps {
  handlePrevNavigation: (page: number) => void;
  handleNextNavigation: (page: number) => void;
  currentPage: number;
}

function Navigation({
  handleNextNavigation,
  handlePrevNavigation,
  currentPage,
}: navigationProps) {
  return (
    <div className="flex flex-row gap-5">
      <button
        onClick={() => {
          handlePrevNavigation(currentPage);
        }}
      >
        PREV
      </button>

      <button
        onClick={() => {
          handleNextNavigation(currentPage);
        }}
      >
        NEXT
      </button>
    </div>
  );
}

export default Navigation;

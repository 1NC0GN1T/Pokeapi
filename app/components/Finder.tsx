import React from "react";

interface finderProps {
  handleChangeSearch: (search: string) => void;
  setPage: (page: number) => void;
}

function Finder({ handleChangeSearch, setPage }: finderProps) {
  return (
    <div>
      <input
        placeholder="Escriba aqui su busqueda"
        onChange={(e) => {
          setPage(1);
          handleChangeSearch(e.target.value);
          console.log(e.target.value);
        }}
      ></input>
    </div>
  );
}

export default Finder;

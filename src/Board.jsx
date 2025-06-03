import React, { useState, useEffect } from "react";
import "./Board.css";

function Card({ name, pic }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/ditto")
      .then((response) => response.json())
      .then((d) => setData(d));
  }, []);

  

  return (
    <div className="card">
        {data}
    </div>
    );
}

export default function Board() {
  return (
    <div className="board">
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
}

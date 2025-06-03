import React, { useState, useEffect } from "react";
import "./Board.css";

function Card({pokemon}) {
  const [data, setData] = useState(null);
  const [name, setName] = useState("")

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then((response) => {
        if(!response.ok){
          throw new Error("Could not fetch resource")
        }
        return response.json();
      })
      .then((d) => {
        const sprite = React.createElement("img", {src: `${d.sprites.front_default}`}, null);
        setData(sprite)
        setName(d.name)
      })

      .catch(error => console.log(error))
  }, []);

  return (
    <div className="card">
        <h2>{name}</h2>{data}
    </div>
    );
}

export default function Board() {
  return (
    <div className="board">
      <Card pokemon={"bulbasaur"}/>
      <Card pokemon={"pikachu"}/>
      <Card pokemon={"blastoise"}/>
      <Card pokemon={"charizard"}/>
    </div>
  );
}

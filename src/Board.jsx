import React, { useState, useEffect } from "react";
import "./Board.css";

function Card({ pokemon }) {
  const [data, setData] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not fetch resource");
        }
        return response.json();
      })
      .then((d) => {
        setData(d.sprites.front_default);
        setName(d.name);
      })

      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="card">
      <h2>{name}</h2>
      {data && <img src={data} alt={name} />}
    </div>
  );
}

function shuffle(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function Board() {
  const [list, setList] = useState([
    "mew",
    "mewtwo",
    "pikachu",
    "charizard",
    "blastoise",
    "venusaur",
    "lugia",
    "ho-oh",
    "arceus",
    "palkia",
    "dialga",
    "flygon",
  ]);
  const [score, setScore] = useState(0);
  const [clicked, setClicked] = useState([]);
  const [best, setBest] = useState(0);

  const handleClick = (val) => {
    if(!clicked.includes(val)){
      setClicked([...clicked, val]);
      setScore(score + 1);
    } else {
      if(score > best) setBest(score);
      setClicked([]);
      setScore(0);
    }
    setList(shuffle(list));
  };

  return (<>
    <div>Best Score: {best}</div>
    <div>Score: {score}</div>
    <div className="board">
      {list.map((pokemon) => {
        return (
          <div onClick={() => handleClick(pokemon)} key={pokemon}>
            <Card pokemon={pokemon}/>
          </div>
        );
      })}
    </div>
  </>);
}

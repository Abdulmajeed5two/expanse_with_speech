import { useState } from "react";
import React from "react";
import astrologyData from "./astro";

const Astro = () => {
  const [index, setIndex] = useState(0);

  const change =(e) => {
    var nxe = e.target.value;
    var foundData = astrologyData.find(x => x.zodiacName == nxe)
    setIndex(foundData)

  }
  console.log(change)

  return (
    <>
      <h1>Astro</h1>
      <hr />
      <label >zodiacName </label>
      <select name="select" onChange={change}>
        {astrologyData.map((ast) => (
          <option name={ast} value={ast}> {ast.zodiacName} </option>
        ))}
      </select>

      <h3>{index.description}</h3>
    </>
  );
};

export default Astro;

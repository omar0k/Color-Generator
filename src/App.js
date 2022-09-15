import React, { useState } from "react";
import SingleColor from "./SingleColor";
import Values from "values.js";
import { Box, Slider, TextField } from "@material-ui/core";
import { useEffect } from "react";

function App() {
  const [color, setColor] = useState("yellow");
  const [error, setError] = useState(false);
  const [shades, setShades] = useState(10);
  const [list, setList] = useState(new Values("yellow").all(shades));

  const changeShade = (event, value) => {
    console.log(value);
    setShades(value);
  };
  const HandleSubmit = (e) => {
    e.preventDefault();
    try {
      let colors = new Values(color).all(shades);
      setList(colors);
      document.title=`Color Generator `+color
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };
  useEffect(() => {
    try {
      let colors = new Values(color).all(shades);
      setList(colors);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  }, [shades]);
  return (
    <>
      <section className="container">
        <h3>Color Generator</h3>
        <form onSubmit={HandleSubmit}>
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="#f15025 or red"
            className={`${error ? "error" : null}`}
          />
          <button className="btn" type="submit">
            submit
          </button>
        </form>
      </section>
      <Box className="slider-box">
        <h5>Shades</h5>
        <Slider
          marks
          min={1}
          max={100}
          color="primary"
          step={10}
          valueLabelDisplay="auto"
          value={shades}
          onChange={changeShade}
          className="shades-slider"
        />
        <TextField
          InputProps={{ inputProps: { min: 1, max: 100 } }}
          type="number"
          value={shades}
          onChange={(e) => {
            setShades(parseInt(e.target.value));
          }}
        />
      </Box>
      <section className="colors">
        {list.map((color, index) => {
          return (
            <SingleColor
              key={index}
              {...color}
              index={index}
              hexColor={color.hex}
              shades={shades}
            />
          );
        })}
      </section>
    </>
  );
}

export default App;

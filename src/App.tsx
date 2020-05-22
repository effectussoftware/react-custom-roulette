import React, { useState } from "react";

import { Wheel } from "./components/Wheel";
import { AppContainer } from "./styles";
import { WheelData } from "./components/Wheel/types";

const data: WheelData[] = [
  {
    option: "0safasfssfas",
    style: { backgroundColor: "cyan", textColor: "white" },
  },
  { option: "1", style: { backgroundColor: "blue" } },
  { option: "2", style: { backgroundColor: "red" } },
  { option: "3", style: { backgroundColor: "yellow" } },
  { option: "4", style: { backgroundColor: "grey" } },
  { option: "5", style: { backgroundColor: "green" } },
  { option: "6", style: { backgroundColor: "black" } },
  { option: "7", style: { backgroundColor: "white" } },
  { option: "8", style: { backgroundColor: "darkred" } },
  { option: "9", style: { backgroundColor: "gold" } },
  { option: "10", style: { backgroundColor: "silver" } },
  { option: "11", style: { backgroundColor: "magenta" } },
  { option: "12", style: { backgroundColor: "orange" } },
  { option: "13", style: { backgroundColor: "darkgrey" } },
  { option: "14", style: { backgroundColor: "lightgreen" } },
  { option: "15", style: { backgroundColor: "darkblue" } },
  { option: "16", style: { backgroundColor: "darkcyan" } },
  { option: "17", style: { backgroundColor: "darkmagenta" } },
  { option: "18", style: { backgroundColor: "lightyellow" } },
  { option: "19", style: { backgroundColor: "lightgrey" } },
];

const App = () => {
  const [mustSpin, setMustSpin] = useState(false);

  return (
    <AppContainer>
      <Wheel mustStartSpinning={mustSpin} prizeNumber={2} data={data} />
      <button onClick={() => setMustSpin(true)}>ASD</button>
    </AppContainer>
  );
};

export default App;

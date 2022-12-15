import React from "react";
import Ranking from "./ranking/Ranking";
import Navbar from "../../components/Navbar";
import Fantasy from "./Fantasy";

export function Homepage() {
  return (
    <div className="w-screen h-screen flex flex-col">
      <Navbar />
      <div className="w-full md:h-[92%] h-full flex justify-center items-center">
        <div className="w-11/12 h-[90%] bg-bg-contenedor flex md:flex-row flex-col md:bg-none bg-fondo-homepage-fantasy bg-no-repeat bg-center items-center md:justify-around justify-start rounded border-sticker-name border-2">
          <Fantasy />
          <Ranking />
        </div>
      </div>
    </div>
  );
}

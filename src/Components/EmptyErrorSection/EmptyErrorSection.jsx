import React from "react";
import emptySvg from "../../assets/No data-pana.svg"
// import emptySvg from "../../assets/3024051.jpg"
export default function EmptyErrorSection() {
  return (
    <div style={{    display: "grid",
        placeContent: "center",
        height: "330px",
        overflow: "hidden",
        background: "#fff"}} className="EmptyErrorSection">
      <img style={{width: "400px", maxWidth: "100%",
    height: "auto"}} src={emptySvg} alt="" />
    </div>
  );
}

import React from "react";

function DateTimeDisplay() {
  const dateTime = new Date().toLocaleString();

  return <p style={{ fontSize: "1.2rem", color: "#333", fontWeight: "bold" }}>{dateTime}</p>;
}

export default DateTimeDisplay;

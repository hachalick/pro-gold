import React from "react";

function Spinner() {
  return (
    <div className="flex w-16 h-10 items-center justify-around">
      <span className="bg-moonstoneD-200 w-3 h-3 rounded-full animate-loading-rendering-1"></span>
      <span className="bg-moonstoneD-200 w-3 h-3 rounded-full animate-loading-rendering-2"></span>
      <span className="bg-moonstoneD-200 w-3 h-3 rounded-full animate-loading-rendering-3"></span>
    </div>
  );
}

export default Spinner;

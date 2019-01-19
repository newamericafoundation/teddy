import React from "react";
import { Line } from "@vx/shape";

export default ({ top, bottom, tooltipLeft, tooltipTop }) => {
  return (
    <g>
      <Line
        from={{ x: tooltipLeft, y: top }}
        to={{ x: tooltipLeft, y: bottom }}
        stroke="#ababab"
        strokeWidth={1}
        style={{ pointerEvents: "none" }}
        strokeDasharray="2,2"
      />
      <circle
        cx={tooltipLeft}
        cy={tooltipTop}
        r={8}
        fill="#22C8A3"
        fillOpacity={0.2}
        style={{ pointerEvents: "none" }}
      />
      <circle
        cx={tooltipLeft}
        cy={tooltipTop}
        r={4}
        fill="#22C8A3"
        style={{ pointerEvents: "none" }}
      />
    </g>
  );
};

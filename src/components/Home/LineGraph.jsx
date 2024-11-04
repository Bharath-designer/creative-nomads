import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const LineGraph = () => {
  const data1 = useSelector((state) => state.graphData.data1);
  const data2 = useSelector((state) => state.graphData.data2);

  const canvasRef = useRef(null);
  const [tooltip, setTooltip] = useState(null);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    canvas.style.width = "100%";
    canvas.style.height = "12em";

    const tempHeight = parseInt(
      getComputedStyle(canvas).height.replace("px", "")
    );
    const tempWidth = parseInt(
      getComputedStyle(canvas).width.replace("px", "")
    );

    canvas.height = tempHeight * dpr;
    canvas.width = tempWidth * dpr;
    ctx.scale(dpr, dpr);

    const padding = 40;
    const xGap = (canvas.width / dpr - padding * 2) / (data1.length - 1);
    const yMax = 100;

    const drawSmoothLine = (data, color, shadowColor) => {
      
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";

      ctx.shadowColor = shadowColor;
      ctx.shadowBlur = 21;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 13;
      ctx.moveTo(
          padding,
          padding + ((yMax - data[0]) / yMax) * (canvas.height / dpr - padding * 2)
      );
  
      for (let i = 1; i < data.length - 2; i++) {
          const x0 = padding + (i - 1) * xGap;
          const y0 = padding + ((yMax - data[i - 1]) / yMax) * (canvas.height / dpr - padding * 2);
  
          const x1 = padding + i * xGap;
          const y1 = padding + ((yMax - data[i]) / yMax) * (canvas.height / dpr - padding * 2);
  
          const x2 = padding + (i + 1) * xGap;
          const y2 = padding + ((yMax - data[i + 1]) / yMax) * (canvas.height / dpr - padding * 2);
  
          const x3 = padding + (i + 2) * xGap;
          const y3 = padding + ((yMax - data[i + 2]) / yMax) * (canvas.height / dpr - padding * 2);
  
          for (let t = 0; t <= 1; t += 0.1) {
              const xt = 0.5 * (
                  (2 * x1) +
                  (-x0 + x2) * t +
                  (2 * x0 - 5 * x1 + 4 * x2 - x3) * t * t +
                  (-x0 + 3 * x1 - 3 * x2 + x3) * t * t * t
              );
  
              const yt = 0.5 * (
                  (2 * y1) +
                  (-y0 + y2) * t +
                  (2 * y0 - 5 * y1 + 4 * y2 - y3) * t * t +
                  (-y0 + 3 * y1 - 3 * y2 + y3) * t * t * t
              );
  
              ctx.lineTo(xt, yt);
          }
      }
  
      // Draw the last segment to ensure it connects to the final point
      const lastX = padding + (data.length - 1) * xGap;
      const lastY = padding + ((yMax - data[data.length - 1]) / yMax) * (canvas.height / dpr - padding * 2);
      ctx.lineTo(lastX, lastY);
  
      ctx.stroke();
      ctx.shadowColor = "transparent";
      
    };
    const drawPointDot = (x, y, color) => {
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#FFFFFF";
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
    };

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSmoothLine(data1, "#FD71AF", "rgba(67, 24, 255, 0.25)");
    drawSmoothLine(data2, "#6AD2FF", "rgba(106, 210, 255, 0.4)");

    if (hoveredPoint) {
      drawPointDot(hoveredPoint.x, hoveredPoint.y, hoveredPoint.color);
    }
  }, [hoveredPoint, data1, data2]);

  const handleMouseMove = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const padding = 40;
    const data = [
      { points: data1, color: "#FD71AF" },
      { points: data2, color: "#6AD2FF" },
    ];
    const xGap =
      (canvas.width / (window.devicePixelRatio || 1) - padding * 2) /
      (data[0].points.length - 1);
    const yMax = 100;
    const tooltipThreshold = 50;

    let closestPoint = null;
    let minDistance = tooltipThreshold;

    data.forEach((line) => {
      line.points.forEach((value, i) => {
        const x = padding + i * xGap;
        const y =
          padding +
          ((yMax - value) / yMax) *
            (canvas.height / window.devicePixelRatio - padding * 2);

        const distance = Math.sqrt((x - mouseX) ** 2 + (y - mouseY) ** 2);
        if (distance < minDistance) {
          minDistance = distance;
          closestPoint = {
            x: x,
            y: y,
            value: value,
            color: line.color,
            index: i,
          };
        }
      });
    });

    if (closestPoint) {
      setTooltip(closestPoint);
      setHoveredPoint(closestPoint);
    } else {
      setTooltip(null);
      setHoveredPoint(null);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <canvas ref={canvasRef} onMouseMove={handleMouseMove}></canvas>
      {tooltip && (
        <div
          className="tooltip"
          style={{
            position: "absolute",
            top: tooltip.y,
            left: tooltip.x,
            background: tooltip.color,
          }}
        >
          {tooltip.value}
        </div>
      )}
    </div>
  );
};

export default LineGraph;

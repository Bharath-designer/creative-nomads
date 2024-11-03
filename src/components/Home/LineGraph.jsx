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

      data.forEach((point, i) => {
        const x = padding + i * xGap;
        const y =
          canvas.height / dpr -
          padding -
          (point / yMax) * (canvas.height / dpr - padding * 2);

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          const prevX = padding + (i - 1) * xGap;
          const prevY =
            canvas.height / dpr -
            padding -
            (data[i - 1] / yMax) * (canvas.height / dpr - padding * 2);
          const midX = (prevX + x) / 2;
          const midY = (prevY + y) / 2;

          ctx.quadraticCurveTo(prevX, prevY, midX, midY);
        }

        if (i === data.length - 1) {
          ctx.lineTo(x, y);
        }
      });

      ctx.stroke();
      ctx.shadowColor = "transparent";
    };

    const drawPointDot = (x, y, color) => {
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
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
          canvas.height / window.devicePixelRatio -
          padding -
          (value / yMax) *
            (canvas.height / (window.devicePixelRatio || 1) - padding * 2);

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
